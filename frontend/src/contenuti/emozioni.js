// Le sette emozioni della Guida, ognuna con cosa la scatena, come si sente, cosa porta a fare e la sua azione opposta.
// Gli id (epau, erab...) sono quelli di Marea: servono a ritrovare i post-it "emo:<id>" già scritti.

export const EMOZIONI = [
  {
    id: "epau",
    nome: "Paura",
    miniatura: "emo-paura",
    sottotitolo: "Quando la minaccia è reale e concreta",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Quando c'è una minaccia reale alla tua vita, salute o benessere." },
      { titolo: "Scatenanti tipici", testo: "Situazioni nuove, stare sola, flashback, dover fare cose in pubblico, perseguire i propri sogni." },
      { titolo: "Interpretazioni tipiche", testo: "\"Potrei essere ferita.\" \"Non avrò aiuto.\" \"Fallirò.\" \"Perderò qualcuno.\"" },
      { titolo: "Sensazioni fisiche", testo: "Tachicardia, mancanza di respiro, nodo in gola, tensione muscolare, sudore freddo, nausea." },
      { titolo: "Azioni tipiche", testo: "Fuggire, evitare, immobilizzarsi, chiedere aiuto in modo caotico." },
      { titolo: "Azione opposta", testo: "Avvicinati a ciò che temi, fallo ancora e ancora. Tieni gli occhi aperti. Postura assertiva — testa alta, spalle indietro. Respira lentamente.", evidenza: true },
    ],
  },
  {
    id: "erab",
    nome: "Rabbia",
    miniatura: "emo-rabbia",
    sottotitolo: "Quando un obiettivo importante è bloccato",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Un obiettivo viene bloccato, qualcuno ti attacca o minaccia, viene offesa la tua integrità." },
      { titolo: "Scatenanti tipici", testo: "Impossibilità di raggiungere un obiettivo, attacchi, perdita di rispetto, dolore fisico o emotivo." },
      { titolo: "Interpretazioni tipiche", testo: "\"Sono stata trattata ingiustamente.\" \"Non avrebbe dovuto.\" \"Ho ragione io.\"" },
      { titolo: "Sensazioni fisiche", testo: "Tensione muscolare, denti serrati, pugni stretti, faccia che avvampa, senso di esplosione." },
      { titolo: "Azioni tipiche", testo: "Attacchi verbali, alzare la voce, sarcasmo, sbattere le porte, covare rancore." },
      { titolo: "Azione opposta", testo: "Evita con grazia invece di attaccare. Sii gentile. Immaginati comprensiva. Apri le mani, palmi verso l'alto. Abbozza un sorriso.", evidenza: true },
    ],
  },
  {
    id: "etri",
    nome: "Tristezza",
    miniatura: "emo-tristezza",
    sottotitolo: "Quando c'è una perdita",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Hai perso qualcosa o qualcuno. Le cose non sono andate come speravi." },
      { titolo: "Scatenanti tipici", testo: "Perdita, morte, rifiuto, separazione, delusione, isolamento." },
      { titolo: "Interpretazioni tipiche", testo: "\"Non otterrò mai ciò che voglio.\" \"Sono inutile.\" \"La situazione non cambierà mai.\"" },
      { titolo: "Sensazioni fisiche", testo: "Stanchezza, letargia, vuoto nel petto, difficoltà a deglutire, mancanza di energie." },
      { titolo: "Azioni tipiche", testo: "Ritirarsi, evitare, stare a letto, parlare poco, darsi per vinti." },
      { titolo: "Azione opposta", testo: "Attivati invece di isolarti. Evita di evitare. Fai cose che ti diano senso di competenza. Testa alta, postura aperta. Aumenta l'attività fisica.", evidenza: true },
    ],
  },
  {
    id: "ecol",
    nome: "Colpa",
    miniatura: "emo-colpa",
    sottotitolo: "Quando ho agito contro un mio valore",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Quando il tuo comportamento viola davvero i tuoi valori o il tuo codice morale." },
      { titolo: "Scatenanti tipici", testo: "Fare o pensare qualcosa che ritieni sbagliato. Non mantenere una promessa. Causare un danno a qualcuno." },
      { titolo: "Interpretazioni tipiche", testo: "\"Avrei dovuto comportarmi diversamente.\" \"Mi sono comportata male.\" \"Devo essere incolpata.\"" },
      { titolo: "Sensazioni fisiche", testo: "Faccia rossa e calda, tensione, nervosismo, senso di soffocamento." },
      { titolo: "Azioni tipiche", testo: "Chiedere perdono, scusarsi, fare regali per rimediare, piegarsi su se stessi." },
      { titolo: "Azione opposta", testo: "Se la colpa è giustificata: scusati, rimedia al danno, impegnati a non ripetere, perdonati. Se non è giustificata: non scusarti, raccogli le informazioni, postura dignitosa, valida il tuo comportamento.", evidenza: true },
    ],
  },
  {
    id: "egel",
    nome: "Gelosia",
    miniatura: "emo-gelosia",
    sottotitolo: "Quando rischio di perdere una relazione",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Una relazione importante è minacciata o in pericolo. Qualcuno minaccia di portarti via qualcosa di prezioso." },
      { titolo: "Scatenanti tipici", testo: "Partner che dà attenzione ad altri, possibile rivale, sentirsi ignorati, scoprire tradimenti." },
      { titolo: "Interpretazioni tipiche", testo: "\"Il mio partner non tiene più a me.\" \"Non sono all'altezza.\" \"Mi lascerà.\" \"Sono stata imbrogliata.\"" },
      { titolo: "Sensazioni fisiche", testo: "Tachicardia, nodo in gola, muscoli tesi, sospettosità, bisogno di controllo, sentirsi feriti." },
      { titolo: "Azioni tipiche", testo: "Interrogatori, controllare il telefono, accuse, comportamenti appiccicosi, gelosia, inseguimenti." },
      { titolo: "Azione opposta", testo: "Smetti di spiare e controllare. Condividi invece di trattenere. Ascolta senza fare domande indagatorie. Tieni gli occhi aperti sui fatti reali. Postura aperta, mani rilassate.", evidenza: true },
    ],
  },
  {
    id: "einv",
    nome: "Invidia",
    miniatura: "emo-invidia",
    sottotitolo: "Quando altri hanno ciò che mi manca",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Una persona o un gruppo ha qualcosa che vuoi o di cui hai bisogno." },
      { titolo: "Scatenanti tipici", testo: "Qualcuno ottiene ciò che volevi tu. Non fare parte del gruppo giusto. Qualcuno si vanta di qualcosa." },
      { titolo: "Interpretazioni tipiche", testo: "\"Non è giusto.\" \"Dovrei avere anch'io quello.\" \"Sono inferiore.\" \"Sono stata sfortunata.\"" },
      { titolo: "Sensazioni fisiche", testo: "Muscoli tesi, denti stretti, dolore allo stomaco, voglia che l'altro perda ciò che ha." },
      { titolo: "Azioni tipiche", testo: "Sminuire l'altro, comportarsi in modo passivo-aggressivo, confrontarsi ossessivamente." },
      { titolo: "Azione opposta", testo: "Impedisciti di distruggere ciò che ha l'altra persona. Pensa alle tue fortune — fai una lista. Smetti di esagerare il valore di ciò che non hai. Postura aperta, mani rilassate, respiro lento.", evidenza: true },
    ],
  },
  {
    id: "ever",
    nome: "Vergogna",
    miniatura: "emo-vergogna",
    sottotitolo: "Quando l'esclusione è un rischio vero",
    sezioni: [
      { titolo: "Quando corrisponde ai fatti", testo: "Potresti essere rifiutata da persone cui tieni se certe caratteristiche si venissero a sapere." },
      { titolo: "Scatenanti tipici", testo: "Essere rifiutata, criticata in pubblico, fallire dove ci si sente competenti, confrontarsi con uno standard." },
      { titolo: "Interpretazioni tipiche", testo: "\"Sono difettosa.\" \"Non sono abbastanza.\" \"Gli altri mi rifiuteranno.\"" },
      { titolo: "Sensazioni fisiche", testo: "Dolore allo stomaco, senso di terrore, impulso a nascondersi o scomparire." },
      { titolo: "Azioni tipiche", testo: "Nascondersi, abbassare lo sguardo, postura curva, scusarsi ripetutamente." },
      { titolo: "Azione opposta", testo: "Esponi ciò di cui ti vergogni con persone di fiducia. Partecipa invece di isolarti. Testa alta, contatto visivo, postura diritta.", evidenza: true },
    ],
  },
];

export const trovaEmozione = (id) => EMOZIONI.find((e) => e.id === id) ?? null;
