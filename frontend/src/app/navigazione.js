// Le voci della barra in basso, in base al ruolo. Il percorso e' anche l'indirizzo della sezione.
const PAZIENTE = [
  { percorso: '/', etichetta: 'Home' },
  { percorso: '/diario', etichetta: 'Diary' },
  { percorso: '/guida', etichetta: 'Guida' },
  { percorso: '/abilita', etichetta: 'Abilità' },
  { percorso: '/storico', etichetta: 'Storico' },
  { percorso: '/attivita', etichetta: 'Attività' },
];

const TERAPEUTA = [
  { percorso: '/', etichetta: 'Home' },
  { percorso: '/pazienti', etichetta: 'Pazienti' },
  { percorso: '/guida', etichetta: 'Guida' },
];

export function vociPerRuolo(ruolo) {
  return ruolo === 'TERAPEUTA' ? TERAPEUTA : PAZIENTE;
}

// Voci della barra laterale (schermi larghi): stesso ordine e nomi di Marea su desktop
const LATERALE_PAZIENTE = [
  { percorso: '/', etichetta: 'Home' },
  { percorso: '/diario', etichetta: 'Diary card' },
  { percorso: '/attivita', etichetta: 'Attività' },
  { percorso: '/storico', etichetta: 'Storico & Trend' },
  { percorso: '/abilita', etichetta: 'Abilità' },
  { percorso: '/guida', etichetta: 'Guida DBT' },
];

const LATERALE_TERAPEUTA = [
  { percorso: '/', etichetta: 'Home' },
  { percorso: '/pazienti', etichetta: 'Pazienti' },
  { percorso: '/guida', etichetta: 'Guida DBT' },
];

export function vociLateraliPerRuolo(ruolo) {
  return ruolo === 'TERAPEUTA' ? LATERALE_TERAPEUTA : LATERALE_PAZIENTE;
}
