package com.marea.service;

import com.marea.dto.ModificaProfiloRequest;
import com.marea.model.Utente;
import com.marea.repository.UtenteRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfiloService {

    private final UtenteRepository utenteRepository;

    // Cambia nome e cognome di chi e' collegato; gli altri dati (username, ruolo, codici) non si toccano da qui
    @Transactional
    public Utente modifica(String utenteId, ModificaProfiloRequest req) {
        Utente utente = utenteRepository.findById(utenteId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
        utente.setNome(req.nome().trim());
        utente.setCognome(req.cognome() == null ? "" : req.cognome().trim());
        return utente;
    }
}
