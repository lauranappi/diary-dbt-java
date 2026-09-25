package com.marea.diarydbt.dto;

import com.marea.diarydbt.model.VoceDiario;

import java.time.LocalDate;
import java.util.Map;

// DTO di risposta: mai restituire l'entita' JPA grezza da un controller.
// VoceDiario ha un collegamento verso Utente caricato "pigro" da Hibernate
// (un proxy ByteBuddy), che Jackson non sa trasformare in JSON. Passando
// per questo DTO si prendono solo i dati veri, senza quel problema.
public record VoceDiarioRisposta(
        String id,
        LocalDate data,
        Map<String, Integer> scale,
        Map<String, String> toggle,
        Map<String, String> testi,
        Map<String, Boolean> abilitaUsate,
        Map<String, Object> planner
) {
    public static VoceDiarioRisposta daEntita(VoceDiario voce) {
        return new VoceDiarioRisposta(
                voce.getId(), voce.getData(), voce.getScale(), voce.getToggle(),
                voce.getTesti(), voce.getAbilitaUsate(), voce.getPlanner()
        );
    }
}
