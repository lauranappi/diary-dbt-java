package com.marea.diarydbt.service;

import com.marea.diarydbt.dto.AuthResponse;
import com.marea.diarydbt.dto.LoginRequest;
import com.marea.diarydbt.dto.RegistrazioneRequest;
import com.marea.diarydbt.model.Utente;
import com.marea.diarydbt.repository.UtenteRepository;
import com.marea.diarydbt.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UtenteRepository utenteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private static final String ALFABETO_CODICE = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // senza caratteri ambigui
    private static final SecureRandom RANDOM = new SecureRandom();

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

        Utente.UtenteBuilder builder = Utente.builder()
                .username(req.username())
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
        Utente utente = utenteRepository.findByUsername(req.username())
                .orElseThrow(() -> new IllegalArgumentException("Credenziali non valide"));

        if (!passwordEncoder.matches(req.password(), utente.getPasswordHash())) {
            throw new IllegalArgumentException("Credenziali non valide");
        }

        return costruisciRisposta(utente);
    }

    private AuthResponse costruisciRisposta(Utente utente) {
        String token = jwtService.generaToken(utente.getId(), utente.getRuolo().name());
        return new AuthResponse(token, utente.getId(), utente.getUsername(),
                utente.getRuolo().name(), utente.getCodicePaziente());
    }

    private String generaCodiceUnivoco() {
        String codice;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                sb.append(ALFABETO_CODICE.charAt(RANDOM.nextInt(ALFABETO_CODICE.length())));
            }
            codice = sb.toString();
        } while (utenteRepository.findByCodicePaziente(codice).isPresent());
        return codice;
    }
}
