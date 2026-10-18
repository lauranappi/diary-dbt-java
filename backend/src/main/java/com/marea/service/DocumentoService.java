package com.marea.service;

import com.marea.dto.DocumentoRisposta;
import com.marea.dto.SalvaDocumentoRequest;
import com.marea.exception.ConflittoVersioneException;
import com.marea.model.DocumentoUtente;
import com.marea.model.Utente;
import com.marea.repository.DocumentoRepository;
import com.marea.repository.UtenteRepository;
import com.marea.util.ChiaviDocumento;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentoService {

    private final DocumentoRepository documentoRepository;
    private final UtenteRepository utenteRepository;

    @Transactional(readOnly = true)
    public List<DocumentoRisposta> tutti(String utenteId) {
        return documentoRepository.findByUtenteId(utenteId).stream().map(DocumentoRisposta::da).toList();
    }

    @Transactional(readOnly = true)
    public Optional<DocumentoRisposta> leggi(String utenteId, String chiave) {
        controllaChiave(chiave);
        return documentoRepository.findByUtenteIdAndChiave(utenteId, chiave).map(DocumentoRisposta::da);
    }

    @Transactional
    public DocumentoRisposta salva(String utenteId, String chiave, SalvaDocumentoRequest req) {
        controllaChiave(chiave);
        Optional<DocumentoUtente> esistente = documentoRepository.findByUtenteIdAndChiave(utenteId, chiave);

        if (esistente.isEmpty()) {
            if (req.versioneBase() != 0) {
                throw new IllegalArgumentException("Versione di partenza non valida");
            }
            Utente utente = utenteRepository.getReferenceById(utenteId);
            DocumentoUtente nuovo = DocumentoUtente.builder()
                    .utente(utente).chiave(chiave).contenuto(req.contenuto())
                    .versione(1).aggiornatoIl(Instant.now()).build();
            return DocumentoRisposta.da(documentoRepository.save(nuovo));
        }

        DocumentoUtente doc = esistente.get();
        if (doc.getVersione() != req.versioneBase()) {
            throw new ConflittoVersioneException(DocumentoRisposta.da(doc));
        }
        doc.setContenuto(req.contenuto());
        doc.setVersione(doc.getVersione() + 1);
        doc.setAggiornatoIl(Instant.now());
        return DocumentoRisposta.da(documentoRepository.save(doc));
    }

    @Transactional
    public void elimina(String utenteId, String chiave) {
        controllaChiave(chiave);
        documentoRepository.findByUtenteIdAndChiave(utenteId, chiave).ifPresent(documentoRepository::delete);
    }

    // ── Accesso della terapeuta ────────────────────────────────────────

    @Transactional(readOnly = true)
    public Map<String, DocumentoRisposta> condivisiComeTerapeuta(String terapeutaId, String pazienteId) {
        controllaCollegamento(terapeutaId, pazienteId);
        Map<String, DocumentoRisposta> out = new java.util.LinkedHashMap<>();
        documentoRepository.findByUtenteId(pazienteId).stream()
                .filter(d -> ChiaviDocumento.CONDIVISE.contains(d.getChiave()))
                .forEach(d -> out.put(d.getChiave(), DocumentoRisposta.da(d)));
        return out;
    }

    // La terapeuta puo' scrivere solo le proprie note sulla paziente.
    @Transactional
    public DocumentoRisposta salvaNoteTerapeuta(String terapeutaId, String pazienteId, SalvaDocumentoRequest req) {
        controllaCollegamento(terapeutaId, pazienteId);
        return salva(pazienteId, ChiaviDocumento.NOTE_TERAPEUTA, req);
    }

    private void controllaCollegamento(String terapeutaId, String pazienteId) {
        Utente paziente = utenteRepository.findById(pazienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paziente non trovata"));
        boolean collegata = paziente.getTerapeuta() != null && paziente.getTerapeuta().getId().equals(terapeutaId);
        if (!collegata) {
            throw new AccessDeniedException("Non sei collegata a questa paziente");
        }
    }

    private void controllaChiave(String chiave) {
        if (!ChiaviDocumento.valida(chiave)) {
            throw new IllegalArgumentException("Chiave del documento non valida");
        }
    }
}
