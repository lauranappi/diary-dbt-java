package com.marea.service;

import com.marea.dto.ModificaProfiloRequest;
import com.marea.model.Utente;
import com.marea.repository.UtenteRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

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

    // Nome, cognome e terapeuta collegata (username e nome per esteso, se c'e')
    @Transactional(readOnly = true)
    public Map<String, String> leggi(String utenteId) {
        Utente utente = utenteRepository.findById(utenteId)
                .orElseThrow(() -> new IllegalArgumentException("Utente non trovato"));
        Map<String, String> out = new LinkedHashMap<>();
        out.put("nome", utente.getNome() == null ? "" : utente.getNome());
        out.put("cognome", utente.getCognome() == null ? "" : utente.getCognome());
        Utente t = utente.getTerapeuta();
        if (t != null) {
            out.put("codiceTerapeuta", t.getUsername());
            out.put("nomeTerapeuta", ((t.getNome() == null ? "" : t.getNome()) + " "
                    + (t.getCognome() == null ? "" : t.getCognome())).trim());
        }
        return out;
    }
}
