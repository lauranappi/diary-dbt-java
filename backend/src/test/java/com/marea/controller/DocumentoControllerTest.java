package com.marea.controller;

import com.marea.dto.AuthResponse;
import com.marea.dto.RegistrazioneRequest;
import com.marea.dto.SalvaDocumentoRequest;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class DocumentoControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    private AuthResponse registra(String ruolo, String codiceTerapeuta) throws Exception {
        String username = "u" + UUID.randomUUID().toString().substring(0, 8);
        var req = new RegistrazioneRequest(username, "passwordsicura123", ruolo, "Nome", "Cognome", null, codiceTerapeuta);
        String json = mockMvc.perform(post("/api/auth/registrati")
                        .contentType("application/json").content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        return objectMapper.readValue(json, AuthResponse.class);
    }

    private String corpo(Map<String, Object> contenuto, long versioneBase) throws Exception {
        return objectMapper.writeValueAsString(new SalvaDocumentoRequest(contenuto, versioneBase));
    }

    @Test
    void senzaTokenViesRifiutato() throws Exception {
        mockMvc.perform(get("/api/documenti")).andExpect(status().isForbidden());
    }

    @Test
    void documentoInesistenteDaNotFound() throws Exception {
        String token = registra("PAZIENTE", null).token();
        mockMvc.perform(get("/api/documenti/post-it").header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    void salvaERileggeIncrementandoLaVersione() throws Exception {
        String token = registra("PAZIENTE", null).token();

        mockMvc.perform(put("/api/documenti/post-it").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content(corpo(Map.of("a", 1), 0)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.versione").value(1));

        mockMvc.perform(put("/api/documenti/post-it").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content(corpo(Map.of("a", 2), 1)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.versione").value(2));

        mockMvc.perform(get("/api/documenti/post-it").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.contenuto.a").value(2));
    }

    @Test
    void modificaDaVersioneVecchiaDaConflittoConLaVersioneAttuale() throws Exception {
        String token = registra("PAZIENTE", null).token();
        mockMvc.perform(put("/api/documenti/preferiti").header("Authorization", "Bearer " + token)
                .contentType("application/json").content(corpo(Map.of("x", 1), 0))).andExpect(status().isOk());

        String json = mockMvc.perform(put("/api/documenti/preferiti").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content(corpo(Map.of("x", 2), 0)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.attuale.versione").value(1))
                .andReturn().getResponse().getContentAsString();
        JsonNode n = objectMapper.readTree(json);
        assertEquals(1, n.get("attuale").get("contenuto").get("x").asInt());
    }

    @Test
    void chiaveNonValidaViesRifiutata() throws Exception {
        String token = registra("PAZIENTE", null).token();
        mockMvc.perform(put("/api/documenti/CHIAVE_MAIUSCOLA").header("Authorization", "Bearer " + token)
                        .contentType("application/json").content(corpo(Map.of(), 0)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void ogniUtenteVedeSoloIPropriDocumenti() throws Exception {
        String t1 = registra("PAZIENTE", null).token();
        String t2 = registra("PAZIENTE", null).token();
        mockMvc.perform(put("/api/documenti/post-it").header("Authorization", "Bearer " + t1)
                .contentType("application/json").content(corpo(Map.of("segreto", true), 0))).andExpect(status().isOk());
        mockMvc.perform(get("/api/documenti/post-it").header("Authorization", "Bearer " + t2))
                .andExpect(status().isNotFound());
    }

    @Test
    void laTerapeutaVedeSoloIDocumentiCondivisiDellaPazienteCollegata() throws Exception {
        String codice = "t" + UUID.randomUUID().toString().substring(0, 8);
        var reqT = new RegistrazioneRequest(codice, "passwordsicura123", "TERAPEUTA");
        String jt = mockMvc.perform(post("/api/auth/registrati").contentType("application/json")
                .content(objectMapper.writeValueAsString(reqT))).andReturn().getResponse().getContentAsString();
        AuthResponse terapeuta = objectMapper.readValue(jt, AuthResponse.class);
        AuthResponse paziente = registra("PAZIENTE", codice);

        String tp = "Bearer " + paziente.token();
        mockMvc.perform(put("/api/documenti/fogli").header("Authorization", tp)
                .contentType("application/json").content(corpo(Map.of("f", 1), 0))).andExpect(status().isOk());
        mockMvc.perform(put("/api/documenti/post-it").header("Authorization", tp)
                .contentType("application/json").content(corpo(Map.of("p", 1), 0))).andExpect(status().isOk());

        mockMvc.perform(get("/api/terapeuta/pazienti/" + paziente.utenteId() + "/documenti")
                        .header("Authorization", "Bearer " + terapeuta.token()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fogli.contenuto.f").value(1))
                .andExpect(jsonPath("$['post-it']").doesNotExist());

        mockMvc.perform(put("/api/terapeuta/pazienti/" + paziente.utenteId() + "/documenti/note-terapeuta")
                        .header("Authorization", "Bearer " + terapeuta.token())
                        .contentType("application/json").content(corpo(Map.of("n", "ok"), 0)))
                .andExpect(status().isOk());

        // la paziente legge le note scritte dalla terapeuta
        mockMvc.perform(get("/api/documenti/note-terapeuta").header("Authorization", tp))
                .andExpect(status().isOk()).andExpect(jsonPath("$.contenuto.n").value("ok"));
    }

    @Test
    void unaTerapeutaNonCollegataNonVedeNiente() throws Exception {
        AuthResponse paziente = registra("PAZIENTE", null);
        AuthResponse altra = registra("TERAPEUTA", null);
        mockMvc.perform(get("/api/terapeuta/pazienti/" + paziente.utenteId() + "/documenti")
                        .header("Authorization", "Bearer " + altra.token()))
                .andExpect(status().isForbidden());
    }

    @Test
    void unaPazienteNonPuoUsareLeRotteDellaTerapeuta() throws Exception {
        AuthResponse paziente = registra("PAZIENTE", null);
        mockMvc.perform(get("/api/terapeuta/pazienti/" + paziente.utenteId() + "/documenti")
                        .header("Authorization", "Bearer " + paziente.token()))
                .andExpect(status().isForbidden());
    }
}
