package com.marea.dto;

import com.marea.model.DocumentoUtente;

import java.time.Instant;
import java.util.Map;

public record DocumentoRisposta(String chiave, Map<String, Object> contenuto, long versione, Instant aggiornatoIl) {

    public static DocumentoRisposta da(DocumentoUtente d) {
        return new DocumentoRisposta(d.getChiave(), d.getContenuto(), d.getVersione(), d.getAggiornatoIl());
    }
}
