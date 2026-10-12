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
