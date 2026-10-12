package com.marea.documenti;

import java.time.Instant;
import java.util.Map;

public record DocumentoRisposta(String chiave, Map<String, Object> contenuto, long versione, Instant aggiornatoIl) {

    static DocumentoRisposta da(DocumentoUtente d) {
        return new DocumentoRisposta(d.getChiave(), d.getContenuto(), d.getVersione(), d.getAggiornatoIl());
    }
}
