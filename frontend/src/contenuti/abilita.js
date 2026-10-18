// Le abilita' DBT che si spuntano ogni giorno, per gruppo.
// L'id con cui una spunta viene salvata e' 'sk_<gruppo>_<abilita>' (stesso formato di Marea,
// cosi' i dati trasferiti restano leggibili).

export const GRUPPI_ABILITA = [
  {
    nome: 'Mindfulness',
    icona: 'modulo-mindfulness',
    voci: ['Mente saggia', 'Osservare', 'Descrivere', 'Partecipare', 'Non giudicare', 'Stare focalizzato', 'Fare ciò che funziona'],
  },
  {
    nome: 'Regolazione emotiva',
    icona: 'modulo-regolazione',
    voci: ['Identificare emozioni', 'Controllare i fatti', 'PLEASE', 'Mastery', 'Cope ahead', 'Strutturare tempo', 'Obiettivi a lungo termine', 'Azione opposta', 'Problem solving'],
  },
  {
    nome: 'Efficacia interpersonale',
    icona: 'modulo-interpersonale',
    voci: ['Priorità nelle relazioni', 'DEAR MAN', 'GIVE', 'FAST', 'Frasi automotivanti'],
  },
  {
    nome: 'Tolleranza della sofferenza',
    icona: 'modulo-tolleranza',
    voci: ['TIP', 'STOP', 'Distrazione/auto-consolazione', 'Pro e contro', 'Accettazione radicale', 'Mezzo sorriso', 'Disponibilità'],
  },
  {
    nome: 'Sentiero di mezzo',
    icona: 'strumenti-generali',
    voci: ['Rinforzi positivi', 'Validare se stessi', 'Validare qualcun altro', 'Pensiero dialettico', 'Agire dialettico'],
  },
];

export const idAbilita = (gruppo, voce) => `sk_${gruppo}_${voce}`;

export const TOTALE_ABILITA = GRUPPI_ABILITA.reduce((somma, g) => somma + g.voci.length, 0);

// Una riga di spiegazione per ogni abilita' (si vede nella pagina Abilita' da schermi larghi)
export const DESCRIZIONI_ABILITA = {
  "Mente saggia": "L'equilibrio tra ragione ed emozione, la voce più profonda.",
  "Osservare": "Notare l'esperienza senza reagire o allontanarla.",
  "Descrivere": "Mettere in parole ciò che si osserva, senza giudizio.",
  "Partecipare": "Buttarsi pienamente nell'attività del momento.",
  "Non giudicare": "Vedere i fatti senza etichettarli buoni o cattivi.",
  "Stare focalizzato": "Fare una cosa alla volta, con tutta l'attenzione.",
  "Fare ciò che funziona": "Agire in modo efficace, non per avere ragione.",
  "Identificare emozioni": "Riconoscere e nominare cosa si sta provando.",
  "Controllare i fatti": "Verificare se l'emozione corrisponde ai fatti reali.",
  "PLEASE": "Curare corpo e sonno per ridurre la vulnerabilità emotiva.",
  "Mastery": "Fare ogni giorno qualcosa che dà senso di competenza.",
  "Cope ahead": "Provare mentalmente una situazione difficile in anticipo.",
  "Strutturare tempo": "Bilanciare doveri e piacere nella giornata.",
  "Obiettivi a lungo termine": "Tenere a mente cosa conta davvero, oltre l'oggi.",
  "Azione opposta": "Agire contro l'impulso quando l'emozione non è utile.",
  "Problem solving": "Definire il problema e cercare soluzioni concrete.",
  "Priorità nelle relazioni": "Capire cosa conta di più: obiettivo, relazione o rispetto di sé.",
  "DEAR MAN": "Chiedere ciò che serve in modo chiaro ed efficace.",
  "GIVE": "Mantenere la relazione mentre si chiede qualcosa.",
  "FAST": "Chiedere senza perdere il rispetto per se stessi.",
  "Frasi automotivanti": "Pensieri che aiutano ad affrontare situazioni difficili.",
  "TIP": "Cambiare rapidamente la chimica del corpo nella crisi.",
  "STOP": "Fermarsi prima di reagire d'impulso.",
  "Distrazione/auto-consolazione": "Spostare l'attenzione e prendersi cura di sé nella crisi.",
  "Pro e contro": "Valutare vantaggi e svantaggi prima di agire d'impulso.",
  "Accettazione radicale": "Accettare la realtà così com'è, senza combatterla.",
  "Mezzo sorriso": "Un gesto fisico che aiuta ad accettare il momento.",
  "Disponibilità": "Essere aperti alla realtà invece di opporsi.",
  "Rinforzi positivi": "Premiare i comportamenti che si vogliono mantenere.",
  "Validare se stessi": "Riconoscere come valide le proprie emozioni ed esperienze.",
  "Validare qualcun altro": "Riconoscere come valida l'esperienza di un'altra persona.",
  "Pensiero dialettico": "Tenere insieme due verità che sembrano opposte.",
  "Agire dialettico": "Trovare una via di mezzo tra estremi nel comportamento.",
};
