package com.marea.diarydbt.service;

import com.marea.diarydbt.dto.AbilitaDto;
import org.springframework.stereotype.Service;

import java.util.List;

// Catalogo fisso delle abilita' DBT, organizzate per modulo. Non e' pensato
// per essere modificato dagli utenti (a differenza delle voci del diario,
// che sono per persona/giorno) - resta qui invece che nel database perche'
// cambia raramente e non ha senso una migrazione ogni volta che si aggiunge
// un'abilita'.
@Service
public class AbilitaService {

    private static final List<AbilitaDto> CATALOGO = List.of(
            // Mindfulness
            new AbilitaDto("mf-osservare", "Osservare", "mindfulness"),
            new AbilitaDto("mf-descrivere", "Descrivere", "mindfulness"),
            new AbilitaDto("mf-partecipare", "Partecipare", "mindfulness"),
            new AbilitaDto("mf-non-giudicante", "Mente non giudicante", "mindfulness"),
            new AbilitaDto("mf-una-cosa-alla-volta", "Una cosa alla volta", "mindfulness"),
            new AbilitaDto("mf-efficace", "Efficacia", "mindfulness"),

            // Tolleranza della sofferenza
            new AbilitaDto("ts-stop", "STOP", "tolleranza-sofferenza"),
            new AbilitaDto("ts-tipp", "TIPP (temperatura, esercizio, respiro, rilassamento)", "tolleranza-sofferenza"),
            new AbilitaDto("ts-distrarsi-accadere", "Distrarsi con ACCADERE", "tolleranza-sofferenza"),
            new AbilitaDto("ts-auto-consolazione", "Auto-consolazione con i 5 sensi", "tolleranza-sofferenza"),
            new AbilitaDto("ts-pro-contro", "Pro e contro", "tolleranza-sofferenza"),
            new AbilitaDto("ts-accettazione-radicale", "Accettazione radicale", "tolleranza-sofferenza"),

            // Regolazione delle emozioni
            new AbilitaDto("re-please", "PLEASE (curare il corpo)", "regolazione-emozioni"),
            new AbilitaDto("re-azione-opposta", "Azione opposta", "regolazione-emozioni"),
            new AbilitaDto("re-controllo-fatti", "Controllo dei fatti", "regolazione-emozioni"),
            new AbilitaDto("re-risolvere-problemi", "Risolvere il problema", "regolazione-emozioni"),
            new AbilitaDto("re-accumulare-positivo", "Accumulare emozioni positive", "regolazione-emozioni"),
            new AbilitaDto("re-mastery", "Costruire la padronanza", "regolazione-emozioni"),

            // Efficacia interpersonale
            new AbilitaDto("ei-dearman", "DEAR MAN", "efficacia-interpersonale"),
            new AbilitaDto("ei-give", "GIVE", "efficacia-interpersonale"),
            new AbilitaDto("ei-fast", "FAST", "efficacia-interpersonale")
    );

    public List<AbilitaDto> tutte() {
        return CATALOGO;
    }
}
