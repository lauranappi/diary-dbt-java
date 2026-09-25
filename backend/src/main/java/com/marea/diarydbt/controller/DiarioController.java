package com.marea.diarydbt.controller;

import com.marea.diarydbt.dto.VoceDiarioDto;
import com.marea.diarydbt.dto.VoceDiarioRisposta;
import com.marea.diarydbt.service.DiarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/diario")
@RequiredArgsConstructor
public class DiarioController {

    private final DiarioService diarioService;

    // La paziente autenticata salva/aggiorna la voce di un giorno
    @PostMapping("/mio")
    public ResponseEntity<VoceDiarioRisposta> salvaMioDiario(@RequestBody VoceDiarioDto dto, Authentication auth) {
        String pazienteId = (String) auth.getPrincipal();
        var voce = diarioService.salva(pazienteId, dto);
        return ResponseEntity.ok(VoceDiarioRisposta.daEntita(voce));
    }

    // La paziente autenticata legge il proprio storico
    @GetMapping("/mio")
    public ResponseEntity<List<VoceDiarioRisposta>> mioStorico(
            @RequestParam LocalDate da, @RequestParam LocalDate a, Authentication auth) {
        String pazienteId = (String) auth.getPrincipal();
        var risposta = diarioService.storico(pazienteId, da, a).stream()
                .map(VoceDiarioRisposta::daEntita).toList();
        return ResponseEntity.ok(risposta);
    }

    // La terapeuta autenticata legge lo storico di una sua paziente collegata
    @GetMapping("/paziente/{pazienteId}")
    public ResponseEntity<List<VoceDiarioRisposta>> storicoPaziente(
            @PathVariable String pazienteId,
            @RequestParam LocalDate da, @RequestParam LocalDate a,
            Authentication auth) {
        String terapeutaId = (String) auth.getPrincipal();
        var risposta = diarioService.storicoComeTerapeuta(terapeutaId, pazienteId, da, a).stream()
                .map(VoceDiarioRisposta::daEntita).toList();
        return ResponseEntity.ok(risposta);
    }
}
