package com.marea.service;

import com.marea.dto.PazienteRisposta;
import com.marea.model.Utente;
import com.marea.model.VoceDiario;
import com.marea.repository.UtenteRepository;
import com.marea.repository.VoceDiarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TerapeutaService {

    private final UtenteRepository utenteRepository;
    private final VoceDiarioRepository voceDiarioRepository;

    // La terapeuta collega a se' una paziente usando il codice che la
    // paziente le ha comunicato (a voce, di persona - non è pensato per
    // passare da un canale scritto insicuro).
    public Utente collegaPaziente(String terapeutaId, String codicePaziente) {
        Utente terapeuta = utenteRepository.findById(terapeutaId)
                .orElseThrow(() -> new IllegalArgumentException("Terapeuta non trovata"));

        if (terapeuta.getRuolo() != Utente.Ruolo.TERAPEUTA) {
            throw new IllegalArgumentException("Solo una terapeuta può collegare una paziente");
        }

        Utente paziente = utenteRepository.findByCodicePaziente(codicePaziente)
                .orElseThrow(() -> new IllegalArgumentException("Codice paziente non valido"));

        if (paziente.getTerapeuta() != null) {
            throw new IllegalArgumentException("Questa paziente è già collegata a una terapeuta");
        }

        paziente.setTerapeuta(terapeuta);
        paziente.setCollegataIl(Instant.now());
        return utenteRepository.save(paziente);
    }

    public List<Utente> mieiePazienti(String terapeutaId) {
        return utenteRepository.findByTerapeutaId(terapeutaId);
    }

    // Una paziente con i numeri per l'elenco: giorni con una voce e data dell'ultima
    public PazienteRisposta conRiepilogo(Utente paziente) {
        long giorni = voceDiarioRepository.countByPazienteId(paziente.getId());
        var ultimo = voceDiarioRepository.findFirstByPazienteIdOrderByDataDesc(paziente.getId())
                .map(VoceDiario::getData).orElse(null);
        return PazienteRisposta.da(paziente, giorni, ultimo);
    }

    // La terapeuta puo' scollegare una paziente (es. fine del percorso
    // terapeutico) - i dati del diario della paziente restano, solo il
    // collegamento viene rimosso.
    public void scollegaPaziente(String terapeutaId, String pazienteId) {
        Utente paziente = utenteRepository.findById(pazienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paziente non trovata"));

        boolean collegataAQuestaTerapeuta = paziente.getTerapeuta() != null
                && paziente.getTerapeuta().getId().equals(terapeutaId);
        if (!collegataAQuestaTerapeuta) {
            throw new IllegalArgumentException("Questa paziente non è collegata a te");
        }

        paziente.setTerapeuta(null);
        paziente.setCollegataIl(null);
        utenteRepository.save(paziente);
    }

    // Come in Marea: e' la paziente a indicare il codice (username) della
    // propria terapeuta, dal profilo.
    public Utente collegaATerapeuta(String pazienteId, String codiceTerapeuta) {
        Utente paziente = utenteRepository.findById(pazienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paziente non trovata"));
        if (paziente.getRuolo() != Utente.Ruolo.PAZIENTE) {
            throw new IllegalArgumentException("Solo una paziente può indicare la propria terapeuta");
        }
        Utente terapeuta = utenteRepository.findByUsername(codiceTerapeuta.trim().toLowerCase())
                .filter(u -> u.getRuolo() == Utente.Ruolo.TERAPEUTA)
                .orElseThrow(() -> new IllegalArgumentException("Codice terapeuta non valido"));
        paziente.setTerapeuta(terapeuta);
        paziente.setCollegataIl(Instant.now());
        return utenteRepository.save(paziente);
    }

    public void scollegaDaTerapeuta(String pazienteId) {
        Utente paziente = utenteRepository.findById(pazienteId)
                .orElseThrow(() -> new IllegalArgumentException("Paziente non trovata"));
        paziente.setTerapeuta(null);
        paziente.setCollegataIl(null);
        utenteRepository.save(paziente);
    }
}
