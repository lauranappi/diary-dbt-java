// Parte generale del manuale (Linehan, DBT Skills Training, schede e fogli di lavoro).
// Stessi numeri, titoli e pagine del manuale; i testi sono riassunti con parole nostre.
// Un blocco ha: titolo?, testo?, voci? (stringhe oppure { t: 'in grassetto', d: 'resto' }), numerati?

export const PARTE_GENERALE = {
  id: 'pg',
  titolo: 'Parte generale',
  sottotitolo: 'Obiettivi, regole e teoria di base',
  icona: 'strumenti-generali',
  quando: "Le schede di orientamento del manuale: a cosa serve lo skills training, come funziona il gruppo e perché emozioni e azioni a volte sfuggono di mano.",
  schede: [
    {
      id: 'pg-1', numero: '1', sezione: 'Schede di orientamento', etichetta: 'OBIETTIVI', pagina: 9,
      titolo: 'Obiettivi dello skills training',
      blocchi: [
        { titolo: 'Obiettivo generale', testo: "Imparare a cambiare comportamenti, emozioni e pensieri che sono legati ai problemi della tua vita e ti fanno stare male." },
        { titolo: 'Comportamenti da ridurre', voci: [
          'Mancanza di mindfulness, senso di vuoto, scarso contatto con te e con gli altri, atteggiamento giudicante.',
          'Stress e conflitti nelle relazioni; solitudine.',
          'Rigidità e difficoltà ad affrontare i cambiamenti.',
          "Oscillazioni e emozioni estreme, comportamenti decisi dall'umore.",
          'Impulsività, agire senza pensare, difficoltà ad accettare la realtà, ostinazione, dipendenza da alcol o sostanze.',
        ] },
        { titolo: 'Abilità da incrementare', voci: ['Mindfulness', 'Efficacia interpersonale', 'Regolazione emotiva', 'Tolleranza della sofferenza'] },
        { titolo: 'I tuoi obiettivi', testo: "Il manuale lascia tre righe per i comportamenti da ridurre e tre per le abilità da incrementare: scrivile con le tue parole, con il tuo terapeuta o in gruppo." },
      ],
    },
    {
      id: 'pg-1a', numero: '1A', etichetta: 'OPZIONI', pagina: 10,
      titolo: 'Opzioni per risolvere i problemi',
      blocchi: [
        { titolo: 'Davanti a un problema hai quattro opzioni', numerati: true, voci: [
          { t: 'Risolvere il problema.', d: "Cambiare la situazione, evitarla, lasciar correre o trarne il meglio. Servono le abilità di efficacia interpersonale, il sentiero di mezzo e il problem solving." },
          { t: 'Sentirti meglio.', d: "Cambiare o regolare la tua risposta emotiva: abilità di regolazione emotiva." },
          { t: 'Tollerare il problema.', d: "Accettare sia il problema sia la tua reazione: abilità di tolleranza della sofferenza e di mindfulness." },
          { t: 'Restare infelice e afflitta.', d: "O magari peggiorare le cose. Per questa opzione: non usare abilità!" },
        ] },
      ],
    },
    {
      id: 'pg-2', numero: '2', etichetta: 'PANORAMICA', pagina: 11,
      titolo: 'Panoramica: introduzione allo skills training',
      blocchi: [
        { testo: 'Tre argomenti introduttivi, ognuno con la sua scheda:', voci: [
          'Linee guida per lo skills training (scheda 3)',
          'Assunti dello skills training (scheda 4)',
          'Teoria biosociale della disregolazione emotiva e comportamentale (scheda 5)',
        ] },
      ],
    },
    {
      id: 'pg-3', numero: '3', etichetta: 'LINEE GUIDA', pagina: 12,
      titolo: 'Linee guida per lo skills training',
      blocchi: [
        { titolo: 'Le presenze', voci: [
          "Chi salta una seduta non è fuori dal gruppo: si esce solo saltando quattro sedute programmate di fila.",
        ] },
        { titolo: 'Ci si sostiene a vicenda', voci: [
          'Si tengono riservati i nomi e ciò che si sente in gruppo.',
          'Si arriva in orario e si resta fino alla fine; si avvisa quando si sa di far tardi o di mancare.',
          'Ci si impegna a mettere in pratica le abilità tra una seduta e l’altra.',
          'Ci si valida a vicenda, senza giudicarsi, con un atteggiamento benevolo e collaborativo.',
          'Si è disposti ad accettare l’aiuto di chi si contatta.',
        ] },
        { titolo: 'Non si incoraggiano comportamenti problematici', voci: [
          'Niente sedute sotto effetto di sostanze o alcol; se ne hai già assunte, mantieni un comportamento sobrio.',
          'Dentro e fuori dalle sedute non si parlano comportamenti problematici attuali o passati che potrebbero “contagiare” gli altri.',
        ] },
        { titolo: 'Niente relazioni private fuori dal gruppo', voci: [
          'Non si iniziano relazioni sessuali o sentimentali che non si possano discutere in gruppo.',
          'Non ci si propone come compagni in comportamenti a rischio, condotte criminali o uso di sostanze.',
        ] },
      ],
    },
    {
      id: 'pg-4', numero: '4', etichetta: 'ASSUNTI', pagina: 13,
      titolo: 'Assunti circa lo skills training',
      blocchi: [
        { testo: 'Un assunto è una credenza che non si può dimostrare, ma che si sceglie di accettare.', numerati: true, voci: [
          { t: 'Le persone fanno il meglio che possono.', d: 'Tutte, in ogni momento.' },
          { t: 'Le persone vogliono migliorare.', d: 'Vogliono una vita migliore ed essere felici.' },
          { t: 'Serve essere più motivati a cambiare.', d: 'Fare del proprio meglio e volerlo non basta a risolvere il problema.' },
          { t: 'Non hai causato tutti i tuoi problemi, ma devi risolverli.', d: 'Per cambiare vita bisogna cambiare le proprie reazioni e l’ambiente. Ai ragazzi aiutano genitori e adulti di riferimento.' },
          { t: 'I nuovi comportamenti vanno appresi in ogni contesto.', d: 'Le abilità vanno praticate in tutte le situazioni in cui servono, non solo dove si sono imparate.' },
          { t: 'Ogni comportamento ha una causa.', d: 'Azioni, pensieri ed emozioni ne hanno una, anche se non la conosci.' },
          { t: 'Capire e cambiare le cause funziona meglio che giudicare e incolpare.', d: 'Giudicare è più facile, ma per cambiare qualcosa bisogna agire sulla catena degli eventi.' },
        ] },
      ],
    },
    {
      id: 'pg-5', numero: '5', etichetta: 'BIOSOCIALE', pagina: 14,
      titolo: 'Teoria biosociale',
      blocchi: [
        { titolo: 'Perché ho tanti problemi a controllare emozioni e azioni?', testo: 'Per l’incontro di una vulnerabilità biologica con un ambiente che non ti ha validata.' },
        { titolo: 'La vulnerabilità emotiva è biologica', voci: [
          'Alcune persone colgono sfumature emotive che altri non notano.',
          'Provano emozioni più spesso, più intense e che durano più a lungo; a volte sembrano arrivare senza motivo.',
        ] },
        { titolo: 'Anche l’impulsività ha basi biologiche', voci: [
          'Trattenere i comportamenti impulsivi è più difficile per alcuni: si agisce senza pensare e si finisce nei guai.',
          "Il tono dell'umore rende difficile organizzarsi per i propri obiettivi.",
        ] },
        { titolo: 'Un ambiente invalidante rende tutto più difficile', voci: [
          'Dice che le tue emozioni sono sbagliate, strane o cattive; spesso le ignora.',
          'Chi invalida spesso fa il meglio che può: può non sapere quanto la validazione conti, temere che faccia crescere le emozioni, essere sotto stress, oppure semplicemente c’è poca sintonia (“un tulipano in un giardino di rose”).',
        ] },
        { titolo: 'Un ambiente inefficace', voci: [
          'Può rinforzare emozioni e azioni fuori controllo: se gli altri cedono quando perdi il controllo, è più difficile riprenderlo.',
          'Se ti impone di cambiare senza dirti come, è difficile continuare a provarci.',
        ] },
        { titolo: 'Contano le transazioni', testo: 'Biologia e ambiente si influenzano a vicenda: la persona agisce sull’ambiente e l’ambiente sulla persona, in un circolo continuo.' },
      ],
    },
  ],
};
