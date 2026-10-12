// I campi del diary, uno per uno. La pagina li legge da qui: per aggiungere o
// cambiare una domanda si modifica questo file, non il codice delle schede.
//
// tipo: 'scala' (0–5) | 'sino' (Sì/No) | 'testo' (una riga) | 'area' (testo lungo)
// 'id' e' la chiave con cui il dato viene salvato (scale / toggle / testi).
// Una scala puo' avere un testo abbinato (es. "Rapporti occasionali").

export const PASSI = [
  {
    id: 'comportamenti',
    titolo: 'Comportamenti',
    soprattitolo: 'Comportamenti suicidari / autolesivi',
    gruppi: [
      {
        colonne: 2,
        campi: [
          { tipo: 'scala', id: 'sp', etichetta: 'Pensieri suicidari (0–5)' },
          { tipo: 'sino', id: 'sa', etichetta: 'Azione suicidaria' },
          { tipo: 'scala', id: 'ai', etichetta: 'Intenzione autolesività (0–5)' },
          { tipo: 'sino', id: 'aa', etichetta: 'Azione autolesività' },
        ],
      },
    ],
  },
  {
    id: 'sostanze',
    titolo: 'Sostanze e impulsi',
    soprattitolo: 'Comportamenti disfunzionali',
    gruppi: [
      {
        colonne: 2,
        campi: [
          { tipo: 'scala', id: 'alci', etichetta: 'Alcol — intenzione (0–5)' },
          { tipo: 'testo', id: 'alcu', etichetta: 'Alcol — uso (cosa e quanto?)', segnaposto: 'Es. un bicchiere di vino' },
          { tipo: 'scala', id: 'cbdi', etichetta: 'CBD — intenzione (0–5)' },
          { tipo: 'testo', id: 'cbdu', etichetta: 'CBD — uso (quanto?)', segnaposto: 'Es. 1' },
          { tipo: 'sino', id: 'ee', etichetta: 'Emotional eating' },
          { tipo: 'sino', id: 'farm', etichetta: 'Farmaci prescritti' },
        ],
      },
      {
        colonne: 2,
        campi: [
          { tipo: 'area', id: 'rim', etichetta: 'Rimuginio — su che cosa?', segnaposto: 'Descrivi...' },
          {
            tipo: 'scala',
            id: 'rap',
            etichetta: 'Rapporti occasionali — quanti?',
            ultimaEtichetta: '5+',
            testoAbbinato: { id: 'rap', segnaposto: 'Con chi, protetto/non... (opzionale)' },
          },
        ],
      },
    ],
  },
  {
    id: 'emozioni',
    titolo: 'Emozioni',
    soprattitolo: 'Emozioni (0–5)',
    gruppi: [
      {
        colonne: 2,
        campi: [
          { tipo: 'scala', id: 'ser', etichetta: 'Serenità' },
          { tipo: 'scala', id: 'gio', etichetta: 'Gioia' },
          { tipo: 'scala', id: 'pau', etichetta: 'Paura' },
          { tipo: 'scala', id: 'rab', etichetta: 'Rabbia' },
          { tipo: 'scala', id: 'tri', etichetta: 'Tristezza' },
          { tipo: 'scala', id: 'ver', etichetta: 'Vergogna' },
          { tipo: 'scala', id: 'col', etichetta: 'Colpa' },
          { tipo: 'scala', id: 'vuo', etichetta: 'Vuoto' },
        ],
      },
      {
        colonne: 2,
        campi: [
          { tipo: 'scala', id: 'sf', etichetta: 'Sofferenza fisica (0–5)' },
          { tipo: 'scala', id: 'se', etichetta: 'Sofferenza emotiva (0–5)' },
        ],
      },
    ],
  },
  {
    id: 'terapia',
    titolo: 'Terapia e attività',
    soprattitolo: 'Terapia & attività',
    gruppi: [
      {
        colonne: 3,
        campi: [
          { tipo: 'scala', id: 'abb', etichetta: 'Abbandonare la terapia (0–5)' },
          { tipo: 'scala', id: 'fid', etichetta: 'Fiducia nel cambiamento (0–5)' },
          { tipo: 'scala', id: 'atti', etichetta: 'Attività piacevoli — intenzione (0–5)' },
        ],
      },
      {
        colonne: 2,
        campi: [
          { tipo: 'area', id: 'att', etichetta: 'Attività piacevoli / sociali', segnaposto: 'Cosa, con chi...' },
          { tipo: 'area', id: 'note', etichetta: 'Note libere', segnaposto: 'Qualsiasi pensiero...' },
          { tipo: 'testo', id: 'emoprinc', etichetta: 'Emozione principale del giorno', segnaposto: 'Es. tristezza, ansia, gratitudine...' },
          { tipo: 'area', id: 'cosafunz', etichetta: 'Cosa ha funzionato oggi', segnaposto: 'Anche piccole cose... un momento di calma, un’abilità usata, qualcosa di piacevole.' },
        ],
      },
    ],
  },
];
