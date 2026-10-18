package com.marea.dto;

import com.marea.model.Utente;


import java.time.Instant;
import java.time.LocalDate;

// Una paziente nell'elenco della terapeuta: chi e', da quando e' collegata e quanto ha compilato.
public record PazienteRisposta(
        String id,
        String username,
        String nome,
        String cognome,
        Instant collegataIl,
        long giorniCompilati,
        LocalDate ultimoGiorno
) {
    public static PazienteRisposta da(Utente paziente, long giorniCompilati, LocalDate ultimoGiorno) {
        return new PazienteRisposta(paziente.getId(), paziente.getUsername(), paziente.getNome(),
                paziente.getCognome(), paziente.getCollegataIl(), giorniCompilati, ultimoGiorno);
    }
}
