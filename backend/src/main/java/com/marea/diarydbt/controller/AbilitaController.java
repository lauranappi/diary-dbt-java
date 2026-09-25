package com.marea.diarydbt.controller;

import com.marea.diarydbt.dto.AbilitaDto;
import com.marea.diarydbt.service.AbilitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/abilita")
@RequiredArgsConstructor
public class AbilitaController {

    private final AbilitaService abilitaService;

    // Il catalogo e' identico per tutte/i: non serve autenticazione per
    // leggerlo, solo per registrare quali abilita' si sono usate (quello
    // resta nel diario, non qui).
    @GetMapping
    public ResponseEntity<List<AbilitaDto>> tutte() {
        return ResponseEntity.ok(abilitaService.tutte());
    }
}
