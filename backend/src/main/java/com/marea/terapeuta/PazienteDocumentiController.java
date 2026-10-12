package com.marea.terapeuta;

import com.marea.documenti.DocumentoRisposta;
import com.marea.documenti.DocumentoService;
import com.marea.documenti.SalvaDocumentoRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

// La terapeuta legge i documenti condivisi delle sue pazienti e scrive le proprie note.
@RestController
@RequestMapping("/api/terapeuta/pazienti/{pazienteId}/documenti")
@RequiredArgsConstructor
public class PazienteDocumentiController {

    private final DocumentoService documentoService;

    @GetMapping
    @PreAuthorize("hasRole('TERAPEUTA')")
    public Map<String, DocumentoRisposta> condivisi(@PathVariable String pazienteId, Authentication auth) {
        return documentoService.condivisiComeTerapeuta((String) auth.getPrincipal(), pazienteId);
    }

    @PutMapping("/note-terapeuta")
    @PreAuthorize("hasRole('TERAPEUTA')")
    public DocumentoRisposta salvaNote(@PathVariable String pazienteId,
                                       @Valid @RequestBody SalvaDocumentoRequest req, Authentication auth) {
        return documentoService.salvaNoteTerapeuta((String) auth.getPrincipal(), pazienteId, req);
    }
}
