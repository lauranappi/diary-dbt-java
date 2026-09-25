package com.marea.diarydbt.service;

import com.marea.diarydbt.dto.AuthResponse;
import com.marea.diarydbt.dto.LoginRequest;
import com.marea.diarydbt.dto.RegistrazioneRequest;
import com.marea.diarydbt.model.Utente;
import com.marea.diarydbt.repository.UtenteRepository;
import com.marea.diarydbt.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UtenteRepository utenteRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private JwtService jwtService;

    @InjectMocks private AuthService authService;

    @Test
    void registrazionePazienteSenzaTerapeutaAssegnaCodiceUnivoco() {
        RegistrazioneRequest req = new RegistrazioneRequest("mariarossi", "passwordlunga", "PAZIENTE", null);

        when(utenteRepository.existsByUsername("mariarossi")).thenReturn(false);
        when(passwordEncoder.encode("passwordlunga")).thenReturn("hash-finto");
        when(utenteRepository.findByCodicePaziente(anyString())).thenReturn(Optional.empty());
        when(utenteRepository.save(any(Utente.class))).thenAnswer(inv -> {
            Utente u = inv.getArgument(0);
            u.setId("id-generato");
            return u;
        });
        when(jwtService.generaToken(anyString(), anyString())).thenReturn("token-finto");

        AuthResponse risposta = authService.registra(req);

        assertThat(risposta.username()).isEqualTo("mariarossi");
        assertThat(risposta.ruolo()).isEqualTo("PAZIENTE");
        assertThat(risposta.codicePaziente()).isNotBlank();
        assertThat(risposta.token()).isEqualTo("token-finto");
    }

    @Test
    void registrazioneConUsernameGiaEsistenteFallisce() {
        RegistrazioneRequest req = new RegistrazioneRequest("mariarossi", "passwordlunga", "PAZIENTE", null);
        when(utenteRepository.existsByUsername("mariarossi")).thenReturn(true);

        assertThatThrownBy(() -> authService.registra(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("già in uso");

        verify(utenteRepository, never()).save(any());
    }

    @Test
    void registrazionePazienteConCodiceTerapeutaValidoSiCollega() {
        RegistrazioneRequest req = new RegistrazioneRequest("mariarossi", "passwordlunga", "PAZIENTE", "ABC123");

        Utente terapeuta = Utente.builder().id("terapeuta-id").ruolo(Utente.Ruolo.TERAPEUTA).build();

        when(utenteRepository.existsByUsername("mariarossi")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hash-finto");
        when(utenteRepository.findByCodicePaziente("ABC123")).thenReturn(Optional.of(terapeuta));
        // per la generazione del codice univoco casuale della paziente stessa
        when(utenteRepository.findByCodicePaziente(argThat(c -> c == null || !c.equals("ABC123"))))
                .thenReturn(Optional.empty());
        when(utenteRepository.save(any(Utente.class))).thenAnswer(inv -> {
            Utente u = inv.getArgument(0);
            u.setId("paziente-id-generato");
            return u;
        });
        when(jwtService.generaToken(anyString(), anyString())).thenReturn("token-finto");

        AuthResponse risposta = authService.registra(req);

        assertThat(risposta.ruolo()).isEqualTo("PAZIENTE");
        verificaTerapeutaCollegata(terapeuta);
    }

    private void verificaTerapeutaCollegata(Utente terapeutaAtteso) {
        verify(utenteRepository).save(argThat(u -> u.getTerapeuta() != null
                && u.getTerapeuta().getId().equals(terapeutaAtteso.getId())));
    }

    @Test
    void registrazionePazienteConCodiceTerapeutaInesistenteFallisce() {
        RegistrazioneRequest req = new RegistrazioneRequest("mariarossi", "passwordlunga", "PAZIENTE", "NONESISTE");

        when(utenteRepository.existsByUsername("mariarossi")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hash-finto");
        // il codice paziente casuale viene generato e controllato PRIMA del
        // codice terapeuta: entrambe le chiamate a findByCodicePaziente
        // devono restituire "non trovato" per arrivare al controllo vero
        when(utenteRepository.findByCodicePaziente(anyString())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.registra(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Codice terapeuta non valido");
    }

    @Test
    void loginConCredenzialiCorretteRestituisceToken() {
        LoginRequest req = new LoginRequest("mariarossi", "passwordgiusta");
        Utente utente = Utente.builder()
                .id("id-1").username("mariarossi").passwordHash("hash-salvato")
                .ruolo(Utente.Ruolo.PAZIENTE).codicePaziente("XYZ789")
                .creatoIl(Instant.now()).build();

        when(utenteRepository.findByUsername("mariarossi")).thenReturn(Optional.of(utente));
        when(passwordEncoder.matches("passwordgiusta", "hash-salvato")).thenReturn(true);
        when(jwtService.generaToken("id-1", "PAZIENTE")).thenReturn("token-finto");

        AuthResponse risposta = authService.login(req);

        assertThat(risposta.token()).isEqualTo("token-finto");
        assertThat(risposta.utenteId()).isEqualTo("id-1");
    }

    @Test
    void loginConPasswordSbagliataFallisce() {
        LoginRequest req = new LoginRequest("mariarossi", "passwordsbagliata");
        Utente utente = Utente.builder()
                .id("id-1").username("mariarossi").passwordHash("hash-salvato")
                .ruolo(Utente.Ruolo.PAZIENTE).build();

        when(utenteRepository.findByUsername("mariarossi")).thenReturn(Optional.of(utente));
        when(passwordEncoder.matches("passwordsbagliata", "hash-salvato")).thenReturn(false);

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Credenziali non valide");
    }

    @Test
    void loginConUsernameInesistenteFallisce() {
        LoginRequest req = new LoginRequest("nonesiste", "qualsiasi");
        when(utenteRepository.findByUsername("nonesiste")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Credenziali non valide");
    }
}
