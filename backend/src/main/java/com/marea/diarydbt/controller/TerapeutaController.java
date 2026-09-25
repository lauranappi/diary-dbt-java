package com.marea.diarydbt.controller;

import com.marea.diarydbt.dto.CollegaPazienteRequest;
import com.marea.diarydbt.dto.PazienteRisposta;
import com.marea.diarydbt.service.TerapeutaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terapeuta")
@RequiredArgsConstructor
public class TerapeutaController {

    private final TerapeutaService terapeutaService;

    @PostMapping("/pazienti")
    public ResponseEntity<PazienteRisposta> collegaPaziente(
            @Valid @RequestBody CollegaPazienteRequest req, Authentication auth) {
        String terapeutaId = (String) auth.getPrincipal();
        var paziente = terapeutaService.collegaPaziente(terapeutaId, req.codicePaziente());
        return ResponseEntity.ok(new PazienteRisposta(
                paziente.getId(), paziente.getUsername(), paziente.getCollegataIl()));
    }

    @GetMapping("/pazienti")
    public ResponseEntity<List<PazienteRisposta>> mieiePazienti(Authentication auth) {
        String terapeutaId = (String) auth.getPrincipal();
        var risposta = terapeutaService.mieiePazienti(terapeutaId).stream()
                .map(p -> new PazienteRisposta(p.getId(), p.getUsername(), p.getCollegataIl()))
                .toList();
        return ResponseEntity.ok(risposta);
    }

    @DeleteMapping("/pazienti/{pazienteId}")
    public ResponseEntity<Void> scollegaPaziente(@PathVariable String pazienteId, Authentication auth) {
        String terapeutaId = (String) auth.getPrincipal();
        terapeutaService.scollegaPaziente(terapeutaId, pazienteId);
        return ResponseEntity.noContent().build();
    }
}
