// Mindfulness: stesso ordine, numeri e pagine del manuale; testi riassunti con parole nostre.
// Nel manuale mancano le schede 6 e 7 (non incluse in questa edizione): la numerazione resta quella originale.

export const MINDFULNESS = {
  id: 'mind',
  titolo: 'Mindfulness',
  sottotitolo: 'Tornare a un momento per volta',
  icona: 'modulo-mindfulness',
  quando: "La mindfulness è il filo di tutta la DBT: prestare attenzione, di proposito, al momento presente, senza giudicarlo e senza aggrapparsi. Si pratica mentre fai qualsiasi cosa, non solo seduta a meditare.",
  schede: [
    {
      id: 'mind-1', numero: '1', sezione: 'Obiettivi e definizioni', etichetta: 'OBIETTIVI', pagina: 45,
      titolo: 'Obiettivi della pratica della mindfulness',
      blocchi: [
        { titolo: 'Ridurre la sofferenza e aumentare la felicità', voci: ['Meno dolore, tensione e stress.'] },
        { titolo: 'Avere più controllo sulla tua mente', voci: ['Evitare che sia la mente a controllare te.'] },
        { titolo: 'Vivere la realtà così com’è', voci: [
          'Vivere con gli occhi aperti.',
          'Sperimentare la tua connessione con il mondo, la tua bontà essenziale e la tua validità essenziale.',
        ] },
      ],
    },
    {
      id: 'mind-1a', numero: '1A', etichetta: 'DEFINIZIONI', pagina: 46,
      titolo: 'Definizioni di mindfulness',
      blocchi: [
        { titolo: 'Che cos’è la mindfulness?', voci: [
          { t: 'Vivere intenzionalmente nel momento presente.', d: 'Uscire dal pilota automatico per essere presenti alla propria vita.' },
          { t: 'Senza giudicare né rifiutare il momento.', d: 'Notare le conseguenze e distinguere ciò che aiuta da ciò che fa male, ma lasciare andare valutazione, evitamento e soppressione.' },
          { t: 'Senza attaccamento.', d: 'Partecipare a ogni nuovo momento invece di restare aggrappati al passato o di rincorrere il futuro.' },
        ] },
        { titolo: 'Che cosa sono le abilità di mindfulness?', testo: 'Comportamenti specifici da praticare, che insieme formano la mindfulness.' },
        { titolo: 'Che cos’è la pratica?', voci: [
          'Si può fare sempre e ovunque, qualunque cosa tu stia facendo: basta prestare attenzione al presente senza giudicarlo né attaccarti.',
          'La meditazione è la pratica da ferma (seduta, in piedi, sdraiata): si focalizza la mente (corpo, emozioni, pensieri, respiro) oppure la si apre a ciò che arriva.',
          'Anche la preghiera contemplativa e il movimento consapevole (yoga, arti marziali, danza, camminare, andare a cavallo) sono pratica di mindfulness.',
        ] },
      ],
    },
    {
      id: 'mind-2', numero: '2', sezione: 'Abilità nucleari', etichetta: 'PANORAMICA', pagina: 49,
      titolo: 'Panoramica: abilità nucleari di mindfulness',
      blocchi: [
        { voci: [
          { t: 'Mente saggia:', d: 'gli stati della mente.' },
          { t: 'Abilità del “cosa”:', d: 'che cosa si fa praticando la mindfulness: osservare, descrivere, partecipare.' },
          { t: 'Abilità del “come”:', d: 'come si pratica: non giudicare, una cosa per volta, essere efficaci.' },
        ] },
      ],
    },
    {
      id: 'mind-3', numero: '3', etichetta: 'MENTE SAGGIA', pagina: 50,
      titolo: 'La mente saggia: stati della mente',
      blocchi: [
        { numerati: true, voci: [
          { t: 'Mente razionale.', d: 'Fredda, razionale, centrata sul compito. Ti guidano fatti, ragione, logica e aspetti pratici; valori e stati d’animo non contano.' },
          { t: 'Mente emotiva.', d: 'Calda, dipendente dall’umore, centrata sull’emozione. Ti governano umori, stati d’animo e impulsi a fare o dire; fatti e logica non contano.' },
          { t: 'Mente saggia.', d: 'La saggezza che ogni persona ha dentro: vede il valore sia della ragione sia dell’emozione e le riconcilia. È il sentiero di mezzo.' },
        ] },
      ],
    },
    {
      id: 'mind-3a', numero: '3A', etichetta: 'PRATICA', pagina: 51,
      titolo: 'Idee per praticare la mente saggia',
      blocchi: [
        { testo: 'Come ogni abilità, va allenata prima di averne bisogno, in situazioni facili: così sarà disponibile quando serve. Prova sia a occhi chiusi sia aperti.' },
        { numerati: true, voci: [
          { t: 'Il sassolino nel lago.', d: 'Immagina di essere un sassolino che scende piano nell’acqua calma fino al fondo; lì ferma l’attenzione al centro di te.' },
          { t: 'La scala a chiocciola.', d: 'Scendi i gradini dentro di te, fermandoti dove vuoi, fino al centro; resta lì.' },
          { t: 'Inspirare “mente”, espirare “saggia”.', d: 'Ripetile finché senti di essere nella mente saggia.' },
          { t: 'Fare una domanda alla mente saggia.', d: 'Chiedi mentre inspiri, ascolta la risposta mentre espiri, senza fartela da sola. Se non arriva, riprova.' },
          { t: 'Chiedersi: questa è mente saggia?', d: 'Come sopra, riferito a un’azione, un pensiero, un progetto.' },
          { t: 'Seguire il respiro fino al centro.', d: 'Lascia che l’attenzione si posi al fondo del respiro (plesso solare) o al centro della fronte; respira normalmente.' },
          { t: 'Espandere la consapevolezza.', d: 'Inspira al tuo centro; espirando allarga la consapevolezza allo spazio in cui sei.' },
          { t: 'Stare nelle pause.', d: 'Nota la pausa dopo l’inspirazione e quella dopo l’espirazione e lasciati “cadere” al loro interno.' },
        ] },
      ],
    },
    {
      id: 'mind-4', numero: '4', etichetta: 'COSA', pagina: 53,
      titolo: 'Prendere possesso della propria mente: le abilità del “cosa”',
      blocchi: [
        { titolo: 'Osservare', voci: [
          'Nota le sensazioni del corpo (occhi, orecchie, naso, pelle, lingua) e porta l’attenzione al presente di proposito.',
          'Controlla l’attenzione, non ciò che vedi: non respingere e non attaccarti a niente.',
          'Osserva senza parole: i pensieri come nuvole nel cielo, le sensazioni come onde che salgono e finiscono.',
          'Osserva fuori e dentro di te.',
        ] },
        { titolo: 'Descrivere', voci: [
          'Metti l’esperienza in parole: “la tristezza mi ha appena circondata”, “i muscoli dello stomaco si stanno tendendo”, “è arrivato il pensiero ‘non ce la faccio’”.',
          'Etichetta ciò che osservi: un pensiero è solo un pensiero, un’emozione solo un’emozione.',
          'Separa interpretazioni e opinioni dai fatti: chi, che cosa, quando, dove.',
          'Se non puoi osservarlo con i sensi, non puoi descriverlo.',
        ] },
        { titolo: 'Partecipare', voci: [
          'Entra del tutto nell’attività del momento (ballare, pulire, parlare con un’amica, provare gioia o tristezza).',
          'Diventa tutt’uno con ciò che fai, dimenticando te stessa.',
          'Agisci con l’intuito della mente saggia, come una brava ballerina in sintonia con la musica: né ostinata né con le mani in mano.',
          'Vai con la corrente e rispondi con spontaneità.',
        ] },
      ],
    },
    {
      id: 'mind-4a', numero: '4A', etichetta: 'OSSERVARE', pagina: 54,
      titolo: 'Idee per praticare l’osservazione',
      blocchi: [
        { testo: 'Osservare significa riportare la mente alle sensazioni del corpo e della mente.' },
        { titolo: 'Con gli occhi', voci: [
          'Sdraiata, guarda le nuvole.',
          'Cammina lentamente e fermati in un punto panoramico; nota fiori, alberi, natura.',
          'Siediti all’aperto e guarda chi e cosa passa, senza seguirlo con la testa o con gli occhi.',
          'Nota movimenti ed espressioni del viso di un’altra persona, senza etichettarne emozioni o pensieri.',
          'Guarda solo gli occhi, le labbra o le mani di qualcuno (o una sola caratteristica di un animale).',
          'Raccogli una foglia, un fiore o un sassolino e osservane tutti i dettagli.',
          'Trova qualcosa di bello e contemplalo per qualche minuto.',
        ] },
        { titolo: 'Con i suoni', voci: [
          'Fermati e ascolta la trama dei suoni attorno a te e i silenzi tra l’uno e l’altro.',
          'Se qualcuno parla, ascolta tono, morbidezza o asprezza, chiarezza, pause.',
          'Ascolta la musica nota per nota e lo spazio fra le note; prova a “inspirare” il suono e lasciarlo uscire con il respiro.',
        ] },
        { titolo: 'Con gli odori', voci: [
          'Inspirando, nota ogni odore attorno a te; avvicina qualcosa al naso, allontanalo e nota se l’odore persiste.',
          'Mentre mangi, cucini, fai il bagno o esci, nota aromi, spezie, sapone, profumo dell’aria; “annusa le rose”.',
        ] },
        { titolo: 'Con il gusto', voci: [
          'Quando metti qualcosa in bocca, tienilo e nota tutte le sensazioni gustative.',
          'Assapora un lecca lecca o altro, solo il gusto.',
          'Mangia un pasto, o una parte, notando il gusto di ogni boccone.',
        ] },
        { titolo: 'Gli impulsi a fare qualcosa', voci: [
          'Quando senti l’urgenza di fare qualcosa d’impulsivo, “cavalca l’impulso” come un’onda con una tavola da surf.',
          'Nota ogni impulso a evitare qualcuno o qualcosa.',
          'Scorri il corpo e chiediti dove si trova l’impulso.',
          'Mentre mastichi, nota quando compare l’impulso a inghiottire.',
        ] },
        { titolo: 'Con il tatto', voci: [
          'Accarezza il labbro superiore con un’unghia, smetti, e nota quanto ci vuole prima di non sentirlo più.',
          'Mentre cammini, senti i piedi che si appoggiano e si sollevano; a volte molto lenta, a volte rapida.',
          'Da seduta, senti cosce, ginocchia, schiena sulla sedia.',
          'Senti i piedi nelle scarpe, il corpo nei vestiti, le braccia sulla sedia, le mani.',
          'Tocca un muro, un tessuto, un tavolo, un animale, un frutto o una persona: consistenza e sensazioni sulla pelle; poi con un’altra parte del corpo.',
          'Porta l’attenzione a torace, stomaco, spalle; alle parti tese; allo spazio fra gli occhi.',
        ] },
        { titolo: 'Il respiro', voci: [
          'I movimenti dello stomaco: prima si solleva il ventre, poi il petto; espirando, di nuovo ventre e petto.',
          'Le pause: dopo che i polmoni si sono riempiti e dopo che si sono svuotati.',
          'Le sensazioni nelle narici, respirando dal naso con la bocca chiusa.',
          'Il respiro camminando piano: conta i passi di inspirazione ed espirazione; allunga l’espirazione di un passo senza forzare e vedi se l’inspirazione si allunga da sola; dopo venti respiri torna al ritmo normale.',
          'Il respiro mentre ascolti un brano, o le parole di un’amica: respira piano e uniforme, senza perderti nella musica o nel discorso.',
        ] },
        { titolo: 'I pensieri che entrano ed escono', voci: [
          'Chiediti da dove vengono i pensieri e guarda se riesci a vederlo.',
          'Nota le pause tra un pensiero e l’altro.',
          'La mente è il cielo e i pensieri sono nuvole (o foglie su un ruscello, barche su un lago, vagoni che passano).',
          'Quando le preoccupazioni girano in tondo, porta l’attenzione alle sensazioni del corpo più intense e nota quanto tempo ci mettono a scomparire.',
          'Fai un passo indietro rispetto alla mente, come se fossi in cima a una montagna e la mente fosse un masso in basso; poi torna dentro prima di finire.',
          'Fai attenzione ai primi due pensieri che arrivano.',
        ] },
        { titolo: 'Immagina che la mente sia…', voci: [
          'Un nastro trasportatore: metti ogni pensiero o sensazione in una scatola e lascialo andare.',
          'Un nastro trasportatore su cui smisti pensieri e sensazioni, etichettandoli (preoccupazione, passato, programmi, rabbia, tristezza) e mettendoli da parte per un’altra volta.',
          'Un fiume con i pensieri come barche: descrivile mentre passano, senza saltarci sopra.',
          'Dei binari con i pensieri come vagoni: etichetta ogni vagone senza salirci.',
        ] },
        { titolo: 'Espandendo la consapevolezza', voci: [
          'Nota il respiro; al respiro dopo aggiungi le mani; poi i suoni: tieni tutti e tre nella consapevolezza insieme, poi prova con altri oggetti.',
          'Mentre fai qualcosa, allarga con dolcezza la consapevolezza allo spazio intorno.',
          'Abbraccia un albero, o le lenzuola e le coperte quando ti senti sola e vuoi sentirti amata o amare.',
        ] },
        { titolo: 'Aprendo la mente ai sensi', voci: [
          'Cammina con i sensi il più possibile aperti; nota il peso che passa da un piede all’altro e la sensazione del girarti.',
          'Prima di una forchettata, guarda il cibo, annusalo, ascoltalo; poi nota gusto, consistenza, temperatura e il suono dei denti mentre mastichi lentamente.',
          'Presta attenzione a ogni sensazione che arriva (vista, odorato, tatto, udito, gusto, pensieri), quando sorge e quando svanisce, con curiosità.',
          'Sii qui adesso: “sento la sedia; la sedia sente me”.',
          'Quando sorge un’emozione, notala: “una sensazione di tristezza sta sorgendo dentro di me”. Lo stesso con un pensiero: “il pensiero ‘fa caldo qui’ sta sorgendo”.',
          'Esercita la mente del “nulla da fare”: diventa consapevole dell’esperienza presente e dello spazio attorno.',
          'Prendi un piccolo oggetto e osservalo da vicino, poi toccalo; posalo, chiudi gli occhi, respira; riaprili con mente da principiante e osservalo ancora, poi esploralo di nuovo con le mani.',
        ] },
      ],
    },
    {
      id: 'mind-4b', numero: '4B', etichetta: 'DESCRIVERE', pagina: 58,
      titolo: 'Idee per praticare la descrizione',
      blocchi: [
        { titolo: 'Descrivere ciò che vedi fuori di te', voci: [
          'Sdraiata, descrivi le figure che fanno le nuvole.',
          'Su una panchina in una strada trafficata, descrivi un aspetto di ogni persona che ti viene incontro.',
          'Trova un oggetto della natura (foglia, acqua, animale) e descrivilo con più dettagli possibile.',
          'Ripeti più accuratamente che puoi quello che una persona ti ha appena detto, e verifica che sia corretto.',
          'Descrivi il viso di una persona arrabbiata, spaventata o triste: fronte, sopracciglia, occhi, labbra, guance.',
          'Descrivi con precisione ciò che una persona sta facendo, senza intenzioni, risultati non osservati o linguaggio giudicante.',
        ] },
        { titolo: 'Descrivere pensieri e sensazioni', voci: [
          '“Una sensazione di rabbia sta sorgendo dentro di me.”',
          'Con un’emozione intensa: “sento X e i miei pensieri sono Y”.',
          'Dopo ciò che ha fatto o detto qualcuno: “quando fai X, io mi sento Y”.',
          'Con pensieri e fatti osservati: “quando fai X, mi sento Y e i miei pensieri sono Z”.',
          'Descrivi quanti più pensieri riesci mentre provi un’emozione intensa.',
        ] },
        { titolo: 'Descrivere il respiro', voci: [
          'Contare: “sto inspirando, 1; sto espirando, 1” fino a 10, poi ricomincia. Se perdi il conto, torna a 1.',
          'Tre respiri normali (“sto inspirando normalmente”), poi il quarto con inspirazione ed espirazione lunghe, descrivendoli dentro di te.',
          'Segui l’aria dall’inizio alla fine dell’inspirazione e dell’espirazione.',
        ] },
      ],
    },
    {
      id: 'mind-4c', numero: '4C', etichetta: 'PARTECIPARE', pagina: 59,
      titolo: 'Idee per praticare la partecipazione',
      blocchi: [
        { titolo: 'Con la consapevolezza della connessione con l’universo', testo: 'Porta l’attenzione ai punti in cui il corpo tocca qualcosa (pavimento, sedia, lenzuola, vestiti, muri, un albero) e pensa a che cosa quell’oggetto fa per te e alla sua gentilezza: ti sostiene, ti scalda, ti ripara. Resta sulle sensazioni finché nasce un senso di connessione o di essere accudita.' },
        { titolo: 'Entrare nell’attività', voci: [
          'Balla con la musica, canta insieme a ciò che ascolti, canta sotto la doccia, canta e balla guardando la TV.',
          'Balla o canta appena saltata giù dal letto, prima di vestirti.',
          'Vai in una chiesa dove si canta e unisciti al canto; fai karaoke con gli amici.',
          'Metti tutta te stessa in ciò che una persona sta dicendo.',
          'Vai a correre pensando solo alla corsa; fai uno sport e gettati completamente.',
          'Diventa il conto del respiro (sei “uno” quando conti 1…) o una parola ripetuta lentamente.',
          'Prendi lezioni di improvvisazione teatrale o di ballo.',
        ] },
      ],
    },
    {
      id: 'mind-5', numero: '5', etichetta: 'COME', pagina: 60,
      titolo: 'Prendere possesso della propria mente: le abilità del “come”',
      blocchi: [
        { titolo: 'Essere non giudicante', voci: [
          'Osserva senza valutare come buono o cattivo: solo i fatti.',
          'Accogli ogni momento come una coperta aperta sul prato, che prende la pioggia, il sole e ogni foglia.',
          'Riconosci la differenza tra utile e dannoso, sicuro e pericoloso, ma non giudicare.',
          'Riconosci valori, desideri e reazioni emotive senza giudicarli.',
          'Se ti scopri a giudicare, non giudicare il fatto di giudicare.',
        ] },
        { titolo: 'Stare completamente nel presente, una cosa per volta', voci: [
          'Ancorati al presente e osserva la voglia di essere altrove o di fare più cose insieme, poi torna a una cosa sola.',
          'Quando mangi, mangia; quando cammini, cammina; quando ti preoccupi, preoccupati; quando programmi, programma; quando ricordi, ricorda.',
          'Lascia andare le distrazioni e torna a ciò che stavi facendo, ancora e ancora.',
          'Se ti accorgi di fare due cose insieme, fermati e torna a una.',
        ] },
        { titolo: 'Essere efficace', voci: [
          'Sii consapevole dei tuoi obiettivi nella situazione e fai ciò che serve per raggiungerli.',
          'Concentrati su ciò che funziona, senza lasciare che la mente emotiva ti ostacoli.',
          'Gioca secondo le regole e agisci più abilmente che puoi.',
          'Fai ciò che richiede la situazione in cui ti trovi, non quella in cui vorresti essere, né la più comoda o la più giusta.',
          'Lascia andare l’ostinazione e non restare con le mani in mano.',
        ] },
      ],
    },
    {
      id: 'mind-5a', numero: '5A', etichetta: 'NON GIUDICARE', pagina: 61,
      titolo: 'Idee per praticare l’astensione dal giudizio',
      blocchi: [
        { titolo: 'Lasciare andare confronti, giudizi e pregiudizi', voci: [
          'Osserva i pensieri e le frasi giudicanti: “nella mia mente è sorto un pensiero giudicante”.',
          'Contali (spostando oggetti da una tasca all’altra, con un contatore o su un foglio).',
          'Sostituisci il giudizio con i fatti: descrivi ciò che hai osservato con i sensi, le conseguenze, e le tue emozioni in risposta (le emozioni non sono giudizi).',
          'Osserva e cambia espressioni del viso, posture e tono di voce giudicanti, anche nella tua mente.',
          'Racconta a qualcuno in modo non giudicante com’è andata la giornata, restando sul concreto.',
          'Scrivi una descrizione non giudicante di un evento che ti ha suscitato un’emozione, o di un episodio importante della giornata, includendo ambiente, pensieri, sensazioni e azioni ma non il “perché”.',
          'Pensa a qualcuno con cui sei arrabbiata e prova a vedere la vita dal suo punto di vista: sensazioni, pensieri, paure, speranze, storia.',
          'Quando giudichi, pratica il mezzo sorriso e/o le mani aperte (Tolleranza della sofferenza, scheda 14).',
        ] },
      ],
    },
    {
      id: 'mind-5b', numero: '5B', etichetta: 'PRESENTE', pagina: 62,
      titolo: 'Idee per praticare lo stare completamente nel presente facendo una cosa per volta',
      blocchi: [
        { testo: 'Adattate da Thich Nhat Hanh, Il miracolo della presenza mentale.' },
        { numerati: true, voci: [
          { t: 'Preparare tè o caffè.', d: 'Ogni movimento lento e consapevole: le mani che sollevano il recipiente, il liquido caldo nella tazza. Respira piano e profondamente; se la mente si smarrisce, torna al respiro.' },
          { t: 'Lavare i piatti.', d: 'Come se ogni recipiente fosse da contemplare, senza fretta di finire. Considera il lavaggio dei piatti la cosa più importante della vita.' },
          { t: 'Lavare a mano i vestiti.', d: 'Pochi capi per volta, nella posizione migliore per la schiena. Attenzione a ogni movimento e al sapone e all’acqua; sorriso lieve e respiro quando la mente vaga.' },
          { t: 'Pulire casa.', d: 'Dividi il lavoro in fasi, con tanto tempo per ciascuna e muovendoti tre volte più lentamente del solito. Per esempio, riponendo un libro: guardalo, sappi quale è, sappi dove lo metti.' },
          { t: 'Fare un bagno rilassante.', d: '30–40 minuti, senza fretta, ogni movimento leggero e lento, attenzione a ogni parte del corpo. Immagina una vasca di fiori di loto.' },
          { t: 'Meditare.', d: 'Seduta con la schiena dritta; a ogni respiro dì dolcemente “uno”. Quando la mente si smarrisce, torna a “uno”. Se vuoi muoverti o fermarti, osserva solo il desiderio.' },
        ] },
      ],
    },
    {
      id: 'mind-5c', numero: '5C', etichetta: 'EFFICACIA', pagina: 63,
      titolo: 'Idee per praticare l’efficacia',
      blocchi: [
        { voci: [
          'Quando inizi a essere arrabbiata o ostile con qualcuno, chiediti: “questo è efficace?”.',
          'Quando vuoi essere “nel giusto” invece che efficace, rinuncia ad avere ragione e prova a essere efficace.',
          'Osserva l’ostinazione in te e chiediti: “questo è efficace?”.',
          'Lascia andare l’ostinazione, pratica l’efficacia e osserva la differenza.',
          'Quando senti rabbia, ostilità o stai per fare qualcosa di inefficace, pratica le mani aperte.',
        ] },
      ],
    },
    {
      id: 'mind-8', numero: '8', sezione: 'Altre abilità di mindfulness', etichetta: 'GENTILEZZA', pagina: 70,
      titolo: 'Praticare l’amorevole gentilezza per aumentare l’affetto e la compassione',
      blocchi: [
        { titolo: 'Che cos’è', testo: 'Una pratica di mindfulness per far crescere amore e compassione, prima per noi stessi e poi per i cari, gli amici, le persone con cui siamo arrabbiati, chi è in difficoltà, i nemici e tutti gli esseri viventi. Ci protegge dal giudizio, dalla malevolenza e dall’ostilità verso noi e gli altri.' },
        { titolo: 'Come si pratica', testo: 'È come recitare una preghiera per sé o per qualcuno: si inviano amore e desideri gentili con parole e frasi dette nella mente.' },
        { titolo: 'Istruzioni', numerati: true, voci: [
          'Scegli una persona a cui rivolgere la gentilezza. Parti da te o, se è troppo difficile, da qualcuno che ami già; non da chi non vorresti trattare con compassione.',
          'Seduta, in piedi o sdraiata, respira piano e profondamente. Apri i palmi e poni la persona al centro della mente.',
          'Recita frasi affettuose, lentamente, concentrandoti sul significato di ogni parola: “che io possa essere felice”, “in pace”, “in salute”, “al sicuro”. Se arrivano pensieri distraenti, notali e riporta la mente al compito. Continua finché ti senti immersa nella gentilezza.',
          'Allarga gradualmente a cari, amici, persone con cui sei arrabbiata, persone difficili, nemici e infine a tutti gli esseri viventi (“che Giovanni possa essere felice…”).',
          'Pratica ogni giorno, partendo da te e poi allargando agli altri.',
        ] },
      ],
    },
    {
      id: 'mind-9', numero: '9', etichetta: 'MEZZI EFFICACI', pagina: 71,
      titolo: 'Mezzi efficaci: bilanciare mente del fare e mente dell’essere',
      blocchi: [
        { numerati: true, voci: [
          { t: 'Mente del fare.', d: 'Discriminante, ambiziosa, orientata agli obiettivi. I pensieri sembrano fatti del mondo; ci si concentra su problem solving e risultati.' },
          { t: 'Mente saggia.', d: 'L’equilibrio tra fare ed essere, il sentiero di mezzo. Usa mezzi efficaci: lascia andare il dover raggiungere gli obiettivi a tutti i costi mentre ti impegni a pieno per raggiungerli, e aumenta la consapevolezza mentre sei impegnata.' },
          { t: 'Mente dell’essere.', d: 'Curiosa, del “nulla da fare”, orientata al presente. I pensieri sono sensazioni della mente; conta l’unicità di ogni istante, senza fissarsi sugli obiettivi.' },
        ] },
        { testo: 'I termini “mente del fare”, “dell’essere” e “del nulla-da-fare” vengono da Jon Kabat-Zinn.' },
      ],
    },
    {
      id: 'mind-9a', numero: '9A', etichetta: 'PRATICA', pagina: 72,
      titolo: 'Idee per esercitarsi a bilanciare mente del fare e mente dell’essere',
      blocchi: [
        { testo: 'Aiutano a unire le mansioni di ogni giorno alla mente dell’essere.' },
        { numerati: true, voci: [
          { t: 'Letture da mente saggia.', d: 'Citazioni che ti spingono a praticare, messe in punti strategici (per esempio vicino alla caffettiera) e lette nelle pause.' },
          { t: 'Promemoria da mente saggia.', d: 'Una sveglia, anche sul telefono, a ore fisse o casuali per ricordarti di fare le cose con consapevolezza; oppure frasi sulla mindfulness appese dove le vedi.' },
          { t: 'Mente saggia nella routine.', d: 'Scegli un’attività quotidiana (lavare i denti, vestirti, preparare il caffè) e falla momento per momento.' },
          { t: 'Solo per questo momento.', d: 'Quando ti senti sopraffatta: “solo per questo attimo, solo per ciò che sto facendo ora”. Un piatto, un passo, un gruppo di muscoli per volta.' },
          { t: 'Consapevolezza degli eventi.', d: 'Nota gli eventi piacevoli e spiacevoli anche minimi: il calore dell’acqua sulle mani, il gusto del cibo, il vento sul viso, la stanchezza nel corpo.' },
          { t: 'Consapevolezza di ciò che va fatto.', d: 'Quando ti rilassi o fai una pausa, sii consapevole di ciò che serve e concentrati a farlo.' },
          { t: 'Disponibilità.', d: 'Allena la disponibilità a fare ciò che serve quando serve, bilanciando essere e fare.' },
          { t: 'Tre minuti di mente saggia.', d: 'Primo: nota la tua esperienza (pensieri, immagini, emozioni, sensazioni) come eventi mentali. Secondo: tutta l’attenzione al respiro, uno per volta, come àncora. Terzo: allarga la consapevolezza a tutto il corpo (postura, volto, mani) e torna alle attività.' },
        ] },
      ],
    },
    {
      id: 'mind-10', numero: '10', etichetta: 'SENTIERO', pagina: 74,
      titolo: 'Percorrere il sentiero di mezzo: trovare la sintesi tra gli opposti',
      blocchi: [
        { testo: 'Per ogni coppia, la mente saggia dice “sia… sia…”:', voci: [
          { t: 'Mente razionale e mente emotiva:', d: 'sia controllare il comportamento e decidere con la ragione, sia considerare i valori e vivere le emozioni, anche forti, nel loro andare e venire.' },
          { t: 'Mente del fare e mente del nulla-da-fare:', d: 'sia desiderare fortemente qualcosa di diverso da ciò che c’è ora (vivo desiderio di cambiare), sia essere disposta ad accettare radicalmente ciò che c’è nel momento presente.' },
          { t: 'Abnegazione e indulgenza verso di sé:', d: 'sia vivere con sobrietà, sia soddisfare i sensi.' },
        ] },
        { testo: 'C’è spazio per aggiungere i tuoi opposti da bilanciare.' },
      ],
    },
  ],
};
