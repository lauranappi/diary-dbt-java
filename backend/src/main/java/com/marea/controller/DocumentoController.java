package com.marea.controller;

import com.marea.dto.DocumentoRisposta;
import com.marea.dto.SalvaDocumentoRequest;
import com.marea.service.DocumentoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Documenti personali dell'utente collegato (impostazioni, post-it, preferiti, fogli...).
@RestController
@RequestMapping("/api/documenti")
@RequiredArgsConstructor
public class DocumentoController {

    private final DocumentoService documentoService;

    @GetMapping
    public List<DocumentoRisposta> tutti(Authentication auth) {
        return documentoService.tutti((String) auth.getPrincipal());
    }

    @GetMapping("/{chiave}")
    public ResponseEntity<DocumentoRisposta> leggi(@PathVariable String chiave, Authentication auth) {
        return documentoService.leggi((String) auth.getPrincipal(), chiave)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{chiave}")
    public DocumentoRisposta salva(@PathVariable String chiave,
                                   @Valid @RequestBody SalvaDocumentoRequest req, Authentication auth) {
        return documentoService.salva((String) auth.getPrincipal(), chiave, req);
    }

    @DeleteMapping("/{chiave}")
    public ResponseEntity<Void> elimina(@PathVariable String chiave, Authentication auth) {
        documentoService.elimina((String) auth.getPrincipal(), chiave);
        return ResponseEntity.noContent().build();
    }
}
