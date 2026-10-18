package com.marea.service;

import com.marea.dto.AuthResponse;
import com.marea.dto.LoginRequest;
import com.marea.dto.RegistrazioneRequest;
import com.marea.model.Utente;
import com.marea.repository.UtenteRepository;
import com.marea.util.CodiciPaziente;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Il collegamento a una terapeuta NON avviene qui: la paziente riceve
    // il proprio codice alla registrazione e lo comunica (di persona, a
    // voce) alla terapeuta, che poi la collega dal proprio lato - vedi
    // TerapeutaService.collegaPaziente(). Farlo qui, durante la
    // registrazione, richiederebbe che la paziente conosca in anticipo
    // un codice della terapeuta, che non e' come funziona nella pratica.
    public AuthResponse registra(RegistrazioneRequest req) {
        if (utenteRepository.existsByUsername(req.username())) {
            throw new IllegalArgumentException("Username già in uso");
        }

        Utente.Ruolo ruolo = Utente.Ruolo.valueOf(req.ruolo().toUpperCase());

        Utente terapeuta = null;
        if (req.codiceTerapeuta() != null && !req.codiceTerapeuta().isBlank()) {
            terapeuta = utenteRepository.findByUsername(req.codiceTerapeuta().trim().toLowerCase())
                    .filter(u -> u.getRuolo() == Utente.Ruolo.TERAPEUTA)
                    .orElseThrow(() -> new IllegalArgumentException("Codice terapeuta non valido"));
        }
        if (req.email() != null && !req.email().isBlank() && utenteRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email già in uso");
        }

        Utente.UtenteBuilder builder = Utente.builder()
                .username(req.username())
                .nome(req.nome())
                .cognome(req.cognome())
                .email(req.email() == null || req.email().isBlank() ? null : req.email())
                .terapeuta(terapeuta)
                .collegataIl(terapeuta != null ? Instant.now() : null)
                .passwordHash(passwordEncoder.encode(req.password()))
                .ruolo(ruolo)
                .creatoIl(Instant.now());

        if (ruolo == Utente.Ruolo.PAZIENTE) {
            builder.codicePaziente(generaCodiceUnivoco());
        }

        Utente utente = utenteRepository.save(builder.build());
        return costruisciRisposta(utente);
    }

    public AuthResponse login(LoginRequest req) {
        // Come in Marea si puo' entrare con l'email oltre che con lo username
        Utente utente = utenteRepository.findByUsername(req.username())
                .or(() -> utenteRepository.findByEmailIgnoreCase(req.username()))
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide"));

        if (!passwordEncoder.matches(req.password(), utente.getPasswordHash())) {
            throw new IllegalArgumentException("Credenziali non valide");
        }

        return costruisciRisposta(utente);
    }

    private AuthResponse costruisciRisposta(Utente utente) {
        String token = jwtService.generaToken(utente.getId(), utente.getRuolo().name());
        return new AuthResponse(token, utente.getId(), utente.getUsername(),
                utente.getRuolo().name(), utente.getCodicePaziente(),
                utente.getNome(), utente.getCognome(),
                utente.getTerapeuta() != null ? utente.getTerapeuta().getUsername() : null);
    }

    private String generaCodiceUnivoco() {
        return CodiciPaziente.genera(c -> utenteRepository.findByCodicePaziente(c).isPresent());
    }
}
