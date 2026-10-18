package com.marea.controller;

import com.marea.dto.SalvaIscrizioneRequest;
import com.marea.service.NotificheService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifiche")
@RequiredArgsConstructor
public class NotificheController {

    private final NotificheService notificheService;

    @Value("${app.push.vapid-public:}")
    private String chiavePubblica;

    // Il browser ne ha bisogno per creare l'iscrizione push
    @GetMapping("/chiave-pubblica")
    public Map<String, String> chiavePubblica() {
        return Map.of("chiave", chiavePubblica);
    }

    @PutMapping("/iscrizione")
    public ResponseEntity<Void> salva(@Valid @RequestBody SalvaIscrizioneRequest req, Authentication auth) {
        notificheService.salva((String) auth.getPrincipal(), req);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/iscrizione")
    public ResponseEntity<Void> rimuovi(@RequestParam String endpoint, Authentication auth) {
        notificheService.rimuovi((String) auth.getPrincipal(), endpoint);
        return ResponseEntity.noContent().build();
    }
}
