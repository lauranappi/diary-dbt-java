package com.marea.controller;

import com.marea.dto.AuthResponse;
import com.marea.dto.RegistrazioneRequest;
import com.marea.dto.SalvaIscrizioneRequest;
import com.marea.repository.IscrizionePushRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class NotificheControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;
    @Autowired private IscrizionePushRepository iscrizioni;

    private String token() throws Exception {
        var req = new RegistrazioneRequest("u" + UUID.randomUUID().toString().substring(0, 8), "passwordsicura123", "PAZIENTE");
        String json = mockMvc.perform(post("/api/auth/registrati").contentType("application/json")
                .content(objectMapper.writeValueAsString(req))).andReturn().getResponse().getContentAsString();
        return objectMapper.readValue(json, AuthResponse.class).token();
    }

    private String corpo(String endpoint, String ora, boolean attivo) throws Exception {
        return objectMapper.writeValueAsString(new SalvaIscrizioneRequest(endpoint, "chiave", "auth", ora, "Europe/Rome", attivo));
    }

    @Test
    void senzaTokenVieneRifiutato() throws Exception {
        mockMvc.perform(put("/api/notifiche/iscrizione").contentType("application/json")
                .content(corpo("https://push/x", "21:00", true))).andExpect(status().isForbidden());
    }

    @Test
    void creaEAggiornaLIscrizione() throws Exception {
        String t = "Bearer " + token();
        String endpoint = "https://push/" + UUID.randomUUID();

        mockMvc.perform(put("/api/notifiche/iscrizione").header("Authorization", t)
                .contentType("application/json").content(corpo(endpoint, "21:00", true))).andExpect(status().isNoContent());
        mockMvc.perform(put("/api/notifiche/iscrizione").header("Authorization", t)
                .contentType("application/json").content(corpo(endpoint, "20:30", false))).andExpect(status().isNoContent());

        var salvata = iscrizioni.findByEndpoint(endpoint).orElseThrow();
        assertEquals("20:30", salvata.getOra());
        assertEquals(false, salvata.isAttivo());
    }

    @Test
    void rifiutaUnOrarioNonValido() throws Exception {
        String t = "Bearer " + token();
        mockMvc.perform(put("/api/notifiche/iscrizione").header("Authorization", t)
                .contentType("application/json").content(corpo("https://push/y", "25:99", true))).andExpect(status().isBadRequest());
    }

    @Test
    void rimuoveLIscrizione() throws Exception {
        String t = "Bearer " + token();
        String endpoint = "https://push/" + UUID.randomUUID();
        mockMvc.perform(put("/api/notifiche/iscrizione").header("Authorization", t)
                .contentType("application/json").content(corpo(endpoint, "21:00", true)));
        mockMvc.perform(delete("/api/notifiche/iscrizione").param("endpoint", endpoint).header("Authorization", t))
                .andExpect(status().isNoContent());
        assertTrue(iscrizioni.findByEndpoint(endpoint).isEmpty());
    }
}
