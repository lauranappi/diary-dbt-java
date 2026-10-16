// Tolleranza della sofferenza: stesso ordine, numeri e pagine del manuale; testi riassunti con parole nostre.
// Le liste lunghe (distrazioni, autoconsolazione, dipendenze comuni…) sono raggruppate con esempi.

export const TOLLERANZA = {
  id: 'tol',
  titolo: 'Tolleranza della sofferenza',
  sottotitolo: 'Quando la crisi è già in corso',
  icona: 'modulo-tolleranza',
  quando: 'Quando provi un dolore intenso che non puoi alleviare subito, o agiresti sulla spinta dell’emozione peggiorando le cose. Include le abilità per quando la crisi è la dipendenza.',
  schede: [
    {
      id: 'tol-1', numero: '1', etichetta: 'OBIETTIVI', pagina: 321,
      titolo: 'Obiettivi della tolleranza della sofferenza',
      blocchi: [
        { titolo: 'Sopravvivere alle situazioni di crisi', voci: ['Senza farle peggiorare.'] },
        { titolo: 'Accettare la realtà', voci: ['Sostituire la sofferenza e il sentirsi “bloccati” con il dolore a cui si è abituati e con la possibilità di andare avanti.'] },
        { titolo: 'Diventare liberi', voci: ['Dall’obbligo di soddisfare le impellenze imposte da desideri, impulsi ed emozioni intense.'] },
      ],
    },
    {
      id: 'tol-2', numero: '2', sezione: 'Sopravvivere alla crisi', etichetta: 'PANORAMICA', pagina: 325,
      titolo: 'Panoramica: abilità di sopravvivenza alla crisi',
      blocchi: [
        { testo: 'Servono a tollerare eventi dolorosi, impulsi ed emozioni quando non puoi sistemare le cose subito.' },
        { voci: [
          { t: 'STOP:', d: 'fermarti prima di agire.' },
          { t: 'Pro e contro:', d: 'decidere tra due linee di comportamento.' },
          { t: 'TIP:', d: 'cambiare la chimica del corpo.' },
          { t: 'Distrarsi:', d: '“la mente saggia ACCETTA”.' },
          { t: 'Autoconsolarsi:', d: 'attraverso i cinque sensi.' },
          { t: 'Migliorare il momento.', d: '' },
        ] },
      ],
    },
    {
      id: 'tol-3', numero: '3', etichetta: 'QUANDO', pagina: 326,
      titolo: 'Quando usare le abilità di sopravvivenza alla crisi',
      blocchi: [
        { titolo: 'Sei in crisi quando la situazione…', voci: [
          'È molto stressante.',
          'È di breve durata: non persiste a lungo.',
          'Crea una forte pressione a risolverla subito.',
        ] },
        { titolo: 'Usale quando…', voci: [
          'Provi un dolore intenso che non si può alleviare in fretta.',
          'Agiresti sulla spinta dell’emozione, ma peggioreresti la situazione.',
          'La mente emotiva rischia di prendere il sopravvento e devi mantenere il controllo.',
          'Le emozioni sono travolgenti, ma le richieste dell’ambiente vanno soddisfatte.',
          'Le emozioni sono molto forti ma ciò che le ha generate non si può risolvere nell’immediato.',
        ] },
        { titolo: 'Non usarle per…', voci: [
          'Affrontare i problemi di ogni giorno.',
          'Risolvere tutti i problemi della vita.',
          'Rendere la vita degna di essere vissuta.',
        ] },
      ],
    },
    {
      id: 'tol-4', numero: '4', etichetta: 'STOP', pagina: 327,
      titolo: 'L’abilità STOP',
      blocchi: [
        { numerati: true, voci: [
          { t: 'Stop.', d: 'Non reagire. Fermati, congelati, non muovere un muscolo: le emozioni potrebbero spingerti ad agire senza pensare. Mantieni il controllo.' },
          { t: 'Fai un passo indietro.', d: 'Prendi le distanze, fai una pausa, lascia correre, un respiro profondo. Non lasciare che i sentimenti ti spingano ad agire d’impulso.' },
          { t: 'Osserva.', d: 'Cosa succede dentro e fuori di te? Qual è la situazione, quali sono i tuoi pensieri e sentimenti, cosa dicono o fanno gli altri?' },
          { t: 'Procedi in maniera mindful.', d: 'Agisci con consapevolezza: considera pensieri e sentimenti tuoi e altrui, la situazione e i tuoi obiettivi. Chiedi alla mente saggia quali azioni migliorano la situazione e quali la peggiorano.' },
        ] },
      ],
    },
    {
      id: 'tol-5', numero: '5', etichetta: 'PRO E CONTRO', pagina: 328,
      titolo: 'Abilità dei pro e contro',
      blocchi: [
        { testo: 'Si usa ogni volta che devi decidere tra due linee di comportamento. Un impulso è come una crisi quando è molto forte e agire sulla sua scia peggiorerebbe la situazione nel lungo periodo (comportamenti pericolosi, di dipendenza o autolesivi, oppure rassegnarsi e smettere di fare ciò che serve per costruire la vita che vuoi).' },
        { titolo: 'Fai due liste, ciascuna con pro e contro', voci: [
          'Agire sull’impulso indotto dalla crisi: vantaggi e svantaggi.',
          'Resistere all’impulso, tollerare la sofferenza e non arrendersi: vantaggi e svantaggi.',
        ] },
        { titolo: 'Prima di essere travolta dall’impulso', voci: [
          'Scrivi la tua lista e portala con te.',
          'Ripetila più e più volte.',
        ] },
        { titolo: 'Quando l’impulso ti travolge', voci: [
          'Rileggi la lista, prendila in mano, ripetila.',
          'Immagina le conseguenze positive del resistere.',
          'Pensa alle conseguenze negative del cedere.',
          'Ricorda cosa è successo le altre volte che hai agito d’impulso in una crisi.',
        ] },
      ],
    },
    {
      id: 'tol-6', numero: '6', etichetta: 'TIP', pagina: 329,
      titolo: 'Abilità TIP: cambiare la chimica del corpo',
      blocchi: [
        { testo: 'Per ridurre in fretta le emozioni intense che dominano la mente. Attenzione: l’acqua molto fredda rallenta il battito e l’esercizio intenso lo accelera. Chiedi al medico prima di usare la TIP se hai problemi cardiaci o altre condizioni mediche, prendi farmaci che regolano il battito o betabloccanti, reagisci male al freddo o hai un disturbo del comportamento alimentare.' },
        { titolo: 'T · Temperatura: acqua fredda sul volto', voci: [
          'Trattieni il fiato e immergi il volto in una bacinella d’acqua fredda, oppure appoggia un impacco freddo (o un sacchetto ermetico con acqua fredda) su occhi e guance.',
          'Tieni per circa 30 secondi. L’acqua non deve scendere sotto i 10 °C.',
        ] },
        { titolo: 'I · Intenso esercizio fisico', voci: [
          'Calma il corpo quando è “su di giri”, anche solo per poco tempo.',
          'Consuma l’energia accumulata: corri, cammina a passo svelto, salta, gioca a basket, solleva pesi.',
        ] },
        { titolo: 'P · Placa il ritmo della respirazione', voci: [
          'Respira profondamente con la pancia.',
          'Rallenta: in media 5-6 respiri al minuto.',
          'Espira più a lungo di quanto inspiri (per esempio inspira 5 secondi, espira 7).',
        ] },
        { titolo: 'P · Rilassamento muscolare Progressivo', voci: [
          'Inspirando con la pancia, tieni in tensione i muscoli (senza arrivare al crampo) e osserva la tensione.',
          'Espirando, ripeti mentalmente “Rilassati” e distendi i muscoli.',
          'Nota la differenza tra tensione e rilassamento.',
        ] },
      ],
    },
    {
      id: 'tol-6a', numero: '6A', etichetta: 'ACQUA FREDDA', pagina: 330,
      titolo: 'Guida all’utilizzo dell’acqua fredda',
      blocchi: [
        { voci: [
          'Immergere il volto in acqua fredda (o appoggiare un sacchetto freddo su occhi e guance) trattenendo il fiato dice al cervello che stai andando sott’acqua: scatta il “riflesso da immersione”, che può metterci 15-30 secondi a partire.',
          'Il battito rallenta e il sangue viene convogliato soprattutto verso cervello e cuore: questa reazione fisica può aiutare a regolare le emozioni.',
          'È utile con emozioni molto forti e dolorose, o quando è forte l’impulso a comportamenti pericolosi per la tua incolumità.',
          'Funziona meglio da seduta, con tranquillità: muoverti o distrarti la rende meno efficace.',
          'Se hai problemi cardiaci o altre condizioni mediche, prendi farmaci per il battito o betabloccanti, chiedi prima al medico. Non usare acqua ghiacciata se reagisci male al freddo.',
        ] },
      ],
    },
    {
      id: 'tol-6b', numero: '6B', etichetta: 'RILASSAMENTO', pagina: 331,
      titolo: 'Guida al rilassamento muscolare progressivo',
      blocchi: [
        { titolo: 'Prima di cominciare', voci: [
          'All’inizio allenati su singoli muscoli, in un luogo tranquillo e con tempo a sufficienza; poi in luoghi diversi, per riuscire a rilassarti ovunque serva.',
          'L’efficacia migliora con la pratica. Se arrivano pensieri giudicanti, osservali, lasciali andare e torna all’esercizio.',
          'Se l’ansia cresce, conta fino a 5 mentre inspiri e fino a 7 mentre espiri, respirando con la pancia, finché torni all’esercizio.',
        ] },
        { titolo: 'I passi', numerati: true, voci: [
          'Assumi una posizione comoda, allenta gli abiti stretti, senza parti del corpo incrociate.',
          'Contrai ogni gruppo muscolare elencato sotto, concentrandoti sulla rigidità, per 5-6 secondi durante l’inspirazione; poi allenta ed espira.',
          'Mentre allenti, ripeti lentamente a mente “Rilassati”.',
          'Osserva come cambiano le sensazioni per 10-15 secondi, poi passa al gruppo successivo.',
        ] },
        { titolo: 'I 16 distretti muscolari', testo: 'Prima i singoli muscoli (16), poi i gruppi medi, infine i più ampi; con buona pratica puoi tendere e rilassare tutto il corpo: da “robot” a “bambola di pezza”.' },
        { numerati: true, voci: [
          'Mani e polsi: pugni piegati verso i polsi.',
          'Braccia e avambracci: pugni stretti, gomito piegato fino alle spalle.',
          'Spalle: avvicinale alle orecchie.',
          'Fronte: sopracciglia strette, fronte corrugata.',
          'Occhi: palpebre serrate.',
          'Naso e guance: naso arricciato, labbro superiore e guance verso gli occhi.',
          'Labbra e parte inferiore del volto: labbra serrate, estremità verso le orecchie.',
          'Lingua e bocca: denti stretti, lingua contro il palato.',
          'Collo: testa indietro contro un appoggio, oppure mento verso il torace.',
          'Torace: respiro profondo e trattenuto.',
          'Schiena: inarcala, avvicina le scapole.',
          'Addome: contrailo.',
          'Natiche: contraile.',
          'Cosce: gambe allungate, tira verso il piede.',
          'Polpacci: gambe allungate, dita dei piedi distese.',
          'Caviglie: gambe allungate, alluci vicini, talloni all’esterno, dita verso la pianta.',
        ] },
        { testo: 'Una volta imparato, allenati tre o quattro volte al giorno finché rilassarti in fretta diventa naturale: alla fine basterà lasciarti andare e dirti “Rilassati”.' },
      ],
    },
    {
      id: 'tol-6c', numero: '6C', etichetta: 'RIFORMULARE', pagina: 332,
      titolo: 'Guida alla riformulazione efficace dei pensieri',
      blocchi: [
        { testo: 'Si abbina al rilassamento progressivo.' },
        { numerati: true, voci: [
          { t: 'Scrivi l’evento scatenante', d: 'che spesso è collegato alle emozioni dolorose e su cui vuoi ridurre la reattività.' },
          { t: 'Chiediti: “Cosa sto dicendo a me stessa su questo evento?”', d: 'Scrivi i pensieri (per esempio: “mi odia”, “non ce la farò mai”, “sono fuori controllo”).' },
          { t: 'Ripensa la situazione in modo diverso,', d: 'che contraddica quei pensieri; scrivi più pensieri efficaci possibile al loro posto.' },
          { t: 'Quando l’evento non c’è, allenati a immaginarlo:', d: 'inspirando ripeti una frase automotivante efficace; espirando ripeti “Rilassati” e rilassa i muscoli.' },
          { t: 'Continua ad allenarti', d: 'finché hai piena padronanza.' },
          { t: 'Quando la situazione stressante arriva,', d: 'usa la riformulazione e il rilassamento.' },
        ] },
        { titolo: 'Frasi di esempio (in inspirazione, poi “… rilassati” in espirazione)', voci: [
          '“Non è importante… perciò… rilassati.”',
          '“Potrebbe non piacermi, ma ce la farò… perciò… rilassati.”',
          '“Ho bisogno di concentrarmi e di non essere nervosa… perciò… rilassati.”',
          '“Ho il controllo… perciò… rilassati.”',
        ] },
      ],
    },
    {
      id: 'tol-7', numero: '7', etichetta: 'DISTRARSI', pagina: 333,
      titolo: 'Distrarsi',
      blocchi: [
        { testo: 'Per ricordarla: “la mente saggia ACCETTA”.' },
        { titolo: 'Pratica Attività', voci: [
          'Concentrati su un compito importante, pulisci una stanza, costruisci qualcosa.',
          'Un film o la TV, giochi al computer o di carte, parole crociate o sudoku, leggere.',
          'Una passeggiata, sport o esercizio fisico, un evento a cui partecipare.',
          'Mangiare fuori o un piatto che ti piace; chiamare un’amica o uscire con lei; musica; tempo con i tuoi bambini.',
        ] },
        { titolo: 'Contribuisci al benessere altrui', voci: [
          'Fai volontariato, aiuta un’amica o un familiare.',
          'Sorprendi qualcuno con un pensiero gentile, un biglietto, un abbraccio.',
          'Dona oggetti che non ti servono; scrivi o chiama per incoraggiare o salutare.',
        ] },
        { titolo: 'Fai Confronti', voci: [
          'Confronta come ti senti ora con momenti in cui ti sentivi diversamente.',
          'Pensa a chi affronta le situazioni come te o meno bene; confrontati con chi è meno fortunato.',
          'Leggi o guarda storie sulle difficoltà di altre persone.',
        ] },
        { titolo: 'Attiva Emozioni diverse', voci: [
          'Libri, racconti o vecchie lettere; spettacoli e film coinvolgenti; musica che emoziona.',
          'Idee: film che fanno paura, libri comici, commedie, musica rilassante o attivante, cartoline buffe.',
          'Assicurati che ogni evento generi più emozioni.',
        ] },
        { titolo: 'Tieni lontano', voci: [
          'Lascia da parte la situazione per un momento; allontanati col pensiero.',
          'Costruisci un muro immaginario tra te e la situazione; blocca pensieri e immagini.',
          'Osserva la rimuginazione e di’ “No!”; metti il dolore in una scatola e allontanala per un momento.',
        ] },
        { titolo: 'AlTri pensieri', voci: [
          'Conta fino a dieci o conta i colori che vedi; ripeti le parole di una canzone; fai un puzzle.',
        ] },
        { titolo: 'Altre sensAzioni', voci: [
          'Stringi forte una palla di gomma, ascolta musica ad alto volume, esci sotto la pioggia, fai un bagno caldo.',
        ] },
      ],
    },
    {
      id: 'tol-8', numero: '8', etichetta: 'AUTOCONSOLAZIONE', pagina: 334,
      titolo: 'Autoconsolazione',
      blocchi: [
        { testo: 'Consolati attraverso i cinque sensi, con calma e consapevolezza.' },
        { titolo: 'Vista', voci: [
          'Guarda le stelle, un’alba o un tramonto, la natura intorno a te.',
          'Una candela accesa, un fiore, un angolo bello della stanza.',
          'Un museo, una galleria, le vetrine, una passeggiata in una zona graziosa.',
        ] },
        { titolo: 'Udito', voci: [
          'Musica che calma o dà energia; i suoni della natura o della città.',
          'Canta o canticchia la tua canzone preferita; crea una compilation da riascoltare.',
          'Sii consapevole di ogni suono che incontri.',
        ] },
        { titolo: 'Olfatto', voci: [
          'Un sapone, uno shampoo, un profumo o una crema che ti piacciono.',
          'Incenso o una candela profumata; l’aroma del caffè; cannella, biscotti o pane che cuociono.',
          'Rose; i profumi di un bosco; apri la finestra e respira.',
        ] },
        { titolo: 'Gusto', voci: [
          'I tuoi cibi preferiti, un dessert, il piatto della tua infanzia.',
          'Una tisana, una cioccolata calda, un frappè.',
          'Una caramella alla menta o una gomma; assapora ogni boccone con consapevolezza.',
        ] },
        { titolo: 'Tatto', voci: [
          'Un lungo bagno caldo o una doccia; un massaggio o un pediluvio; la crema per il corpo.',
          'Coccola il tuo animale; avvolgiti in una coperta; lenzuola pulite; indossa qualcosa di piacevole.',
          'Abbraccia qualcuno; guida con i finestrini abbassati; accarezza una superficie liscia.',
        ] },
      ],
    },
    {
      id: 'tol-8a', numero: '8A', etichetta: 'BODY SCAN', pagina: 335,
      titolo: 'Guida alla meditazione body scan',
      blocchi: [
        { titolo: 'Preparazione', voci: [
          'Siediti o sdraiati supina, senza gambe incrociate, braccia comode lungo i fianchi o sulle cosce.',
          'Occhi socchiusi. Se sei sdraiata, un cuscino sotto le ginocchia se serve.',
          'Immagina che il respiro segua la tua mente e scorra nel corpo; con curiosità e interesse.',
        ] },
        { titolo: 'Il percorso', numerati: true, voci: [
          'Alcuni respiri profondi finché ti senti a tuo agio.',
          'Porta l’attenzione alle dita del piede sinistro: “che cosa sento in questa parte del corpo?”. Immagina il respiro che le attraversa.',
          'Poi l’arco e il tallone, osservando caldo o freddo sulla pelle e il peso del piede.',
          'Prosegui con caviglia, polpaccio, ginocchio e coscia; poi ripeti con la gamba destra.',
          'Bacino, parte bassa della schiena, addome che sale e scende con il respiro.',
          'Torace; mano, braccio e spalla sinistri, poi destri; collo, mento, lingua, bocca, labbra, naso.',
          'Guance, occhi, fronte, cuoio capelluto, la sommità dei capelli.',
          'Infine lascia andare l’attenzione lontano dal corpo.',
        ] },
        { testo: 'Se ti accorgi di pensieri, suoni o sensazioni, osservali e con delicatezza distogli l’attenzione. Se la mente si distrae (succede quasi sempre), riportala con calma, dolcezza e fermezza sulla parte del corpo che stavi osservando. Riportarla più e più volte, senza giudizio né durezza, è l’essenza della meditazione.' },
      ],
    },
    {
      id: 'tol-9', numero: '9', etichetta: 'MIGLIORA', pagina: 336,
      titolo: 'Migliora il momento presente',
      blocchi: [
        { testo: 'Per ricordarla: “MIGLIORA”.' },
        { titolo: 'IMmaginazione', voci: [
          'Scene rilassanti; una stanza segreta dentro di te, arredata come preferisci, con la porta chiusa a ciò che ti ferisce.',
          'Immagina che le emozioni dolorose scorrano via come acqua in un condotto.',
          'Ripercorri con la mente un momento felice.',
        ] },
        { titolo: 'SIgnificato', voci: [
          'Cerca uno scopo o un significato nella situazione dolorosa.',
          'Concentrati sugli aspetti positivi e ripetili mentalmente.',
          'Ricorda, ascolta o leggi qualcosa sui valori spirituali.',
        ] },
        { titolo: 'PreGhiera', voci: [
          'Apri il cuore a un’entità superiore, a Dio (comunque lo chiami) o alla tua mente saggia.',
          'Chiedi la forza di sopportare il dolore.',
        ] },
        { titolo: 'Attività riLassanti', voci: [
          'Bagno caldo, latte caldo, massaggio al collo e al cuoio capelluto, yoga, respiri profondi.',
          'Modifica la tua espressione facciale.',
        ] },
        { titolo: 'PIccoli passi: una cosa per volta', voci: [
          'Concentrati solo su ciò che stai facendo, resta nel presente, porta l’attenzione sulle sensazioni fisiche.',
          'Fai un esercizio guidato di consapevolezza sensoriale (scheda 9A).',
        ] },
        { titolo: 'Breve ripOso', voci: [
          'Una breve vacanza; mettiti a letto con le coperte fin sopra la testa; una giornata al mare o nel bosco.',
          'Spegni il telefono per un giorno; un pomeriggio al parco; un’ora di pausa da un lavoro impegnativo.',
        ] },
        { titolo: 'AutoincoRAggiamento e riformulazione', voci: [
          '“Ne verrò fuori.” “Sto facendo il meglio che posso.” “Ce la posso fare.”',
          '“Passerà anche questo.” “Andrà bene.” “Non durerà per sempre.”',
          'Elenca (e fai) le riformulazioni che contano per te nelle crisi (per esempio: “il fatto che non sia venuto a prendermi non significa che non mi ami”).',
        ] },
      ],
    },
    {
      id: 'tol-9a', numero: '9A', etichetta: 'SENSORIALE', pagina: 337,
      titolo: 'Guida alla consapevolezza sensoriale',
      blocchi: [
        { testo: 'Trova una posizione comoda e, mantenendola, ascolta la tua risposta a ciascuna domanda. Puoi registrarle, farle a te stessa o chiedere a un’amica di leggerle, lasciando 5 secondi tra una e l’altra. Alcune domande (in sintesi):' },
        { titolo: 'Sentire il corpo', voci: [
          'Senti i capelli che toccano il capo, l’addome che sale e scende, lo spazio tra gli occhi e la distanza tra le orecchie?',
          'Senti il respiro dietro agli occhi, la parte inferiore dei piedi, un alito di vento sulle guance?',
          'Noti la posizione della lingua, lo spazio dentro la bocca, la differenza di peso o di calore tra le braccia?',
          'Senti il formicolio di una mano, la pesantezza delle gambe, il volto che si rilassa, il corpo che si regge sulle ossa?',
        ] },
        { titolo: 'Immaginare', voci: [
          'Una bella giornata in spiaggia, qualcosa di lontano, un bel fiore, qualcosa di molto piacevole.',
          'Come ti sentiresti se fossi una bambola di pezza, se fluttuassi su una nuvola o galleggiassi nell’acqua calda.',
        ] },
      ],
    },
    {
      id: 'tol-10', numero: '10', sezione: 'Accettare la realtà', etichetta: 'PANORAMICA', pagina: 341,
      titolo: 'Panoramica: abilità di accettazione della realtà',
      blocchi: [
        { testo: 'Servono per vivere una vita migliore di quella attuale.' },
        { voci: [
          { t: 'Accettazione radicale.', d: '' },
          { t: 'Orientare la mente.', d: '' },
          { t: 'Disponibilità.', d: '' },
          { t: 'Abbozzare un sorriso e mani aperte.', d: '' },
          { t: 'Rendere disponibile la mente:', d: 'mindfulness dei pensieri del momento.' },
        ] },
      ],
    },
    {
      id: 'tol-11', numero: '11', etichetta: 'ACCETTAZIONE', pagina: 342,
      titolo: 'Accettazione radicale',
      blocchi: [
        { testo: 'Quando eventi ed emozioni dolorosi si presentano e non puoi impedire che sia così.' },
        { titolo: 'Che cos’è', voci: [
          'Radicale significa in ogni aspetto, completa e totale.',
          'È accettazione nella mente, nel cuore e nel corpo.',
          'È smettere di combattere contro la realtà, di lamentarti che non sia come la vorresti, e lasciare andare l’amarezza.',
        ] },
        { titolo: 'Cosa accettare', voci: [
          'La realtà è com’è: i fatti del passato e del presente sono i fatti, anche se non ti piacciono.',
          'Ci sono limitazioni per il futuro, per tutti (ma vanno accettate solo quelle realistiche).',
          'Ogni cosa ha una causa, compresi gli eventi che ti fanno soffrire.',
          'La vita può valere la pena anche quando ci sono eventi dolorosi.',
        ] },
        { titolo: 'Perché accettare la realtà', voci: [
          'Rifiutarla non serve a cambiarla; per cambiarla devi prima accettarla.',
          'Il dolore non si può evitare: è il segnale naturale che qualcosa non va.',
          'Rifiutare la realtà trasforma il dolore in sofferenza e può tenerti bloccata in infelicità, amarezza, rabbia, tristezza, vergogna.',
          'L’accettazione può portare tristezza, ma di solito poi segue una calma profonda.',
          'La strada per uscire dall’inferno passa dall’infelicità: rifiutarla fa tornare indietro.',
        ] },
      ],
    },
    {
      id: 'tol-11a', numero: '11A', etichetta: 'OSTACOLI', pagina: 343,
      titolo: 'Accettazione radicale: i fattori che interferiscono',
      blocchi: [
        { titolo: 'L’accettazione radicale NON è', voci: ['Approvazione, compassione, amore, passività o ostinazione contro il cambiamento.'] },
        { titolo: 'Cosa interferisce', numerati: true, voci: [
          'Non hai le abilità: non sai come accettare eventi e fatti davvero dolorosi.',
          'Credi che accettare un fatto doloroso equivalga a prenderlo alla leggera o ad approvarlo, e che quindi non farai nulla per cambiarlo o prevenire eventi simili.',
          'Emozioni che ostacolano: tristezza insopportabile, rabbia verso la persona o il gruppo che ha causato l’evento o verso l’ingiustizia del mondo, vergogna schiacciante per chi sei, colpa per il tuo comportamento.',
        ] },
      ],
    },
    {
      id: 'tol-11b', numero: '11B', etichetta: 'PASSO PASSO', pagina: 344,
      titolo: 'Praticare l’accettazione radicale passo dopo passo',
      blocchi: [
        { numerati: true, voci: [
          'Osserva che stai mettendo in discussione la realtà o ti ostini contro di essa (“non dovrebbe essere così”).',
          'Ricordati che la realtà spiacevole è com’è e non si può cambiare (“questo è quello che è successo”).',
          'Ricordati che ci sono cause: il momento presente è il risultato di una sequenza di eventi; date quelle cause, la realtà doveva andare proprio così.',
          'Accetta con tutta te stessa (mente, corpo, spirito): dillo a voce, usa il dialogo interno, il rilassamento, il respiro, il sorriso accennato con le mani aperte, la preghiera, l’immaginazione o un luogo che ti aiuta.',
          'Pratica l’azione opposta: elenca i comportamenti che avresti se accettassi i fatti e mettili in atto come se avessi già accettato.',
          'Affronta in modo proattivo ciò che ti sembra inaccettabile: immagina di crederci e ripassa cosa faresti.',
          'Prenditi cura delle sensazioni del corpo mentre pensi a cosa devi accettare.',
          'Lascia entrare delusione, tristezza o dolore.',
          'Riconosci che la vita può valere la pena anche quando c’è dolore.',
          'Usa i pro e contro quando noti resistenza all’accettazione.',
        ] },
      ],
    },
    {
      id: 'tol-12', numero: '12', etichetta: 'ORIENTARE', pagina: 345,
      titolo: 'Orientare la mente',
      blocchi: [
        { testo: 'È come arrivare a un bivio: devi rivolgere la mente verso la strada dell’accettazione e allontanarla da quella del rifiuto. Scegliere di accettare non equivale ad accettare: ti mette solo sulla strada giusta.' },
        { numerati: true, voci: [
          { t: 'Osserva che non stai accettando:', d: 'rabbia, amarezza, fastidio, evitamento emotivo, frasi come “perché a me?”, “non lo sopporto”, “non doveva essere così”.' },
          { t: 'Prendi un impegno con te stessa', d: 'ad accettare la realtà com’è.' },
          { t: 'Fallo di nuovo, ancora e ancora,', d: 'a ogni bivio in cui puoi rifiutare o accettare.' },
          { t: 'Sviluppa un piano', d: 'per ritrovare la strada quando scivoli fuori dall’accettazione.' },
        ] },
      ],
    },
    {
      id: 'tol-13', numero: '13', etichetta: 'DISPONIBILITÀ', pagina: 346,
      titolo: 'Disponibilità',
      blocchi: [
        { testo: 'Essere pronti a entrare e partecipare pienamente alla vita. Trova una risposta di disponibilità a ogni situazione.' },
        { titolo: 'Disponibilità è…', voci: [
          'Fare ciò che è necessario, in ogni situazione, con entusiasmo e senza “trascinare i piedi”.',
          'Ascoltare con attenzione la mente saggia e poi agire di conseguenza.',
          'Agire sapendo di essere connessi con l’universo: le stelle, le persone che ti piacciono o no, il pavimento.',
        ] },
        { titolo: 'Ostinazione (da sostituire con la disponibilità) è…', voci: [
          'Rifiutarsi di tollerare il momento e di fare i cambiamenti necessari.',
          'Arrendersi; l’opposto del “fare ciò che funziona”.',
          'Provare a risolvere ogni situazione, insistere nel tenere il controllo.',
          'Attaccarsi a “me, me, me” e a “ciò che voglio proprio adesso”.',
        ] },
        { titolo: 'Disponibilità passo dopo passo', numerati: true, voci: [
          'Osserva l’ostinazione: etichettala, fanne esperienza.',
          'Accetta radicalmente che ora la senti (e forse la agisci): non puoi combattere l’ostinazione con l’ostinazione.',
          'Orienta la mente verso accettazione e disponibilità.',
          'Prova ad abbozzare un sorriso e a prendere una postura di disponibilità.',
          'Se l’ostinazione non si muove, chiediti: “qual è la minaccia?”.',
        ] },
      ],
    },
    {
      id: 'tol-14', numero: '14', etichetta: 'SORRISO', pagina: 347,
      titolo: 'Abbozzare un sorriso e mani aperte',
      blocchi: [
        { testo: 'Accettare la realtà attraverso il proprio corpo.' },
        { titolo: 'Abbozzare un sorriso', numerati: true, voci: [
          'Rilassa il volto dalla sommità del capo a mento e mandibola: fronte, occhi e sopracciglia, guance, bocca e lingua, denti non stretti. Se fai fatica, contrai i muscoli del volto e poi lasciali andare. Un sorriso teso è un ghigno.',
          'Lascia salire leggermente gli angoli della bocca, quel minimo che ti permette di accorgertene: un mezzo sorriso su un volto rilassato. Non serve che lo notino gli altri.',
          'Prova a mantenere un’espressione serena: la faccia comunica con il cervello, il corpo è connesso alla mente.',
        ] },
        { titolo: 'Mani aperte', voci: [
          { t: 'In piedi:', d: 'braccia lungo i fianchi, dritte o appena piegate, mani aperte girate all’esterno, palmi in su e dita rilassate.' },
          { t: 'Seduta:', d: 'mani in grembo o sulle cosce, palmi in su, dita rilassate.' },
          { t: 'Sdraiata:', d: 'braccia lungo i fianchi, palmi in su, dita rilassate.' },
          'Le mani comunicano con il cervello: il corpo è connesso alla mente.',
        ] },
      ],
    },
    {
      id: 'tol-14a', numero: '14A', etichetta: 'PRATICA', pagina: 348,
      titolo: 'Praticare “abbozzare un sorriso” e “mani aperte”',
      blocchi: [
        { numerati: true, voci: [
          { t: 'Al risveglio.', d: 'Appendi un ramoscello o la parola “sorriso” sul soffitto come promemoria; prima di alzarti respira dolcemente tre volte con il mezzo sorriso, magari con le mani aperte.' },
          { t: 'Nei momenti liberi.', d: 'Ovunque tu sia, fai un mezzo sorriso guardando un bambino, una foglia, un quadro; tre respiri dolci.' },
          { t: 'Con la musica.', d: 'Ascolta un brano per 2-3 minuti facendo attenzione a testo, ritmo e sentimenti del momento (non alle fantasie su altri momenti), con mezzo sorriso e mani aperte.' },
          { t: 'Quando sei irritata.', d: 'Mezzo sorriso o mani aperte (o entrambi) per tre respiri.' },
          { t: 'Da sdraiata.', d: 'Su una superficie piana, braccia lungo i fianchi, mani aperte, mezzo sorriso; respira dolcemente e lascia andare ogni muscolo, come un gatto rilassato davanti al camino. Per 15 respiri.' },
          { t: 'Da seduta.', d: 'A terra con la schiena dritta o su una sedia con i piedi appoggiati: mezzo sorriso, respiri, rilassati.' },
          { t: 'Verso una persona con cui sei arrabbiata.', d: 'Siedi tranquilla, mani aperte, mezzo sorriso. Pensa a chi ti ha fatto soffrire; prova a capire cosa la rende felice o infelice nella vita quotidiana, quali pensieri la guidano, cosa motiva speranze e azioni, se il suo sguardo è libero o condizionato da pregiudizi, odio o rabbia. Continua finché arriva un po’ di compassione e la rabbia si scioglie; ripeti più volte sulla stessa persona.' },
        ] },
      ],
    },
    {
      id: 'tol-15', numero: '15', etichetta: 'PENSIERI', pagina: 350,
      titolo: 'Mindfulness dei pensieri del momento',
      blocchi: [
        { titolo: 'Osserva i tuoi pensieri', voci: [
          'Come onde, che vanno e vengono; senza sopprimerli, giudicarli, trattenerli o analizzarli.',
          'Riconosci la loro presenza, pratica la disponibilità, fai un passo indietro e guardali correre dentro e fuori la mente.',
        ] },
        { titolo: 'Adotta una mente curiosa', voci: [
          'Chiediti: “da dove arrivano i miei pensieri?”. Osservali.',
          'Ogni pensiero, come entra, esce. Osserva senza giudicare e lascia andare i giudizi.',
        ] },
        { titolo: 'Ricorda: tu non sei i tuoi pensieri', voci: [
          'Non devi agire per forza sui pensieri.',
          'Ricorda le volte in cui hai pensato in modo molto diverso, e come pensi quando soffri meno.',
          'Il pensiero catastrofico fa parte della mente emotiva.',
        ] },
        { titolo: 'Non bloccare né sopprimere i pensieri', voci: [
          'Chiediti: “quali sensazioni sto cercando di evitare con questi pensieri?”. Porta l’attenzione alle sensazioni, poi torna ai pensieri; ripetilo più volte.',
          'Lascia che vadano e vengano come il respiro che osservi.',
          'Gioca con i pensieri: ripetili ad alta voce velocissimi, cantali, immaginali come parole di un clown, un nastro attorcigliato, un animale con cui coccolarti, un colore brillante, un semplice suono.',
          'Prova ad amare i tuoi pensieri.',
        ] },
      ],
    },
    {
      id: 'tol-15a', numero: '15A', etichetta: 'PRATICA', pagina: 351,
      titolo: 'Praticare la mindfulness dei pensieri del momento',
      blocchi: [
        { titolo: 'Osservando i pensieri', numerati: true, voci: [
          'Quando arriva un pensiero, digli: “un pensiero è entrato nella mia mente”; etichettalo (“il pensiero … è comparso”), con tono gentile.',
          'Chiediti da dove arrivano e guarda se lo capisci.',
          'Fai un passo indietro come in cima a una montagna, con la mente come un sassolino in fondo valle; osserva quali pensieri arrivano, poi torna nella mente.',
          'A occhi chiusi, cerca la prima sensazione fisica, poi il primo pensiero, e alterna. Un’altra volta alterna sensazioni emotive e pensieri.',
        ] },
        { titolo: 'Con le parole e il tono di voce', numerati: true, start: 5, voci: [
          'Dì ad alta voce un pensiero più volte, senza giudicare: velocissimo finché perde senso; lentissimo (una sillaba per respiro); con una voce diversa dalla tua; come in un dialogo comico; cantato con passione.',
        ] },
        { titolo: 'Con l’azione opposta', voci: [
          'Rilassa volto e corpo immaginando di accogliere i pensieri come semplici “pensieri-sensazioni” del cervello.',
          'Immagina cosa faresti se smettessi di credere a tutto ciò che pensi; ripeti mentalmente cosa vorresti fare se non li vedessi come fatti.',
          'Ama i tuoi pensieri mentre attraversano la mente.',
        ] },
        { titolo: 'Immaginando che la mente sia…', voci: [
          'Un nastro trasportatore: metti ogni pensiero in una scatola etichettata (preoccupazione, passato, pianificazione…).',
          'Un fiume con i pensieri come barche, e tu seduta sull’erba: prova a non salire a bordo. Oppure i binari con vagoni che passano: non saltare sul treno.',
          'Una foglia che galleggia in un torrente con il pensiero scritto sopra: lasciala scorrere via.',
          'Il cielo, con pensieri-uccelli che volano via oppure pensieri-nuvola che passano.',
          'Una stanza bianca con due porte: i pensieri entrano da una ed escono dall’altra; osservali con curiosità, senza analizzarli né chiederti se corrispondono ai fatti.',
        ] },
      ],
    },
    {
      id: 'tol-16', numero: '16', sezione: 'Quando la crisi è la dipendenza', etichetta: 'PANORAMICA', pagina: 355,
      titolo: 'Panoramica: quando la crisi è la dipendenza',
      blocchi: [
        { testo: 'Abilità per abbandonare la dipendenza. Puoi ricordarle come D, C, B, A.' },
        { voci: [
          { t: 'D · Astinenza Dialettica.', d: '' },
          { t: 'C · Mente Chiara.', d: '' },
          { t: 'B · Rinforzo della comunità, Bruciare i ponti e costruirne di nuovi.', d: '' },
          { t: 'A · Ribellione Alternativa e Negazione Adattiva.', d: '' },
        ] },
      ],
    },
    {
      id: 'tol-16a', numero: '16A', etichetta: 'DIPENDENZE', pagina: 356,
      titolo: 'Dipendenze comuni',
      blocchi: [
        { testo: 'Sei dipendente quando non riesci a interrompere un comportamento o l’uso di una sostanza nonostante le conseguenze negative e i tuoi sforzi di smettere. Se pensi di non avere dipendenze, ecco la lista del manuale, in ordine alfabetico; in fondo c’è spazio per aggiungere le tue.' },
        { voci: [
          'Alcol',
          'App per smartphone',
          'Attività criminali',
          'Attività sportive: bicicletta, bodybuilding, correre, escursioni e arrampicata, sollevamento pesi',
          'Bevande gasate',
          'Bulimia (purghe e vomito)',
          'Caffè',
          'Cibo e mangiare: carboidrati, un cibo specifico, cioccolato',
          'Cleptomania, rubare, taccheggiare',
          'Collezionismo: arte, monete, musica, scarpe, spazzatura, vestiti',
          'Comportamenti a rischio',
          'Computer',
          'Correre in auto',
          'Diete',
          'Diuretici',
          'Dormire',
          'E-mail',
          'Evitamento',
          'Ferite autoinflitte e automutilazione',
          'Fumare, tabacco',
          'Gioco d’azzardo',
          'Giochi e rompicapo',
          'Giochi su internet',
          'Guida spericolata',
          'Immaginare e fantasticare',
          'Internet',
          'Lavoro',
          'Mentire',
          'Messaggi',
          'Pornografia',
          'Pratiche spirituali',
          'Ricerca di attenzione',
          'Scommesse',
          'Sesso',
          'Shopping',
          'Social network',
          'Sostanze (illecite e prescritte)',
          'Spettegolare',
          'Televisione',
          'Tradire, barare',
          'Vandalismo',
          'Velocità',
          'Video',
          'Videogiochi',
        ] },
      ],
    },
    {
      id: 'tol-17', numero: '17', etichetta: 'ASTINENZA', pagina: 357,
      titolo: 'Astinenza dialettica',
      blocchi: [
        { titolo: 'Astinenza', voci: [
          'Abbandonare del tutto il comportamento di dipendenza.',
          { t: 'Pro:', d: 'chi si impegna all’astinenza ci riesce più a lungo.' },
          { t: 'Contro:', d: 'se ricade, impiega più tempo a “tornare a bordo”.' },
        ] },
        { titolo: 'Riduzione del danno', voci: [
          'Accettare che ci saranno episodi; minimizzare il danno senza chiedere la perfezione.',
          { t: 'Pro:', d: 'quando il comportamento torna, si riesce a “tornare a bordo” più in fretta.' },
          { t: 'Contro:', d: 'chi punta alla riduzione del danno ricade prima.' },
        ] },
        { titolo: 'Sintesi: astinenza dialettica', voci: [
          'L’obiettivo è smettere per sempre, l’astinenza completa; ma se il comportamento si ripresenta, minimizzare il danno e tornare all’astinenza il prima possibile.',
          { t: 'Pro:', d: 'funziona.' },
          { t: 'Contro:', d: 'è un lavoro: non c’è vacanza, sei sempre astinente o al lavoro per tornarlo.' },
          'Come gli atleti olimpionici: credere e comportarsi come se potessero vincere ogni gara, anche se hanno perso e perderanno ancora.',
        ] },
      ],
    },
    {
      id: 'tol-17a', numero: '17A', etichetta: 'PROGRAMMARE', pagina: 358,
      titolo: 'Programmare l’astinenza dialettica',
      blocchi: [
        { titolo: 'Programma l’astinenza', numerati: true, voci: [
          'Goditi il successo, ma con mente chiara; fai piani per la tentazione di ricadere.',
          'Passa tempo o resta in contatto con persone che rinforzano l’astinenza.',
          'Pianifica attività che rinforzano te, invece dei comportamenti dipendenti.',
          'Taglia i ponti: evita elementi o situazioni ad alto rischio.',
          'Costruisci nuovi ponti: immagini, odori e attività mentali (come “surfare l’impulso”) contro il craving.',
          'Trova modi alternativi di ribellarti.',
          'Annuncia pubblicamente l’astinenza; nega ogni idea di ricadere.',
        ] },
        { titolo: 'Impegnati per la riduzione del danno', numerati: true, voci: [
          'Chiama il terapeuta, lo sponsor o un mentore per indicazioni sulle abilità.',
          'Contatta altre persone efficaci che possano aiutarti.',
          'Liberati delle tentazioni e circondati di elementi che favoriscono comportamenti efficaci.',
          'Ripassa le abilità e le schede della DBT.',
          'Usa l’azione opposta (Regolazione emotiva, scheda 10) contro colpa e vergogna. Se nient’altro funziona, vai a un gruppo di mutuo aiuto e racconta pubblicamente la ricaduta.',
          'Mastery, gestire in anticipo (Regolazione emotiva, scheda 19) e controllare i fatti (scheda 8) aiutano contro il senso di perdita di controllo.',
          'Le abilità interpersonali (Efficacia interpersonale, schede 5-7): chiedere aiuto a famiglia, amici, sponsor, counselor; se sei isolata, cerca gruppi di supporto online.',
          'Fai un’analisi a catena per capire cosa ha scatenato la ricaduta (Parte generale, schede 7 e 7A).',
          'Fai subito problem solving per “tornare a bordo” ed eventualmente riparare i danni (Regolazione emotiva, scheda 12).',
          'Distraiti, autoconsolati, migliora il momento.',
          'Incoraggiati.',
          'Fai un pro e contro dell’interrompere i comportamenti di dipendenza (scheda 5).',
          'Stai lontana dal pensare per estremi: non trasformare uno scivolone in un disastro.',
          'Reimpegnati al 100% per l’astinenza totale.',
        ] },
      ],
    },
    {
      id: 'tol-18', numero: '18', etichetta: 'MENTE CHIARA', pagina: 359,
      titolo: 'Mente chiara',
      blocchi: [
        { titolo: 'La mente dipendente è', voci: [
          'Impulsiva, monotematica, disposta a tutto pur di avere una “dose”.',
          'Quando ci sei dentro, sei guidata dalla dipendenza: gli impulsi determinano pensieri, emozioni e comportamenti.',
        ] },
        { titolo: 'La mente pulita è', voci: [
          'Ingenua, corre rischi, ignora i pericoli.',
          'Sei pulita ma ignori i pericoli che potrebbero far ripartire il comportamento; ti credi invincibile e immune alle tentazioni future.',
        ] },
        { titolo: 'Entrambi gli estremi sono pericolosi', voci: [
          { t: 'Mente chiara: il posto più sicuro.', d: 'Sei pulita, ma ti ricordi della mente dipendente.' },
          'Accetti radicalmente che la ricaduta non è impossibile.',
          'Ti godi il successo continuando ad aspettarti impulsi e situazioni che possono tentarti, e ti tieni pronta.',
        ] },
      ],
    },
    {
      id: 'tol-18a', numero: '18A', etichetta: 'PATTERN', pagina: 360,
      titolo: 'Pattern comportamentali tipici della mente dipendente e della mente pulita',
      blocchi: [
        { titolo: 'Mente dipendente', voci: [
          'Mettere in atto i comportamenti di dipendenza.',
          'Pensieri come “non ho un vero problema”, “mi posso fare un po’”, “solo nel weekend”, “non lo sopporto!”.',
          'Rendere affascinante la dipendenza; cercare in rete o procurarsi ciò che serve; comprare, vendere o scambiare oggetti legati al comportamento; fare cose illegali o rischiose per pagarselo.',
          'Mentire, nascondersi, isolarsi, comportarsi come se si fosse sempre di fretta, non mantenere le promesse.',
          'Non guardare le persone negli occhi, trascurare l’igiene, evitare i medici, non avere “una vita”, comportarsi da disperati o ossessionati.',
        ] },
        { titolo: 'Mente pulita', voci: [
          'Fare cose apparentemente irrilevanti che in passato hanno sempre portato alla dipendenza.',
          'Pensieri come “ho imparato la lezione”, “posso controllare il vizio”, “non ho più un problema”, “posso farcela da sola”, “non lo sopporto!”.',
          'Interrompere o ridurre i farmaci che aiutano contro la dipendenza.',
          'Frequentare ambienti, amici o persone con cui vivi che sono ancora dipendenti; conservare l’attrezzatura o portare con sé denaro extra.',
          'Essere irresponsabile con le bollette, non andare ai gruppi, non affrontare i problemi che alimentano la dipendenza.',
          'Credere che sia solo questione di forza di volontà; isolarsi; pensare di poter riprendere antidolorifici o diete se te li prescrivono senza dire nulla della dipendenza passata.',
        ] },
      ],
    },
    {
      id: 'tol-19', numero: '19', etichetta: 'COMUNITÀ', pagina: 361,
      titolo: 'Rinforzo della comunità',
      blocchi: [
        { testo: 'Vuol dire sostituire i rinforzi alla dipendenza con rinforzi all’astinenza.' },
        { titolo: 'Rinforzare l’astinenza è fondamentale', voci: [
          'I rinforzi dell’ambiente hanno un ruolo potente nell’incoraggiare o scoraggiare la dipendenza.',
          'Per smettere devi costruire uno stile di vita senza dipendenza più soddisfacente di quello con la dipendenza.',
          'I comportamenti incompatibili con la dipendenza devono “pagare” ed essere ricompensati da chi ti circonda.',
          'La forza di volontà non basta. Se bastasse, sarebbe tutto perfetto!',
        ] },
        { titolo: 'Passi concreti', voci: [
          'Cerca persone con cui stare che non siano dipendenti.',
          'Aumenta le attività piacevoli che non coinvolgono la dipendenza; se non sai cosa ti piace, prova gruppi e attività diversi.',
        ] },
        { titolo: 'Esperimento personale sull’astinenza', voci: [
          'Impegnati a restare fuori dalla dipendenza per un numero di giorni e osserva i benefici che arrivano naturalmente.',
          'Evita temporaneamente gli eventi ad alto rischio e rimpiazzali con comportamenti incompatibili.',
          'Osserva tutti gli eventi positivi extra che capitano quando non metti in atto i comportamenti dipendenti.',
        ] },
      ],
    },
    {
      id: 'tol-20', numero: '20', etichetta: 'PONTI', pagina: 362,
      titolo: 'Bruciare i ponti e costruirne di nuovi',
      blocchi: [
        { titolo: 'Bruciare i ponti', testo: 'Accetta nel modo più radicale possibile che non metterai mai più in atto il comportamento dipendente, poi elimina rapidamente tutte le possibilità di farlo.' },
        { numerati: true, voci: [
          'Impegnati in modo assoluto all’astinenza dal comportamento specifico: entra nel “garage dell’astinenza” e chiudi bene la saracinesca (il più piccolo spazio può far entrare l’intero elefante).',
          'Elenca tutto ciò che rende possibile la dipendenza nella tua vita.',
          'Liberati di queste cose: elimina i contatti di chi colludeva con te e ogni elemento di rischio o tentazione.',
          'Elenca e fai tutto ciò che rende difficile o impossibile continuare: di’ sempre la verità sul tuo comportamento e racconta ad amici e familiari che hai smesso.',
        ] },
        { titolo: 'Costruire nuovi ponti', testo: 'Craving e impulsi sono legati a immagini e odori vividi di ciò che si desidera: più sono intensi, più forte è il craving.' },
        { voci: [
          'Costruisci immagini o odori diversi da tenere in mente quando senti un craving (per esempio, per una sigaretta immagina di essere in spiaggia: guardala e annusala nella mente).',
          'Guarda immagini in movimento o circondati di odori estranei alla dipendenza.',
          '“Surfa l’impulso”: immaginati su una tavola da surf sulle onde dei tuoi impulsi, osservali salire, scendere e sparire.',
        ] },
      ],
    },
    {
      id: 'tol-21', numero: '21', etichetta: 'RIBELLIONE', pagina: 363,
      titolo: 'Ribellione alternativa e negazione adattiva',
      blocchi: [
        { titolo: 'Ribellione alternativa', testo: 'Quando la dipendenza è un modo di ribellarsi all’autorità, alle convenzioni e alla noia di non infrangere le regole, sostituisci la ribellione distruttiva con una che ti tenga sul sentiero verso i tuoi obiettivi.' },
        { titolo: 'Esempi', voci: [
          'Metti scarpe spaiate, biancheria assurda o i vestiti al rovescio.',
          'Tingi i capelli di un colore appariscente, stampa uno slogan su una t-shirt, dipingi il viso.',
          'Vesti in modo molto elegante o molto trasandato dove nessuno se lo aspetta.',
          'Esprimi punti di vista impopolari, fai pensieri segreti, compi atti di bontà casuali.',
          'Scrivi una lettera con esattamente quello che vuoi dire.',
        ] },
        { titolo: 'Negazione adattiva', testo: 'Quando la mente non tollera il craving, prova la negazione adattiva.' },
        { voci: [
          'Prenditi una pausa dalla logica: non discutere con te stessa.',
          'Quando arriva l’impulso, nega di volere la sostanza e convinciti di volere altro (per esempio, ripensa l’impulso di fumare come voglia di uno stuzzicadenti aromatizzato; quello di bere come voglia di qualcosa di dolce; quello di giocare d’azzardo come voglia di una ribellione alternativa).',
          'Sii inossidabile con te stessa nella negazione e passa a comportamenti alternativi.',
          'Spegni il comportamento per 5 minuti, poi per altri 5. Dirti “sarò astinente per oggi” (o per quest’ora) significa dirti: “non sarà per sempre, adesso posso reggerlo”.',
        ] },
      ],
    },
  ],
};
