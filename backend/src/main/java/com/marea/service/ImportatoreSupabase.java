package com.marea.service;

import com.marea.dto.RiepilogoImportazione;
import com.marea.dto.SalvaDocumentoRequest;
import com.marea.dto.VoceDiarioDto;
import com.marea.model.Utente;
import com.marea.repository.UtenteRepository;
import com.marea.util.CodiciPaziente;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

// Porta in questo database i dati di Marea salvati su Supabase.
// L'esportazione e' un JSON prodotto da backend/migrazione/esporta-supabase.sql:
//   { "utenti": [{id, email, hash}], "diario": [{code, user_id, data}], "guida": [{user_id, data}] }
// Le password non vengono toccate: si copia l'hash bcrypt di Supabase, cosi' le
// persone entrano con la password di sempre. Si puo' rilanciare: gli utenti gia'
// presenti (stesso username) vengono saltati.
@Service
@RequiredArgsConstructor
public class ImportatoreSupabase {

    private static final Logger log = LoggerFactory.getLogger(ImportatoreSupabase.class);
    private static final TypeReference<Map<String, Object>> MAPPA = new TypeReference<>() {};

    private final UtenteRepository utenti;
    private final DiarioService diarioService;
    private final DocumentoService documentoService;
    private final ObjectMapper mapper;

    @Transactional
    public RiepilogoImportazione importa(JsonNode esportazione) {
        Map<String, JsonNode> accountPerId = new HashMap<>();
        esportazione.path("utenti").forEach(u -> accountPerId.put(u.path("id").asText(), u));
        Map<String, JsonNode> guidaPerId = new HashMap<>();
        esportazione.path("guida").forEach(g -> guidaPerId.put(g.path("user_id").asText(), g.path("data")));

        int creati = 0, saltati = 0, voci = 0, documenti = 0, collegamenti = 0;
        Map<String, String> terapeutaDi = new LinkedHashMap<>(); // username paziente -> codice terapeuta
        Set<String> nuovi = new HashSet<>();

        for (JsonNode riga : esportazione.path("diario")) {
            String username = riga.path("code").asText("").trim().toLowerCase();
            JsonNode account = accountPerId.get(riga.path("user_id").asText());
            if (username.isEmpty() || account == null || account.path("hash").asText("").isEmpty()
                    || utenti.existsByUsername(username)) {
                log.warn("Utente '{}' saltato (gia' presente o senza account Supabase)", username);
                saltati++;
                continue;
            }

            JsonNode dati = riga.path("data");
            JsonNode profilo = dati.path("profile");
            boolean terapeuta = profilo.path("role").asText("paziente").toLowerCase().contains("terap");
            String email = account.path("email").asText("");

            Utente.UtenteBuilder b = Utente.builder()
                    .username(username)
                    .passwordHash(account.path("hash").asText())
                    .nome(testo(profilo, "nome"))
                    .cognome(testo(profilo, "cognome"))
                    .email(email.isEmpty() || utenti.existsByEmail(email) ? null : email)
                    .ruolo(terapeuta ? Utente.Ruolo.TERAPEUTA : Utente.Ruolo.PAZIENTE)
                    .creatoIl(Instant.now());
            if (!terapeuta) {
                b.codicePaziente(CodiciPaziente.genera(c -> utenti.findByCodicePaziente(c).isPresent()));
            }
            Utente utente = utenti.save(b.build());
            creati++;
            nuovi.add(username);

            String codiceTerapeuta = testo(profilo, "terapeutaCode");
            if (!terapeuta && codiceTerapeuta != null) {
                terapeutaDi.put(username, codiceTerapeuta.trim().toLowerCase());
            }

            voci += importaVoci(utente.getId(), dati.path("entries"));
            documenti += importaDocumenti(utente.getId(), dati, guidaPerId.get(riga.path("user_id").asText()));
        }

        // Secondo giro: i collegamenti si fanno a fine importazione, quando tutte le terapeute esistono
        for (var e : terapeutaDi.entrySet()) {
            var paziente = utenti.findByUsername(e.getKey()).orElseThrow();
            var terapeuta = utenti.findByUsername(e.getValue())
                    .filter(u -> u.getRuolo() == Utente.Ruolo.TERAPEUTA);
            if (terapeuta.isPresent()) {
                paziente.setTerapeuta(terapeuta.get());
                paziente.setCollegataIl(Instant.now());
                utenti.save(paziente);
                collegamenti++;
            } else {
                log.warn("Terapeuta '{}' di {} non trovata: collegamento non creato", e.getValue(), e.getKey());
            }
        }

        var riepilogo = new RiepilogoImportazione(creati, saltati, voci, documenti, collegamenti);
        log.info("Importazione terminata: {}", riepilogo);
        return riepilogo;
    }

