package com.marea.service;

import com.marea.dto.SalvaIscrizioneRequest;
import com.marea.model.IscrizionePush;
import com.marea.repository.IscrizionePushRepository;
import com.marea.repository.UtenteRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DateTimeException;
import java.time.Instant;
import java.time.ZoneId;

@Service
@RequiredArgsConstructor
public class NotificheService {

    static final String FUSO_PREDEFINITO = "Europe/Rome";

    private final IscrizionePushRepository iscrizioni;
    private final UtenteRepository utenti;

    // Crea o aggiorna l'iscrizione di questo dispositivo (ora, fuso, acceso/spento)
    @Transactional
    public IscrizionePush salva(String utenteId, SalvaIscrizioneRequest req) {
        IscrizionePush iscrizione = iscrizioni.findByEndpoint(req.endpoint())
                .orElseGet(() -> IscrizionePush.builder().endpoint(req.endpoint()).creatoIl(Instant.now()).build());

        // Un endpoint appartiene a una sola persona: se il telefono cambia account passa al nuovo
        iscrizione.setUtente(utenti.getReferenceById(utenteId));
        iscrizione.setP256dh(req.p256dh());
        iscrizione.setAuth(req.auth());
        iscrizione.setOra(req.ora());
        iscrizione.setFuso(fusoValido(req.fuso()));
        iscrizione.setAttivo(req.attivo());
        return iscrizioni.save(iscrizione);
    }

    @Transactional
    public void rimuovi(String utenteId, String endpoint) {
        iscrizioni.deleteByEndpointAndUtenteId(endpoint, utenteId);
    }

    public static String fusoValido(String fuso) {
        if (fuso == null || fuso.isBlank()) return FUSO_PREDEFINITO;
        try {
            ZoneId.of(fuso);
            return fuso;
        } catch (DateTimeException e) {
            return FUSO_PREDEFINITO;
        }
    }
}
