package com.marea.notifiche;

import com.marea.diario.DiarioService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

// Decide a chi mandare il promemoria "compila la diary card": a chi l'ha
// attivato, quando l'orario scelto e' passato da meno di 3 ore, se oggi non
// ha ancora compilato il diario e non ne ha gia' ricevuto uno.
@Service
@RequiredArgsConstructor
public class PromemoriaService {

    static final int FINESTRA_MINUTI = 180;
    static final String MESSAGGIO =
            "{\"title\":\"Marea\",\"body\":\"Non dimenticare di compilare la tua diary card di oggi! 📓\"}";

    private static final Logger log = LoggerFactory.getLogger(PromemoriaService.class);

    private final IscrizionePushRepository iscrizioni;
    private final DiarioService diarioService;
    private final InviatorePush inviatore;

    public record Riepilogo(int inviati, int saltati, int rimossi) {}

    @Transactional
    public Riepilogo invia(Instant adesso) {
        int inviati = 0, saltati = 0, rimossi = 0;

        for (IscrizionePush it : iscrizioni.findByAttivoTrue()) {
            ZonedDateTime locale = adesso.atZone(zona(it.getFuso()));
            LocalDate oggi = locale.toLocalDate();

            if (!dovutoOra(it.getOra(), locale) || oggi.equals(it.getUltimoInvio())
                    || diarioService.haCompilato(it.getUtente().getId(), oggi)) {
                saltati++;
                continue;
            }

            switch (inviatore.invia(it, MESSAGGIO)) {
                case INVIATO -> {
                    it.setUltimoInvio(oggi);
                    iscrizioni.save(it);
                    inviati++;
                }
                case SCADUTA -> {
                    iscrizioni.delete(it);
                    rimossi++;
                }
                case ERRORE -> log.warn("Promemoria non inviato all'iscrizione {}", it.getId());
            }
        }
        return new Riepilogo(inviati, saltati, rimossi);
    }

    static boolean dovutoOra(String ora, ZonedDateTime locale) {
        int obiettivo = LocalTime.parse(ora).toSecondOfDay() / 60;
        int minuti = locale.getHour() * 60 + locale.getMinute();
        return minuti >= obiettivo && minuti < obiettivo + FINESTRA_MINUTI;
    }

    private static ZoneId zona(String fuso) {
        return ZoneId.of(NotificheService.fusoValido(fuso));
    }
}
