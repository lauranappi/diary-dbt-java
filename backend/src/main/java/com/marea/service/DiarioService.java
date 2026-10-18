package com.marea.service;

import com.marea.dto.VoceDiarioDto;
import com.marea.model.Utente;
import com.marea.model.VoceDiario;
import com.marea.repository.UtenteRepository;
import com.marea.repository.VoceDiarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiarioService {

    private final VoceDiarioRepository voceDiarioRepository;
    private final UtenteRepository utenteRepository;

    public VoceDiario salva(String pazienteId, VoceDiarioDto dto) {
        VoceDiario voce = voceDiarioRepository
                .findByPazienteIdAndData(pazienteId, dto.data())
                .orElseGet(() -> {
                    Utente paziente = utenteRepository.getReferenceById(pazienteId);
                    return VoceDiario.builder().paziente(paziente).data(dto.data()).build();
                });

        // Aggiornamento parziale: una parte non inviata (null) resta com'e'. Cosi' il
        // Diary non cancella le abilita' spuntate o il planner, che hanno le loro pagine.
        // Una parte inviata vuota ({}) invece svuota quella parte.
        if (dto.scale() != null) voce.setScale(dto.scale());
        if (dto.toggle() != null) voce.setToggle(dto.toggle());
        if (dto.testi() != null) voce.setTesti(dto.testi());
        if (dto.abilitaUsate() != null) voce.setAbilitaUsate(dto.abilitaUsate());
        if (dto.planner() != null) voce.setPlanner(dto.planner());

        return voceDiarioRepository.save(voce);
    }

    // True se per quel giorno c'e' almeno qualcosa di compilato (serve ai promemoria)
    public boolean haCompilato(String pazienteId, LocalDate giorno) {
        return voceDiarioRepository.findByPazienteIdAndData(pazienteId, giorno)
                .map(v -> piena(v.getScale()) || piena(v.getToggle()) || piena(v.getTesti())
                        || piena(v.getAbilitaUsate()) || piena(v.getPlanner()))
                .orElse(false);
    }

    private static boolean piena(java.util.Map<?, ?> m) {
        return m != null && !m.isEmpty();
    }

    public List<VoceDiario> storico(String pazienteId, LocalDate da, LocalDate a) {
        return voceDiarioRepository.findByPazienteIdAndDataBetweenOrderByDataDesc(pazienteId, da, a);
    }

    // Una terapeuta puo' leggere il diario di una paziente solo se collegata a lei
    public List<VoceDiario> storicoComeTerapeuta(String terapeutaId, String pazienteId, LocalDate da, LocalDate a) {
        Utente paziente = utenteRepository.findById(pazienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paziente non trovata"));

        boolean collegata = paziente.getTerapeuta() != null
                && paziente.getTerapeuta().getId().equals(terapeutaId);
        if (!collegata) {
            throw new AccessDeniedException("Non sei collegata a questa paziente");
        }

        return storico(pazienteId, da, a);
    }
}
