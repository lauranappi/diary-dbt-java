package com.marea.migrazione;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marea.diario.DiarioService;
import com.marea.documenti.DocumentoService;
import com.marea.utente.Utente;
import com.marea.utente.UtenteRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
class ImportatoreSupabaseTest {

    @Autowired private ImportatoreSupabase importatore;
    @Autowired private UtenteRepository utenti;
    @Autowired private DiarioService diario;
    @Autowired private DocumentoService documenti;
    @Autowired private PasswordEncoder encoder;
    @Autowired private ObjectMapper mapper;

    private String esportazione(String suffisso) {
        String hash = encoder.encode("passwordvecchia1");
        return """
            {"utenti":[
               {"id":"a-1","email":"dott%1$s@example.com","hash":"%2$s"},
               {"id":"a-2","email":"pz%1$s@example.com","hash":"%2$s"},
               {"id":"a-3","email":"senzadati%1$s@example.com","hash":"%2$s"}],
             "diario":[
               {"code":"Dott%1$s","user_id":"a-1","data":{"profile":{"nome":"Anna","cognome":"Rossi","role":"terapeuta"}}},
               {"code":"pz%1$s","user_id":"a-2","data":{
                  "profile":{"nome":"Maria","cognome":"Bianchi","role":"paziente","terapeutaCode":"DOTT%1$s","customActs":["passeggiata"]},
                  "entries":{
                    "2026-10-01":{"scales":{"ai":3,"vg":null},"toggles":{"farmaci":"Sì","x":null},
                                  "texts":{"note":"giornata ok","vuoto":""},"skills":{"dear":true,"altra":false},
                                  "planner":{"mattina":["corsa"]}},
                    "non-una-data":{"scales":{"ai":1}}},
                  "actTried":{"a1":2},
                  "therapistNotes":{"2026-10-01":"bene"}}},
               {"code":"fantasma%1$s","user_id":"manca","data":{}}],
             "guida":[{"user_id":"a-2","data":{"postit":{"dear":[{"id":"p1","t":"ciao","ts":1}]},"pref":{"dear":{"ts":5}}}}]}
            """.formatted(suffisso, hash);
    }

    @Test
    void importaUtentiDiarioDocumentiECollegamenti() throws Exception {
        var r = importatore.importa(mapper.readTree(esportazione("1")));

        assertEquals(2, r.utentiCreati());
        assertEquals(1, r.utentiSaltati()); // "fantasma": nessun account Supabase
        assertEquals(1, r.vociDiario());
        assertEquals(1, r.collegamenti());

        Utente pz = utenti.findByUsername("pz1").orElseThrow();
        assertEquals(Utente.Ruolo.PAZIENTE, pz.getRuolo());
        assertNotNull(pz.getCodicePaziente());
        assertEquals("dott1", pz.getTerapeuta().getUsername());
        assertTrue(encoder.matches("passwordvecchia1", pz.getPasswordHash()));

        var voci = diario.storico(pz.getId(), LocalDate.of(2026, 10, 1), LocalDate.of(2026, 10, 1));
        assertEquals(1, voci.size());
        assertEquals(3, voci.get(0).getScale().get("ai"));
        assertFalse(voci.get(0).getScale().containsKey("vg"));
        assertEquals("Sì", voci.get(0).getToggle().get("farmaci"));
        assertEquals(java.util.Map.of("dear", true), voci.get(0).getAbilitaUsate());
        assertFalse(voci.get(0).getTesti().containsKey("vuoto"));

        assertTrue(documenti.leggi(pz.getId(), "post-it").isPresent());
        assertTrue(documenti.leggi(pz.getId(), "preferiti").isPresent());
        assertEquals(java.util.List.of("passeggiata"),
                documenti.leggi(pz.getId(), "abilita-personali").orElseThrow().contenuto().get("elenco"));
        assertTrue(documenti.leggi(pz.getId(), "fogli").isEmpty());
    }

    @Test
    void rilanciandoLImportazioneGliUtentiGiaPresentiVengonoSaltati() throws Exception {
        importatore.importa(mapper.readTree(esportazione("2")));
        var seconda = importatore.importa(mapper.readTree(esportazione("2")));
        assertEquals(0, seconda.utentiCreati());
        assertEquals(3, seconda.utentiSaltati());
    }
}
