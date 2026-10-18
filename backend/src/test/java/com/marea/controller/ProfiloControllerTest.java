package com.marea.controller;

import com.marea.dto.AuthResponse;
import com.marea.dto.RegistrazioneRequest;
import com.marea.repository.UtenteRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class ProfiloControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private UtenteRepository utenti;

    private AuthResponse registra() throws Exception {
        var req = new RegistrazioneRequest("u" + UUID.randomUUID().toString().substring(0, 8), "passwordsicura123", "PAZIENTE");
        String json = mockMvc.perform(post("/api/auth/registrati").contentType("application/json")
                .content(objectMapper.writeValueAsString(req))).andReturn().getResponse().getContentAsString();
        return objectMapper.readValue(json, AuthResponse.class);
    }

    @Test
    void senzaTokenVieneRifiutato() throws Exception {
        mockMvc.perform(put("/api/profilo").contentType("application/json")
                .content("{\"nome\":\"Laura\",\"cognome\":\"N\"}")).andExpect(status().isForbidden());
    }

    @Test
    void cambiaNomeECognome() throws Exception {
        AuthResponse a = registra();
        mockMvc.perform(put("/api/profilo").header("Authorization", "Bearer " + a.token())
                        .contentType("application/json").content("{\"nome\":\" Laura \",\"cognome\":\"Nappi\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Laura"))
                .andExpect(jsonPath("$.cognome").value("Nappi"));
        assertEquals("Nappi", utenti.findByUsername(a.username()).orElseThrow().getCognome());
    }

    @Test
    void ilNomeNonPuoEssereVuoto() throws Exception {
        AuthResponse a = registra();
        mockMvc.perform(put("/api/profilo").header("Authorization", "Bearer " + a.token())
                .contentType("application/json").content("{\"nome\":\"  \",\"cognome\":\"\"}"))
                .andExpect(status().isBadRequest());
    }
}
