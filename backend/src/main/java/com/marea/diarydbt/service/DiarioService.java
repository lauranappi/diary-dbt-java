package com.marea.diarydbt.service;

import com.marea.diarydbt.dto.VoceDiarioDto;
import com.marea.diarydbt.model.Utente;
import com.marea.diarydbt.model.VoceDiario;
import com.marea.diarydbt.repository.UtenteRepository;
import com.marea.diarydbt.repository.VoceDiarioRepository;
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

        voce.setScale(dto.scale());
        voce.setToggle(dto.toggle());
        voce.setTesti(dto.testi());
        voce.setAbilitaUsate(dto.abilitaUsate());
        voce.setPlanner(dto.planner());

        return voceDiarioRepository.save(voce);
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
