package com.marea.comune;

import com.marea.utente.Utente;
import com.marea.utente.UtenteRepository;
import com.marea.documenti.DocumentoService;
import com.marea.documenti.SalvaDocumentoRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

// Avvia l'app come in produzione su un PostgreSQL vero: Flyway crea lo schema
// e Hibernate lo confronta con le entita' (ddl-auto=validate). Se una migrazione
// e un'entita' non coincidono, il test fallisce. Gira solo se DATABASE_URL e'
// impostata (nell'azione GitHub c'e' un PostgreSQL di prova).
@SpringBootTest
@ActiveProfiles("prod")
@EnabledIfEnvironmentVariable(named = "DATABASE_URL", matches = ".+")
class MigrazioniPostgresTest {

    @Autowired private UtenteRepository utenti;
    @Autowired private DocumentoService documenti;

    @Test
    void loSchemaDelleMigrazioniCoincideConLeEntita() {
        Utente u = utenti.save(Utente.builder().username("prova-pg").passwordHash("x").ruolo(Utente.Ruolo.PAZIENTE).build());
        documenti.salva(u.getId(), "post-it", new SalvaDocumentoRequest(Map.of("a", 1), 0));
        assertEquals(1, documenti.leggi(u.getId(), "post-it").orElseThrow().contenuto().get("a"));
    }
}
