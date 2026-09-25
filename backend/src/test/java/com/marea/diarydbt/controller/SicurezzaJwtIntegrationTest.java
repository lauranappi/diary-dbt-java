package com.marea.diarydbt.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marea.diarydbt.dto.RegistrazioneRequest;
import com.marea.diarydbt.dto.VoceDiarioDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Verifica che la sicurezza JWT funzioni per davvero end-to-end: senza
// token le richieste protette vengono rifiutate, con un token valido
// ottenuto da una registrazione vera funzionano.
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class SicurezzaJwtIntegrationTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void endpointDiarioSenzaTokenVieneRifiutato() throws Exception {
        mockMvc.perform(get("/api/diario/mio")
                        .param("da", "2026-01-01")
                        .param("a", "2026-01-31"))
                .andExpect(status().isForbidden());
    }

    @Test
    void endpointDiarioConTokenNonValidoVieneRifiutato() throws Exception {
        mockMvc.perform(get("/api/diario/mio")
                        .param("da", "2026-01-01")
                        .param("a", "2026-01-31")
                        .header("Authorization", "Bearer token-completamente-inventato"))
                .andExpect(status().isForbidden());
    }

    @Test
    void endpointDiarioConTokenValidoFunziona() throws Exception {
        String token = registraERitornaToken();

        mockMvc.perform(get("/api/diario/mio")
                        .param("da", "2026-01-01")
                        .param("a", "2026-01-31")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void salvaEPoiRileggeLaPropriaVoceDelDiario() throws Exception {
        String token = registraERitornaToken();
        LocalDate oggi = LocalDate.now();

        VoceDiarioDto dto = new VoceDiarioDto(oggi, Map.of("ai", 4), Map.of("farmaci", "Sì"),
                Map.of("note", "una giornata difficile"), Map.of(), Map.of());

        mockMvc.perform(post("/api/diario/mio")
                        .header("Authorization", "Bearer " + token)
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/diario/mio")
                        .header("Authorization", "Bearer " + token)
                        .param("da", oggi.toString())
                        .param("a", oggi.toString()))
                .andExpect(status().isOk());
    }

    @Test
    void unaPazienteNonPuoLeggereLoStoricoDiUnAltraPazienteViaEndpointTerapeuta() throws Exception {
        // una paziente (non terapeuta) prova a usare l'endpoint riservato alle terapeute
        String tokenPaziente = registraERitornaToken();

        mockMvc.perform(get("/api/diario/paziente/qualsiasi-id")
                        .header("Authorization", "Bearer " + tokenPaziente)
                        .param("da", "2026-01-01")
                        .param("a", "2026-01-31"))
                // l'endpoint risponde comunque (l'autorizzazione qui e' verificata
                // dalla logica di collegamento paziente-terapeuta, non dal ruolo),
                // ma senza un vero collegamento la richiesta viene rifiutata
                .andExpect(status().is4xxClientError());
    }

    private String registraERitornaToken() throws Exception {
        RegistrazioneRequest req = new RegistrazioneRequest(
                "utente_sicurezza_" + System.nanoTime(), "passwordsicura123", "PAZIENTE", null);

        String risposta = mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        return objectMapper.readTree(risposta).get("token").asText();
    }
}
