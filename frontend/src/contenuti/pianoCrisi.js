// Le sezioni del piano di crisi. Le chiavi (segnali, a1...) sono quelle di Marea.
export const SEZIONI_PIANO_CRISI = [
  {
    titolo: 'Segnali di allarme',
    campi: [{ k: 'segnali', l: 'Come sai quando stai entrando in crisi? (pensieri, emozioni, comportamenti)', multilinea: true, segnaposto: 'Es. Comincio a isolarmi. Penso che non valga niente. Non riesco a dormire.' }],
  },
  {
    titolo: 'Le mie abilità — in ordine',
    aiuto: 'Cosa faccio prima, poi, poi ancora. Dalla più semplice alla più difficile.',
    numerati: true,
    campi: [
      { k: 'a1', segnaposto: 'Es. Acqua fredda sul viso (TIP)' },
      { k: 'a2', segnaposto: 'Es. Respiro 5 dentro, 7 fuori per 5 minuti' },
      { k: 'a3', segnaposto: 'Es. Metto della musica e mi distraggo (ACCETTA)' },
      { k: 'a4', segnaposto: 'Es. Chiamo una persona di fiducia' },
    ],
  },
  {
    titolo: 'Persone di fiducia',
    etichetta: 'Nome e contatto',
    campi: [
      { k: 'p1', segnaposto: 'Es. Mia sorella — 333 1234567' },
      { k: 'p2', segnaposto: 'Es. La mia terapeuta — 02 1234567' },
      { k: 'p3', segnaposto: 'Es. Amica del cuore — 347 7654321' },
    ],
  },
  {
    titolo: 'Numeri di emergenza',
    fissi: [
      ['Emergenza', '112'],
      ['Telefono Amico', '02 2327 2327'],
      ['Telefono Azzurro', '19696'],
    ],
    campi: [{ k: 'numeri', l: 'Altri numeri utili', multilinea: true, segnaposto: 'Es. Pronto soccorso vicino a casa...' }],
  },
  {
    titolo: 'Motivi per cui vale la pena',
    campi: [{ k: 'motivi', multilinea: true, segnaposto: 'Es. Il mio gatto. Le persone che mi vogliono bene. Il progetto che voglio finire.' }],
  },
];

export const CHIAVI_PIANO_CRISI = SEZIONI_PIANO_CRISI.flatMap((s) => s.campi.map((c) => c.k));
