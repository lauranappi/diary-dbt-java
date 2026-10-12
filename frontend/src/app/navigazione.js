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
