package com.marea.diarydbt.controller;

import com.marea.diarydbt.dto.VoceDiarioDto;
import com.marea.diarydbt.model.VoceDiario;
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
    public ResponseEntity<VoceDiario> salvaMioDiario(@RequestBody VoceDiarioDto dto, Authentication auth) {
        String pazienteId = (String) auth.getPrincipal();
        return ResponseEntity.ok(diarioService.salva(pazienteId, dto));
    }

    // La paziente autenticata legge il proprio storico
    @GetMapping("/mio")
    public ResponseEntity<List<VoceDiario>> mioStorico(
            @RequestParam LocalDate da, @RequestParam LocalDate a, Authentication auth) {
        String pazienteId = (String) auth.getPrincipal();
        return ResponseEntity.ok(diarioService.storico(pazienteId, da, a));
    }

    // La terapeuta autenticata legge lo storico di una sua paziente collegata
    @GetMapping("/paziente/{pazienteId}")
    public ResponseEntity<List<VoceDiario>> storicoPaziente(
            @PathVariable String pazienteId,
            @RequestParam LocalDate da, @RequestParam LocalDate a,
            Authentication auth) {
        String terapeutaId = (String) auth.getPrincipal();
        return ResponseEntity.ok(diarioService.storicoComeTerapeuta(terapeutaId, pazienteId, da, a));
    }
}
