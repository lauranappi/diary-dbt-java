package com.marea.diarydbt.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marea.diarydbt.dto.LoginRequest;
import com.marea.diarydbt.dto.RegistrazioneRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.matchesPattern;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Test end-to-end: chiama davvero i controller, passa per la sicurezza vera,
// scrive su un database H2 in memoria (pulito a ogni classe di test).
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class AuthControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @Test
    void registrazioneTerapeutaRestituisceTokenESenzaCodicePaziente() throws Exception {
        RegistrazioneRequest req = new RegistrazioneRequest(
                "dott.ssa_test_" + System.nanoTime(), "passwordsicura123", "TERAPEUTA", null);

        mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", notNullValue()))
                .andExpect(jsonPath("$.ruolo").value("TERAPEUTA"))
                .andExpect(jsonPath("$.codicePaziente").doesNotExist());
    }

    @Test
    void registrazionePazienteRicevePropiocodiceDiSeiCaratteri() throws Exception {
        RegistrazioneRequest req = new RegistrazioneRequest(
                "paziente_test_" + System.nanoTime(), "passwordsicura123", "PAZIENTE", null);

        mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.codicePaziente", matchesPattern("^[A-Z2-9]{6}$")));
    }

    @Test
    void registrazioneConPasswordTroppoCortaVieneRifiutata() throws Exception {
        RegistrazioneRequest req = new RegistrazioneRequest(
                "utente_" + System.nanoTime(), "corta", "PAZIENTE", null);

        mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errore", notNullValue()));
    }

    @Test
    void registrazioneConUsernameDuplicatoVieneRifiutata() throws Exception {
        String username = "utente_duplicato_" + System.nanoTime();
        RegistrazioneRequest req = new RegistrazioneRequest(username, "passwordsicura123", "PAZIENTE", null);

        // prima registrazione: va bene
        mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk());

        // seconda con lo stesso username: deve fallire
        mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void accessoConCredenzialiCorretteFunziona() throws Exception {
        String username = "login_test_" + System.nanoTime();
        RegistrazioneRequest registrazione = new RegistrazioneRequest(
                username, "passwordsicura123", "PAZIENTE", null);
        mockMvc.perform(post("/api/auth/registrati")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(registrazione)));

        LoginRequest login = new LoginRequest(username, "passwordsicura123");
        mockMvc.perform(post("/api/auth/accedi")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", notNullValue()));
    }

    @Test
    void accessoConPasswordSbagliataVieneRifiutato() throws Exception {
        String username = "login_fallito_" + System.nanoTime();
        RegistrazioneRequest registrazione = new RegistrazioneRequest(
                username, "passwordsicura123", "PAZIENTE", null);
        mockMvc.perform(post("/api/auth/registrati")
                .contentType("application/json")
                .content(objectMapper.writeValueAsString(registrazione)));

        LoginRequest login = new LoginRequest(username, "passwordSBAGLIATA");
        mockMvc.perform(post("/api/auth/accedi")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isBadRequest());
    }
}
