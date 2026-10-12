package com.marea.utente;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/profilo")
@RequiredArgsConstructor
public class ProfiloController {

    private final ProfiloService profiloService;

    @PutMapping
    public Map<String, String> modifica(@Valid @RequestBody ModificaProfiloRequest req, Authentication auth) {
        Utente utente = profiloService.modifica((String) auth.getPrincipal(), req);
        return Map.of("nome", utente.getNome(), "cognome", utente.getCognome());
    }
}
