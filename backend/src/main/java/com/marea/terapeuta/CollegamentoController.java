package com.marea.terapeuta;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Lato paziente: indica (o toglie) la propria terapeuta, come dal profilo di Marea.
@RestController
@RequestMapping("/api/paziente/terapeuta")
@RequiredArgsConstructor
public class CollegamentoController {

    private final TerapeutaService terapeutaService;

    @PutMapping
    public ResponseEntity<Void> collega(@Valid @RequestBody CollegaTerapeutaRequest req, Authentication auth) {
        terapeutaService.collegaATerapeuta((String) auth.getPrincipal(), req.codiceTerapeuta());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> scollega(Authentication auth) {
        terapeutaService.scollegaDaTerapeuta((String) auth.getPrincipal());
        return ResponseEntity.noContent().build();
    }
}