    private int importaVoci(String utenteId, JsonNode entries) {
        int n = 0;
        var campi = entries.fields();
        while (campi.hasNext()) {
            var e = campi.next();
            LocalDate giorno;
            try {
                giorno = LocalDate.parse(e.getKey());
            } catch (DateTimeParseException ex) {
                continue;
            }
            JsonNode v = e.getValue();
            Map<String, Integer> scale = new LinkedHashMap<>();
            v.path("scales").fields().forEachRemaining(f -> {
                if (f.getValue().isNumber()) scale.put(f.getKey(), f.getValue().asInt());
            });
            Map<String, String> toggle = new LinkedHashMap<>();
            v.path("toggles").fields().forEachRemaining(f -> {
                if (f.getValue().isTextual()) toggle.put(f.getKey(), f.getValue().asText());
            });
            Map<String, String> testi = new LinkedHashMap<>();
            v.path("texts").fields().forEachRemaining(f -> {
                if (f.getValue().isTextual() && !f.getValue().asText().isBlank()) testi.put(f.getKey(), f.getValue().asText());
            });
            Map<String, Boolean> abilita = new LinkedHashMap<>();
            v.path("skills").fields().forEachRemaining(f -> {
                if (f.getValue().asBoolean(false)) abilita.put(f.getKey(), true);
            });
            Map<String, Object> planner = v.path("planner").isObject()
                    ? mapper.convertValue(v.path("planner"), MAPPA) : Map.of();

            diarioService.salva(utenteId, new VoceDiarioDto(giorno, scale, toggle, testi, abilita, planner));
            n++;
        }
        return n;
    }

    // Forma dei documenti nel nuovo sistema: sempre un oggetto JSON.
    private int importaDocumenti(String utenteId, JsonNode dati, JsonNode guida) {
        int n = 0;
        n += documento(utenteId, "attivita-provate", dati.path("actTried"), "valori");
        n += documento(utenteId, "abilita-personali", dati.path("profile").path("customActs"), "elenco");
        n += documento(utenteId, "note-terapeuta", dati.path("therapistNotes"), "note");
        n += documento(utenteId, "note-paziente", dati.path("patientNotes"), "note");
        n += documento(utenteId, "fogli", dati.path("fogli"), null);
        if (guida != null) {
            n += documento(utenteId, "post-it", guida.path("postit"), null);
            n += documento(utenteId, "preferiti", guida.path("pref"), null);
        }
        return n;
    }

    // Salva solo se c'e' qualcosa. "contenitore" avvolge array e valori semplici in un oggetto.
    private int documento(String utenteId, String chiave, JsonNode valore, String contenitore) {
        if (valore == null || valore.isMissingNode() || valore.isNull() || valore.isEmpty()) return 0;
        Map<String, Object> contenuto;
        if (valore.isObject() && contenitore == null) {
            contenuto = mapper.convertValue(valore, MAPPA);
        } else {
            contenuto = new LinkedHashMap<>();
            contenuto.put(contenitore == null ? "valori" : contenitore, mapper.convertValue(valore, Object.class));
        }
        documentoService.salva(utenteId, chiave, new SalvaDocumentoRequest(contenuto, 0));
        return 1;
    }

    private static String testo(JsonNode nodo, String campo) {
        String t = nodo.path(campo).asText("");
        return t.isBlank() ? null : t;
    }
}
