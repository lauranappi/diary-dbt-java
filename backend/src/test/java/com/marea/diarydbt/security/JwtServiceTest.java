package com.marea.diarydbt.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService();
        // valore lungo abbastanza per HS256 (minimo 256 bit)
        ReflectionTestUtils.setField(jwtService, "secret",
                "chiave-di-test-lunga-abbastanza-per-hs256-1234567890");
        ReflectionTestUtils.setField(jwtService, "expirationMs", 3600000L); // 1 ora
    }

    @Test
    void generaTokenContieneIdUtenteERuolo() {
        String token = jwtService.generaToken("utente-123", "PAZIENTE");

        assertThat(jwtService.idUtenteDaToken(token)).isEqualTo("utente-123");
        assertThat(jwtService.ruoloDaToken(token)).isEqualTo("PAZIENTE");
    }

    @Test
    void tokenAppenaCreatoENonScaduto() {
        String token = jwtService.generaToken("utente-123", "TERAPEUTA");

        assertThat(jwtService.tokenValido(token)).isTrue();
    }

    @Test
    void tokenGiaScadutoNonEValido() {
        ReflectionTestUtils.setField(jwtService, "expirationMs", -1000L); // scaduto subito
        String token = jwtService.generaToken("utente-123", "PAZIENTE");

        assertThat(jwtService.tokenValido(token)).isFalse();
    }

    @Test
    void tokenManomessoNonEValido() {
        String token = jwtService.generaToken("utente-123", "PAZIENTE");
        String tokenManomesso = token.substring(0, token.length() - 5) + "XXXXX";

        assertThat(jwtService.tokenValido(tokenManomesso)).isFalse();
    }

    @Test
    void tokenVuotoONonRiconoscibileNonEValido() {
        assertThat(jwtService.tokenValido("non-e-un-token")).isFalse();
        assertThat(jwtService.tokenValido("")).isFalse();
    }
}
