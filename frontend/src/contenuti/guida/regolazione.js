// Regolazione emotiva: stesso ordine, numeri e pagine del manuale; testi riassunti con parole nostre.
// Nel manuale la scheda 6 (modi per descrivere le emozioni) occupa dieci pagine: qui è riassunta emozione per emozione.

import { EVENTI_PIACEVOLI } from './eventiPiacevoli.js';

const emozione = (titolo, parole, { eventi, pensieri, corpo, azioni, conseguenze }) => ({
  titolo,
  testo: `Parole vicine: ${parole}.`,
  voci: [
    { t: 'Cosa la fa partire:', d: eventi },
    { t: 'Cosa pensi:', d: pensieri },
    { t: 'Nel corpo:', d: corpo },
    { t: 'Cosa fai o mostri:', d: azioni },
    { t: 'Dopo:', d: conseguenze },
  ],
});

export const REGOLAZIONE = {
  id: 'reg',
  titolo: 'Regolazione emotiva',
  sottotitolo: 'Capire le emozioni e ridurre la vulnerabilità',
  icona: 'modulo-regolazione',
  quando: 'Quando le emozioni sono difficili da capire o da gestire, o per costruire una vita meno esposta alla mente emotiva.',
  schede: [
    {
      id: 'reg-1', numero: '1', sezione: 'Comprendere e denominare le emozioni', etichetta: 'OBIETTIVI', pagina: 205,
      titolo: 'Obiettivi della regolazione emotiva',
      blocchi: [
        { titolo: 'Comprendere e dominare le emozioni', voci: [
          'Riconoscere (osservare e descrivere) le tue emozioni.',
          'Sapere a cosa ti servono.',
        ] },
        { titolo: 'Ridurre la frequenza delle emozioni indesiderate', voci: [
          'Fermarle prima che comincino.',
          'Cambiarle quando sono già partite.',
        ] },
        { titolo: 'Ridurre la vulnerabilità emotiva', voci: [
          'Essere meno esposta alla mente emotiva.',
          'Aumentare la resilienza, cioè la capacità di affrontare le cose difficili, e le emozioni positive.',
        ] },
        { titolo: 'Ridurre la sofferenza emotiva', voci: [
          'Alleviare il dolore quando le emozioni ti sopraffanno.',
          'Gestire le emozioni estreme senza peggiorare le cose.',
        ] },
      ],
    },
    {
      id: 'reg-2', numero: '2', etichetta: 'PANORAMICA', pagina: 209,
      titolo: 'Panoramica: comprendere e denominare le emozioni',
      blocchi: [
        { voci: [
          { t: 'Cosa fanno le emozioni per te:', d: 'ci sono motivi per cui le proviamo, e ne abbiamo bisogno.' },
          { t: 'Cosa rende difficile regolarle:', d: 'poche abilità, conseguenze che rinforzano, umore basso, rimuginazione, miti sulle emozioni e fattori biologici.' },
          { t: 'Un modello per descriverle:', d: 'le emozioni sono risposte complesse; cambiare una parte del sistema può cambiare tutta la risposta.' },
          { t: 'Modi per descriverle:', d: 'osservare, descrivere e dare un nome all’emozione aiuta a regolarla.' },
        ] },
      ],
    },
    {
      id: 'reg-3', numero: '3', etichetta: 'FUNZIONI', pagina: 210,
      titolo: 'Cosa fanno le emozioni per te',
      blocchi: [
        { titolo: 'Ti motivano e ti preparano all’azione', voci: [
          'Ogni emozione porta un impulso specifico, spesso legato alla biologia.',
          'Abbreviano i tempi di reazione quando non c’è modo di ragionare con calma.',
          'Quelle forti aiutano a superare gli ostacoli, nella mente e fuori.',
        ] },
        { titolo: 'Comunicano agli altri e li influenzano', voci: [
          'Le espressioni del viso comunicano più in fretta delle parole; anche il corpo e il tono di voce parlano.',
          'Che tu voglia o no, le emozioni arrivano agli altri e li influenzano.',
          'Quando è importante far arrivare un messaggio, può essere molto difficile cambiare l’emozione.',
        ] },
        { titolo: 'Comunicano a te stessa', voci: [
          'Danno informazioni su una situazione: sono segnali o allarmi.',
          'Le sensazioni “di pancia” funzionano come intuito e possono spingerti a controllare i fatti.',
          { t: 'Attenzione:', d: 'a volte trattiamo le emozioni come fatti (“se ho paura, c’è un pericolo”; “lo amo, quindi è una brava persona”). Più l’emozione è forte, più sembra vera.' },
          'Se le emozioni diventano la giustificazione di pensieri e azioni, rischi di ignorare i fatti.',
        ] },
      ],
    },
    {
      id: 'reg-4', numero: '4', etichetta: 'OSTACOLI', pagina: 211,
      titolo: 'Cosa rende difficile regolare le tue emozioni',
      blocchi: [
        { voci: [
          { t: 'Biologia.', d: 'Alcuni fattori biologici rendono la regolazione più faticosa.' },
          { t: 'Mancanza di abilità.', d: 'Non sai cosa fare per regolare le emozioni.' },
          { t: 'Rinforzo del comportamento emotivo.', d: 'Il tuo ambiente ti rinforza quando reagisci in modo molto emotivo.' },
          { t: 'Umore basso.', d: 'L’umore del momento decide al posto della mente saggia; non ti va di spendere tempo ed energie per regolarti.' },
          { t: 'Sovraccarico emotivo.', d: 'Un’attivazione forte porta al punto di rottura delle abilità: non riesci più a seguirne le istruzioni.' },
          { t: 'Miti sulle emozioni.', d: 'Credere che le emozioni siano cattive o segno di debolezza porta a evitarle; credere che quelle estreme siano necessarie o parte di te ti impedisce di provare a regolarle.' },
        ] },
      ],
    },
    {
      id: 'reg-4a', numero: '4A', etichetta: 'MITI', pagina: 212,
      titolo: 'Miti e convinzioni comuni sulle emozioni',
      blocchi: [
        { testo: 'Nel manuale accanto a ogni mito c’è lo spazio per confutarlo. Eccoli, uno per uno: prova a rispondere a ciascuno con i fatti.' },
        { numerati: true, voci: [
          'C’è un modo giusto di sentirsi per ogni situazione.',
          'Far sapere agli altri che sto male è segno di debolezza.',
          'Le emozioni negative sono cattive e distruttive.',
          'Essere emotivi vuol dire essere fuori controllo.',
          'Alcune emozioni sono stupide.',
          'Tutte le emozioni dolorose sono il risultato di un cattivo comportamento.',
          'Se gli altri non approvano i miei sentimenti, non dovrei sentirmi così.',
          'Gli altri sono i migliori giudici di come mi sento.',
          'Le emozioni dolorose non sono importanti e vanno ignorate.',
          'Le emozioni estreme portano più lontano del regolarle.',
          'La creatività ha bisogno di emozioni intense, spesso fuori controllo.',
          'Drammatizzare è bello.',
          'È da persone false cercare di cambiare le proprie emozioni.',
          'Come mi sento dice ciò che è vero, i fatti non importano.',
          'Le persone dovrebbero fare tutto quello che si sentono di fare.',
          'Agire seguendo le emozioni vuol dire essere davvero libere.',
          'Io sono le mie emozioni.',
          'Le mie emozioni sono il motivo per cui le persone mi amano.',
          'Le emozioni capitano senza ragione.',
          'Bisognerebbe sempre fidarsi delle proprie emozioni.',
        ] },
      ],
    },
    {
      id: 'reg-5', numero: '5', etichetta: 'MODELLO', pagina: 213,
      titolo: 'Modello per descrivere le emozioni',
      blocchi: [
        { testo: 'Un’emozione è una catena di pezzi. Cambiare un pezzo può cambiare tutta la risposta. Il percorso, in ordine:' },
        { numerati: true, voci: [
          { t: 'Fattori di vulnerabilità preesistenti.', d: 'Ciò che ti rende più sensibile prima ancora che succeda qualcosa (sonno, malattia, stress…).' },
          { t: 'Evento scatenante.', d: 'Quello che succede, fuori o dentro di te; ci arrivi con un certo grado di attenzione e consapevolezza.' },
          { t: 'Interpretazione.', d: 'Pensieri e convinzioni sull’evento.' },
          { t: 'Cambiamenti biologici.', d: 'Attivazione del cervello e del sistema nervoso: cuore, vasi, muscoli, temperatura.' },
          { t: 'Esperienza soggettiva.', d: 'Sensazioni del corpo (i “sentimenti”) e impulsi ad agire.' },
          { t: 'Espressioni.', d: 'Linguaggio del viso e del corpo (espressioni, postura, gesti, colore del volto) e parole.' },
          { t: 'Azioni.', d: 'Quello che fai.' },
          { t: 'Nome dell’emozione.', d: 'Darle un nome ti rende consapevole di cosa provi.' },
          { t: 'Emozioni secondarie e conseguenze.', d: 'Quello che ne segue, dentro e fuori di te.' },
        ] },
      ],
    },
    {
      id: 'reg-6', numero: '6', etichetta: 'EMOZIONI', pagina: 214,
      titolo: 'Modi per descrivere le emozioni',
      blocchi: [
        { testo: 'Per ogni emozione il manuale elenca parole vicine, eventi che la fanno partire, interpretazioni, cambiamenti del corpo, espressioni e azioni, conseguenze. Qui sotto il riassunto: usalo per riconoscere cosa stai provando.' },
        emozione('Rabbia', 'collera, furia, irritazione, frustrazione, fastidio, risentimento, ostilità', {
          eventi: 'un obiettivo importante bloccato; un attacco o una minaccia a te o a chi ami; perdere potere, status o rispetto; cose che vanno diversamente dal previsto; dolore fisico o emotivo.',
          pensieri: 'essere stata trattata ingiustamente; incolpare; “le cose dovrebbero essere diverse”; “ho ragione io”; rimuginare sull’evento.',
          corpo: 'muscoli tesi, denti e pugni serrati, viso caldo, sensazione di esplodere, voglia di colpire o ferire, lacrime che non si fermano.',
          azioni: 'attacchi fisici o verbali, gesti minacciosi, lanciare o rompere cose, sbattere le porte, andarsene, tono alto o sarcastico, imprecare, criticare, covare rancore, piangere.',
          conseguenze: 'l’attenzione si restringe alla situazione che ti ha fatto arrabbiare; rimugini sul passato e immagini altre occasioni di rabbia; possibile distacco da te o ottundimento.',
        }),
        emozione('Disgusto', 'avversione, disprezzo, repulsione, nausea, sdegno, ripugnanza, risentimento', {
          eventi: 'vedere o annusare cose sporche o repellenti, un cadavere, sangue; toccare oggetti di sconosciuti o di persone sgradevoli; assistere a umiliazioni, ipocrisia, tradimenti, abusi, razzismo o crudeltà; qualcosa che viola i valori della tua mente saggia; un rapporto sessuale non voluto.',
          pensieri: 'ingoiare qualcosa di velenoso; pelle o mente contaminate; il proprio corpo o quello di un altro è orribile; gli altri sono “feccia”; sentirsi moralmente superiori; forte disapprovazione di sé.',
          corpo: 'nausea, impulso a vomitare, nodo alla gola, avversione a mangiare o bere, bisogno di lavarsi, di scappare o tenere lontano, sentirsi sporchi o contaminati.',
          azioni: 'vomitare o sputare, guardare altrove, lavarsi e pulire, evitare di mangiare, allontanare o escludere qualcuno, trattarlo con sdegno, tono sarcastico, naso arricciato.',
          conseguenze: 'l’attenzione si restringe a ciò che ti disgusta; diventi ipersensibile allo sporco.',
        }),
        emozione('Invidia', 'brama, avidità, rancore, scontento, insoddisfazione, “verde d’invidia”', {
          eventi: 'qualcuno ha ciò che vuoi o di cui hai bisogno; non fai parte del gruppo “giusto”; sei sola mentre altri si divertono; altri ottengono riconoscimenti o successi che volevi tu.',
          pensieri: 'meriterei ciò che hanno gli altri; gli altri hanno più di me; la vita è stata ingiusta o sfortunata con me; mi confronto e mi sento inferiore, un fallimento, poco apprezzata.',
          corpo: 'muscoli e mascella tesi, viso caldo, dolore allo stomaco, voglia di vendicarsi o di far perdere all’altro ciò che ha; piacere se l’altro fallisce; a volte la spinta a migliorarsi.',
          azioni: 'fare di tutto per ottenere ciò che ha l’altro, lavorare più duramente, cercare di migliorarsi; ma anche rovinare o portare via ciò che ha, criticarlo o parlarne male, mettersi in mostra, evitare chi ha ciò che vorresti.',
          conseguenze: 'guardi solo ciò che gli altri hanno e tu no; non apprezzi ciò che hai; rimugini; a volte decidi di cambiare.',
        }),
        emozione('Paura', 'ansia, timore, panico, terrore, apprensione, preoccupazione, nervosismo', {
          eventi: 'minaccia a vita, salute o benessere; ritrovarsi in situazioni simili a quelle in cui sei stata ferita o spaventata; flashback; situazioni nuove, solitudine, buio, folla, silenzio; lasciare casa; esibirsi in pubblico; inseguire i propri sogni.',
          pensieri: 'potrei morire, farmi male, perdere qualcosa o qualcuno di importante o l’aiuto che ho; potrei fallire o essere rifiutata o criticata; sono senza aiuto, sto perdendo il controllo o la competenza.',
          corpo: 'fiato corto, cuore che corre, nodo in gola, muscoli tesi, denti serrati, farfalle nello stomaco, nausea, freddo o sudore, voglia di scappare o gridare.',
          azioni: 'fuggire, nascondersi o evitare, immobilizzarsi, parlare in modo nervoso o restare senza parole, urlare, piangere, tremare, voce esitante, sudare.',
          conseguenze: 'attenzione ridotta ma vigilanza alta sulla minaccia; confusione e perdita di controllo; immagini altre perdite o fallimenti; isolamento; rimuginazione su altre minacce.',
        }),
        emozione('Felicità', 'gioia, allegria, entusiasmo, contentezza, appagamento, sollievo, speranza, orgoglio', {
          eventi: 'una bella sorpresa; la realtà supera le attese; ottenere ciò che vuoi o per cui hai lavorato; avere successo; ricevere stima, amore, affetto; sentirsi accettata e parte di un gruppo; sensazioni piacevoli.',
          pensieri: 'gli eventi gioiosi vengono letti esattamente per quello che sono, senza aggiungere né togliere nulla.',
          corpo: 'eccitazione, energia, voglia di ridere, viso caldo, pace e calma, apertura.',
          azioni: 'sorridere, viso raggiante, essere vivace, condividere le belle sensazioni, abbracciare, saltellare, dire cose piacevoli, voce entusiasta, parlare molto.',
          conseguenze: 'sei cortese e gentile con gli altri; hai una prospettiva positiva; sopporti meglio preoccupazioni e noia; ricordi altri momenti felici e ti aspetti di esserlo ancora.',
        }),
        emozione('Gelosia', 'possessività, diffidenza, sospetto, rivalità, paura di perdere qualcosa o qualcuno', {
          eventi: 'una relazione importante è minacciata; un possibile rivale si avvicina a chi ami; qualcuno minaccia di portarti via qualcosa di importante, ti ignora o è più attraente e sicuro di sé; il partner vuole più tempo da solo, corteggia o guarda un altro, o scopri una relazione parallela.',
          pensieri: 'il partner non tiene più a me, sta per lasciarmi o si comporta in modo scorretto; non sono all’altezza; sono stata ingannata; nessuno tiene a me; il rivale è competitivo, insicuro o invidioso.',
          corpo: 'fiato corto, cuore forte, nodo in gola, muscoli tesi, sospetto, sentirsi ferita nell’orgoglio o rifiutata, bisogno di controllo, voglia di stringere ciò che hai o di allontanare il rivale.',
          azioni: 'minacce o violenza, interrogatori e richieste di rendere conto, raccogliere prove, aggrapparsi, controllare la libertà dell’altro, accuse di infedeltà, inseguimenti, dimostrazioni d’amore eccessive.',
          conseguenze: 'perdi attenzione, vedi il peggio negli altri, diffidi di tutti, resti in allerta su ogni minaccia alla relazione, ti isoli.',
        }),
        emozione('Amore', 'affetto, attrazione, tenerezza, desiderio di vicinanza', {
          eventi: 'una persona ti dà o fa ciò che vuoi, ti serve o ammiri; attrazione fisica; stare con chi ti diverte; tempo condiviso, esperienze speciali, ottima comunicazione.',
          pensieri: 'credere che l’altra persona ti ami, ti apprezzi o abbia bisogno di te; trovarla attraente, la sua personalità fantastica; poter contare su di lei.',
          corpo: 'energia ed eccitazione, cuore veloce, sicurezza, calore, calma; voglia del meglio per l’altro, di dargli cose, di vederlo, di vicinanza fisica ed emotiva, di passare la vita insieme.',
          azioni: 'dire “ti amo”, esprimere sentimenti positivi, guardarsi negli occhi, condividere tempo, fare ciò che serve all’altro, toccarsi e abbracciarsi, sorridere.',
          conseguenze: 'vedi solo i lati positivi, sei distratta e sogni a occhi aperti, ti senti aperta, viva e capace; ricordi altre persone che hai amato o che ti hanno amata e altri eventi positivi; credi di più in te.',
        }),
        emozione('Tristezza', 'dolore, malinconia, sconforto, solitudine, dispiacere, disperazione, delusione', {
          eventi: 'una perdita irrimediabile o la morte di una persona cara; le cose vanno peggio di come ti aspettavi; separazione; non ottenere ciò che vuoi o ritieni necessario; essere rifiutata o esclusa; sentirsi impotente; stare con chi soffre; solitudine.',
          pensieri: 'la separazione durerà per sempre; non otterrò mai ciò che mi serve; la mia vita è senza speranza; sono inutile o senza valore.',
          corpo: 'stanchezza, senza energie, voglia di stare a letto, niente dà più piacere, dolore o vuoto nel petto o nella pancia, paura di non riuscire a smettere di piangere, difficoltà a deglutire, capogiro.',
          azioni: 'evitare le cose, restare inattiva, ritirarsi dalle persone e dalle attività che ti piacevano, arrendersi, parlare poco o con voce bassa e piatta, postura abbattuta, piangere.',
          conseguenze: 'non ricordi le cose felici; sei irritabile; cerchi ciò che hai perso; prospettiva negativa; ti incolpi; rimugini; insonnia e appetito disturbato.',
        }),
        emozione('Vergogna', 'imbarazzo, umiliazione, mortificazione, timidezza, disagio', {
          eventi: 'essere rifiutata da chi ami; altri scoprono qualcosa che ritieni sbagliato; fare o pensare ciò che i tuoi cari ritengono immorale; non rispettare uno standard; essere derisa o criticata in pubblico; rivelare un aspetto molto privato; mostrare una caratteristica fisica che non ami; fallire dove ti senti (o dovresti essere) competente; emozioni invalidate.',
          pensieri: 'gli altri mi rifiuteranno; sono inferiore, non abbastanza, non amabile, difettosa, una brutta persona o un fallimento; il mio corpo è troppo grande, piccolo o brutto; non ho rispettato le aspettative; ciò che penso e sento è ridicolo.',
          corpo: 'dolore alla bocca dello stomaco, senso di terrore, voglia di sparire o di nascondere faccia e corpo.',
          azioni: 'nascondere comportamenti o caratteristiche, evitare chi hai ferito o chi ti ha criticato, evitare anche te stessa, coprirti il viso, abbassare lo sguardo e la testa, scusarti ancora e ancora, voce esitante e bassa.',
          conseguenze: 'eviti di pensare a ciò che hai fatto, blocchi le emozioni, ti distrai con comportamenti impulsivi; focalizzazione su di te; distacco o dissociazione; incolpi gli altri; conflitti; isolamento; problem solving più debole.',
        }),
        emozione('Colpa', 'rimorso, rimpianto, dispiacere, senso di colpevolezza', {
          eventi: 'fare o pensare qualcosa che ritieni sbagliato o contrario ai tuoi valori; non fare ciò che avevi detto; sbagliare con qualcuno o qualcosa di prezioso; fare del male a un altro o a te stessa; sentirti ricordare qualcosa di sbagliato fatto in passato.',
          pensieri: '“devo essere incolpata per quello che ho fatto”; “mi sono comportata male”; “se solo avessi agito diversamente…”.',
          corpo: 'viso rosso e caldo, tensione, senso di soffocamento.',
          azioni: 'cercare di rimediare e riparare, chiedere perdono, fare regali o sacrifici per riparare, chinare la testa.',
          conseguenze: 'propositi di cambiamento, modifica del comportamento, anche aderire a programmi di auto-aiuto.',
        }),
        { titolo: 'Altre parole delle emozioni', testo: 'Anche queste servono per dare un nome a ciò che provi: affaticamento, insoddisfazione, avversione; insicurezza, fragilità, timidezza, riserbo; prudenza, riluttanza, sospettosità, cautela; sorpresa, meraviglia, stupore, spavento; audacia, coraggio, determinazione; potenza, senso di competenza, padronanza; incertezza, scetticismo, esitazione; apatia, noia, inerzia, impazienza, indifferenza.' },
      ],
    },
    {
      id: 'reg-7', numero: '7', sezione: 'Cambiare le risposte emotive', etichetta: 'PANORAMICA', pagina: 227,
      titolo: 'Panoramica: cambiare le risposte emotive',
      blocchi: [
        { voci: [
          { t: 'Controlla i fatti.', d: 'Verifica se le tue reazioni emotive corrispondono ai fatti della situazione. Cambiare convinzioni e assunti perché corrispondano ai fatti può cambiare le reazioni.' },
          { t: 'Azione opposta.', d: 'Quando l’emozione non corrisponde ai fatti, o agire seguendola non è efficace, fare l’opposto (fino in fondo) cambia la reazione emotiva.' },
          { t: 'Problem solving.', d: 'Quando è la situazione stessa il problema, risolverla riduce la frequenza delle emozioni negative.' },
        ] },
      ],
    },
    {
      id: 'reg-8', numero: '8', etichetta: 'FATTI', pagina: 228,
      titolo: 'Controlla i fatti',
      blocchi: [
        { titolo: 'Perché funziona', voci: [
          'Molte emozioni e azioni nascono dai nostri pensieri e dalle interpretazioni degli eventi, non dagli eventi in sé: evento, pensieri, emozioni.',
          'Vale anche il contrario: le emozioni influenzano i pensieri che facciamo sugli eventi.',
          'Esaminare i pensieri e controllare i fatti può aiutare a cambiare le emozioni.',
        ] },
        { titolo: 'Come controllare i fatti', numerati: true, voci: [
          { t: 'Qual è l’emozione che voglio cambiare?', d: 'Dalle parole della scheda 6.' },
          { t: 'Qual è l’evento che l’ha attivata?', d: 'Descrivi solo ciò che hai osservato con i sensi; sfida giudizi, assoluti e bianco-o-nero.' },
          { t: 'Quali sono i miei pensieri, assunti e interpretazioni?', d: 'Cerca altre interpretazioni possibili, osserva tutti gli aspetti della situazione, assumi più punti di vista, verifica se corrispondono ai fatti.' },
          { t: 'Sto ipotizzando una minaccia?', d: 'Dalle un nome, valuta quanto è probabile che accada e elenca quanti esiti diversi riesci a immaginare.' },
          { t: 'Qual è la catastrofe?', d: 'Immagina che accada e immagina di affrontarla bene: con problem solving, anticipando e pianificando, o con accettazione radicale.' },
          { t: 'L’emozione e la sua intensità sono commisurate ai fatti?', d: 'Controlla i fatti che corrispondono a quell’emozione e chiedi alla mente saggia.' },
        ] },
      ],
    },
    {
      id: 'reg-8a', numero: '8A', etichetta: 'ESEMPI', pagina: 229,
      titolo: 'Esempi di emozioni che corrispondono ai fatti',
      blocchi: [
        { titolo: 'Quando l’emozione è giustificata', voci: [
          { t: 'Paura:', d: 'c’è una minaccia alla vita, alla salute o al benessere tuo o di chi ami.' },
          { t: 'Rabbia:', d: 'un obiettivo importante è bloccato o un’attività piacevole interrotta; qualcuno attacca, minaccia o insulta te o chi ami; la tua integrità o quella del tuo gruppo è offesa.' },
          { t: 'Disgusto:', d: 'qualcosa con cui sei in contatto potrebbe contaminarti o avvelenarti; qualcuno che disprezzi profondamente ti tocca; un gruppo si comporta in modo seriamente dannoso per la tua comunità.' },
          { t: 'Invidia:', d: 'un’altra persona o gruppo ottiene o possiede ciò che non hai o di cui hai bisogno.' },
          { t: 'Gelosia:', d: 'una relazione o un oggetto molto importante rischia di essere danneggiato o perso, o qualcuno minaccia di portartelo via.' },
          { t: 'Amore:', d: 'amare una persona, un animale o un oggetto migliora la qualità della vita tua o di chi ami, o le tue possibilità di raggiungere i tuoi obiettivi.' },
          { t: 'Tristezza:', d: 'hai perso per sempre qualcosa o qualcuno; le cose non sono andate come volevi o speravi.' },
          { t: 'Vergogna:', d: 'sarai rifiutata da una persona o da un gruppo a cui tieni se scoprissero certi aspetti di te o del tuo comportamento.' },
          { t: 'Colpa:', d: 'il tuo comportamento viola i tuoi valori o il tuo codice morale.' },
        ] },
        { titolo: 'Intensità e durata sono giustificate da', numerati: true, voci: [
          'Quanto è probabile che gli esiti temuti o attesi si verifichino.',
          'Quanto sono grandi o importanti quegli esiti.',
          'Quanto è efficace la tua emozione adesso.',
        ] },
      ],
    },
    {
      id: 'reg-9', numero: '9', etichetta: 'DECIDERE', pagina: 230,
      titolo: 'Azione opposta e problem solving: decidere quale abilità usare',
      blocchi: [
        { voci: [
          { t: 'Azione opposta', d: '= agire all’opposto rispetto alla spinta dell’emozione.' },
          { t: 'Problem solving', d: '= evitare o cambiare (risolvere) un evento problematico.' },
        ] },
        { titolo: 'Come scegliere', numerati: true, voci: [
          { t: 'Sii consapevole dell’emozione del momento', d: '(scheda 22).' },
          { t: 'Chiediti: l’emozione corrisponde ai fatti?', d: 'Controlla i fatti. Se non corrisponde, cambia i pensieri perché corrispondano ai fatti (scheda 8) e prendi in considerazione l’azione opposta (schede 10-11).' },
          { t: 'Se corrisponde ai fatti, chiediti: è efficace seguire l’emozione?', d: 'Chiedi alla mente saggia. Se sì, agisci seguendo l’emozione, accettando le conseguenze con gentilezza.' },
          { t: 'Se non è efficace seguirla,', d: 'e il problema sta nella situazione, usa il problem solving (scheda 12); altrimenti esegui l’azione opposta fino in fondo.' },
        ] },
      ],
    },
    {
      id: 'reg-10', numero: '10', etichetta: 'AZIONE OPPOSTA', pagina: 231,
      titolo: 'L’azione opposta',
      blocchi: [
        { testo: 'Usala quando l’emozione NON corrisponde ai fatti o quando agire seguendola NON è efficace. Ogni emozione porta una spinta all’azione: cambi l’emozione agendo all’opposto di quella spinta.' },
        { titolo: 'Qualche esempio', voci: [
          { t: 'Paura:', d: 'la spinta è fuggire o evitare; l’azione opposta è avvicinarsi, non evitare.' },
          { t: 'Rabbia:', d: 'la spinta è attaccare; l’opposto è evitare con grazia ed essere un po’ gentile.' },
          { t: 'Tristezza:', d: 'la spinta è ritirarsi e isolarsi; l’opposto è attivarsi.' },
          { t: 'Vergogna:', d: 'la spinta è nascondersi; l’opposto è confidare il segreto a chi può accettarlo.' },
        ] },
        { titolo: 'Passo dopo passo', numerati: true, voci: [
          { t: 'Identifica e dai un nome all’emozione', d: 'che vuoi cambiare.' },
          { t: 'Controlla i fatti:', d: 'l’emozione, la sua intensità e la sua durata corrispondono alla situazione? (L’“irritazione” va bene se ti tagliano la strada; la “furia cieca” no.)' },
          { t: 'Identifica e descrivi le tue spinte all’azione.', d: '' },
          { t: 'Chiedi alla mente saggia:', d: 'esprimere o agire seguendo questa emozione è efficace qui?' },
          { t: 'Se non corrisponde ai fatti o non è efficace, identifica le azioni opposte', d: 'alla spinta.' },
          { t: 'Compi l’azione opposta fino in fondo.', d: '' },
          { t: 'Ripetila', d: 'finché l’emozione non cambia.' },
        ] },
      ],
    },
    {
      id: 'reg-11', numero: '11', etichetta: 'OPPOSTE', pagina: 232,
      titolo: 'Trovare le azioni opposte',
      blocchi: [
        { testo: 'Per ogni emozione: quando è giustificata, quando no, e quali azioni opposte provare. Le azioni “diametralmente opposte” cambiano anche postura, pensieri e chimica del corpo. Quando l’emozione corrisponde ai fatti ma non è efficace, non si usa l’opposta: vedi scheda 13.' },
        { titolo: 'Paura', voci: [
          { t: 'Corrisponde ai fatti se', d: 'c’è una minaccia alla tua vita, salute o benessere (o di chi ami).' },
          { t: 'Azioni opposte:', d: 'fai ciò che ti spaventa, ancora e ancora; avvicinati a eventi, luoghi, compiti e persone temuti; fai attività che ti danno controllo e padronanza.' },
          { t: 'Diametralmente opposte:', d: 'occhi e orecchie aperti sullo stimolo temuto, guardati intorno lentamente ed esplora; raccogli informazioni (renditi conto di essere al sicuro); postura e tono sicuri (testa alta, spalle indietro ma rilassate); cambia la chimica del corpo con un respiro profondo, espirando a lungo.' },
        ] },
        { titolo: 'Rabbia', voci: [
          { t: 'Corrisponde ai fatti se', d: 'un obiettivo importante è bloccato; qualcuno attacca o minaccia te o chi ami; sono offesi lo stato o l’integrità del tuo gruppo.' },
          { t: 'Azioni opposte:', d: 'evita con grazia la persona invece di attaccarla; fermati un attimo e respira; sii gentile invece che offensiva.' },
          { t: 'Diametralmente opposte:', d: 'immagina di provare comprensione ed empatia, mettiti nei suoi panni e trova buone ragioni per quello che è successo; mani aperte e rilassate, petto, ventre, mandibola e viso rilassati, un accenno di sorriso; respira a fondo o fai attività intensa ma non violenta.' },
        ] },
        { titolo: 'Disgusto', voci: [
          { t: 'Corrisponde ai fatti se', d: 'qualcosa potrebbe contaminarti o avvelenarti; qualcuno che davvero non ti piace tocca te o chi ami; una persona o un gruppo potrebbe danneggiare seriamente te o la tua comunità.' },
          { t: 'Azioni opposte:', d: 'avvicinati (mangia, bevi, stai vicino a ciò che ti disgusta); sii gentile con chi disprezzi, mettiti nei suoi panni.' },
          { t: 'Diametralmente opposte:', d: 'immagina di essere comprensiva, trova buone ragioni per come l’altro si comporta; accogli in te ciò che ripugna usando i sensi; mani aperte, viso rilassato, un accenno di sorriso; respira a fondo.' },
        ] },
        { titolo: 'Invidia', voci: [
          { t: 'Corrisponde ai fatti se', d: 'una persona o un gruppo ha ciò che vuoi o di cui hai bisogno.' },
          { t: 'Azioni opposte:', d: 'impedisciti di distruggere ciò che ha l’altro; pensa alle tue fortune e fai una lista di ciò che sei felice di avere.' },
          { t: 'Diametralmente opposte:', d: 'pensa a tutte le tue fortune senza ometterne e senza esagerare ciò che ti manca; smetti di esagerare il valore degli altri, controlla i fatti; postura aperta e rilassata; respira a fondo.' },
        ] },
        { titolo: 'Gelosia', voci: [
          { t: 'Corrisponde ai fatti se', d: 'qualcuno minaccia di portarti via un oggetto o una relazione davvero importanti, o rischi che una relazione molto importante sia danneggiata o finisca.' },
          { t: 'Azioni opposte:', d: 'smetti di controllare le azioni degli altri; condividi le cose e le persone che hai nella tua vita.' },
          { t: 'Diametralmente opposte:', d: 'smetti di spiare o far controllare l’altro e sopprimi le domande indagatorie (“dov’eri? con chi?”); non evitare, ascolta tutti i dettagli e concentrati sulle sensazioni; postura aperta; respira a fondo.' },
        ] },
        { titolo: 'Amore', voci: [
          { t: 'Corrisponde ai fatti se', d: 'amare quella persona, animale o cosa migliora la qualità della tua vita (o di chi ami) o le tue possibilità di raggiungere i tuoi obiettivi.' },
          { t: 'Azioni opposte (se non è giustificato):', d: 'evita la persona o l’oggetto che ami; distraiti dai pensieri su di lui; ripensa ai motivi per cui l’amore non è giustificato.' },
          { t: 'Diametralmente opposte:', d: 'evita il contatto con ciò che te lo ricorda (foto, messaggi, oggetti, ricordi, luoghi); non seguire né cercare la persona; smetti di esprimere amore, anche con gli amici, e togli i contatti sui social; cambia postura ed espressione se le sei vicina: non sporgerti, non avvicinarti, non guardarla.' },
        ] },
        { titolo: 'Tristezza', voci: [
          { t: 'Corrisponde ai fatti se', d: 'hai perso qualcosa o qualcuno per sempre, o le cose non sono andate come volevi o speravi.' },
          { t: 'Azioni opposte:', d: 'attivati e avvicinati; evita di evitare; diventa brava nella mastery (scheda 19); aumenta gli eventi positivi.' },
          { t: 'Diametralmente opposte:', d: 'presta attenzione al momento presente e a ogni dettaglio, prova attività nuove o positive; postura “aperta”, testa alta, voce energica; cambia la chimica del corpo con più attività fisica.' },
        ] },
        { titolo: 'Vergogna (non giustificata)', voci: [
          { t: 'Corrisponde ai fatti se', d: 'sarai respinta da una persona o da un gruppo a cui tieni se certe tue caratteristiche o comportamenti si venissero a sapere.' },
          { t: 'Azioni opposte:', d: 'esponi le tue caratteristiche o il tuo comportamento, con persone che non ti rifiutano; ripeti i comportamenti di cui ti vergogni senza nasconderli a chi non ti rifiuta.' },
          { t: 'Diametralmente opposte:', d: 'non scusarti e non rimediare alla supposta trasgressione; raccogli tutte le informazioni; postura da innocente e orgogliosa (testa alta, petto in fuori, contatto oculare, voce chiara).' },
        ] },
        { titolo: 'Vergogna non giustificata, ma colpa giustificata', testo: 'Il tuo comportamento viola valori che senti tuoi.', voci: [
          { t: 'Azioni opposte:', d: 'rendi pubblico il tuo comportamento (con persone che non ti rifiutano); scusati; rimedia o impegnati a evitare o riparare conseguenze simili per altri; impegnati a non ripetere l’errore; accetta le conseguenze con gentilezza.' },
          { t: 'Diametralmente opposte:', d: 'perdonati e riconosci le cause del tuo comportamento; lascia andare, fai scorrere.' },
        ] },
        { titolo: 'Colpa (non giustificata)', voci: [
          { t: 'Corrisponde ai fatti se', d: 'il tuo comportamento viola i tuoi valori o il tuo codice morale.' },
          { t: 'Azioni opposte:', d: 'esprimi agli altri le tue caratteristiche o il tuo comportamento, con persone che non ti rifiutano; ripeti ciò che ti fa sentire in colpa senza nasconderlo.' },
          { t: 'Diametralmente opposte:', d: 'non scusarti e non rimediare alla supposta trasgressione; raccogli tutte le informazioni; postura da innocente e orgogliosa.' },
        ] },
        { titolo: 'Colpa non giustificata, ma vergogna giustificata', testo: 'Saresti respinta se venissi scoperta.', voci: [
          { t: 'Azioni opposte:', d: 'nascondi il comportamento (se vuoi restare nel gruppo); usa le abilità interpersonali; lavora per cambiare i valori della persona o del gruppo; unisciti a un nuovo gruppo che condivide i tuoi valori; ripeti nel nuovo gruppo il comportamento che ripara il tuo senso di colpa.' },
          { t: 'Diametralmente opposta:', d: 'valida i tuoi comportamenti.' },
        ] },
      ],
    },
    {
      id: 'reg-12', numero: '12', etichetta: 'PROBLEM SOLVING', pagina: 241,
      titolo: 'Problem solving',
      blocchi: [
        { testo: 'Se i fatti sono corretti e la situazione descritta è il problema, vai al passo 3. Se i fatti non sono corretti, torna al passo 1.' },
        { numerati: true, voci: [
          { t: 'Analizza e descrivi la situazione problematica.', d: '' },
          { t: 'Controlla i fatti, tutti,', d: 'per essere sicura di aver inquadrato bene il problema.' },
          { t: 'Identifica il tuo obiettivo.', d: 'Cosa deve succedere o cambiare perché tu sia soddisfatta? Resta sul semplice e scegli qualcosa di verosimile.' },
          { t: 'Brainstorming di soluzioni.', d: 'Quante più possibile, chiedi consiglio a persone di cui ti fidi, non scartare nessuna idea finché non arrivi al passo 5.' },
          { t: 'Scegli una soluzione adatta all’obiettivo', d: 'e che verosimilmente funziona. Se sei indecisa, scegline due; fai pro e contro; la migliore è la prima opzione.' },
          { t: 'Passa all’azione.', d: 'Sperimenta la soluzione partendo dal primo passo, poi il secondo…' },
          { t: 'Valuta i risultati.', d: 'Ha funzionato? Vai avanti. Non ha funzionato? Torna al passo 5 e scegli un’altra soluzione.' },
        ] },
      ],
    },
    {
      id: 'reg-13', numero: '13', etichetta: 'SINTESI', pagina: 242,
      titolo: 'Sintesi dell’azione opposta e del problem solving',
      blocchi: [
        { testo: 'Per ogni emozione: quando i fatti la giustificano, cosa fare se NON è giustificata (azione opposta) e cosa fare se lo è (seguire la spinta, risolvere il problema, evitare).' },
        { titolo: 'Paura (vita, salute o benessere in pericolo)', voci: [
          { t: 'Se non è giustificata:', d: 'fai e rifai ciò che ti spaventa; avvicinati a ciò che temi; fai ciò che ti dà controllo e padronanza.' },
          { t: 'Se lo è:', d: 'bloccati o scappa se il pericolo è vicino; rimuovi l’evento minaccioso; fai cose che ti danno controllo sull’evento temuto; evitalo.' },
        ] },
        { titolo: 'Rabbia (obiettivo bloccato, attacco, insulto o minaccia)', voci: [
          { t: 'Se non è giustificata:', d: 'evita con grazia; fermati un attimo; fai qualcosa di gentile; immagina comprensione e buone ragioni che spieghino cos’è successo.' },
          { t: 'Se lo è:', d: 'se non hai niente da perdere, reagisci all’attacco; supera gli ostacoli ai tuoi obiettivi; impegnati per fermare altri attacchi, insulti, minacce; evita o allontanati da chi ti minaccia.' },
        ] },
        { titolo: 'Disgusto (contaminazione o comportamenti pericolosi per il gruppo)', voci: [
          { t: 'Se non è giustificato:', d: 'avvicinati, abbraccia; sii gentile; accogli ciò che ripugna; guarda la situazione dal punto di vista dell’altro.' },
          { t: 'Se lo è:', d: 'rimuovi o ripulisci le cose rivoltanti; spingi gli altri a smettere azioni pericolose; evita o respingi cose e persone pericolose; sii comprensiva con chi ha fatto cose disgustose.' },
        ] },
        { titolo: 'Invidia (altri hanno ciò che a te manca o serve)', voci: [
          { t: 'Se non è giustificata:', d: 'impedisciti di distruggere le cose degli altri; pensa alle tue fortune; immagina come tutto possa avere senso; smetti di esagerare il valore degli altri.' },
          { t: 'Se lo è:', d: 'migliora te stessa e la tua vita; porta gli altri a essere corretti; svaluta ciò che hanno gli altri e tu no; mettiti “occhiali dalle lenti rosa”; evita chi ha più di te.' },
        ] },
        { titolo: 'Gelosia (relazione o cosa importante a rischio)', voci: [
          { t: 'Se non è giustificata:', d: 'smetti di controllare gli altri; condividi ciò che hai; smetti di spiare e indagare; non evitare, accogli ogni informazione.' },
          { t: 'Se lo è:', d: 'proteggi ciò che hai; impegnati per diventare più desiderabile agli occhi di chi vuoi accanto (combatti per le tue relazioni); oppure abbandona la relazione.' },
        ] },
        { titolo: 'Amore (migliora la qualità della vita o avvicina ai tuoi obiettivi)', voci: [
          { t: 'Se non è giustificato:', d: 'evita del tutto la persona o l’oggetto; distraiti dai pensieri; evita ciò che te lo ricorda; ripensa al perché l’amore non è giustificato.' },
          { t: 'Se lo è:', d: 'stai con ciò che ami; tocca, stringi; evita per quanto possibile le separazioni; se lo perdi, combatti per riaverlo (se possibile).' },
        ] },
        { titolo: 'Tristezza (perdita per sempre o cose andate diversamente da come speravi)', voci: [
          { t: 'Se non è giustificata:', d: 'attiva il comportamento; evita di evitare; diventa brava nella mastery; aumenta gli eventi piacevoli; presta attenzione a quelli che ci sono.' },
          { t: 'Se lo è:', d: 'piangi, organizza una veglia, vai al cimitero (senza costruirci la casa dentro); recupera o sostituisci ciò che hai perso; pianifica di ricostruire una vita degna di essere vissuta; accumula positività; fai mastery; comunica il bisogno di aiuto e accettalo; occhiali dalle lenti rosa.' },
        ] },
        { titolo: 'Vergogna (sarai respinta se il tuo comportamento o una tua caratteristica venissero esposti)', voci: [
          { t: 'Se non è giustificata:', d: 'esponi te stessa a persone che non ti rifiuteranno; ripeti il comportamento senza nasconderti; se violi il tuo codice morale, scusati, rimedia, perdonati, lascia andare.' },
          { t: 'Se lo è:', d: 'nascondi ciò per cui verresti respinta; placa gli offesi; cambia comportamento o caratteristiche per integrarti; evita i gruppi che ti disapprovano; trova un nuovo gruppo con i tuoi valori; impegnati per cambiare i valori di una persona o della società.' },
        ] },
        { titolo: 'Colpa (il tuo comportamento viola i tuoi valori)', voci: [
          { t: 'Se non è giustificata:', d: 'fai e rifai ciò che ti fa sentire in colpa; esponi il tuo comportamento a chi non ti rifiuterà; se verrai rifiutata: nascondilo, usa le abilità interpersonali, impegnati a cambiare i valori del gruppo o unisciti a uno nuovo.' },
          { t: 'Se lo è:', d: 'chiedi perdono; rimedia al danno o, se non puoi, impegnati a evitare o riparare danni simili ad altri; accetta le conseguenze con grazia; impegnati a non violare più il tuo codice morale.' },
        ] },
      ],
    },
    {
      id: 'reg-14', numero: '14', sezione: 'Ridurre la vulnerabilità', etichetta: 'PANORAMICA', pagina: 247,
      titolo: 'Panoramica: ridurre la vulnerabilità alla mente emotiva e costruire una vita degna di essere vissuta',
      blocchi: [
        { testo: 'Un modo per ricordare queste abilità è l’acronimo ABC PLEASE.' },
        { voci: [
          { t: 'A · Accumula emozioni positive.', d: 'A breve termine fai cose piacevoli possibili adesso; a lungo termine cambia la vita perché capitino più spesso eventi positivi. Costruisci una “vita degna di essere vissuta”.' },
          { t: 'B · Diventa Bravo nella mastery.', d: 'Fai cose che ti fanno sentire competente ed efficace, per combattere disperazione e impotenza.' },
          { t: 'C · Gestisci in antiCipo le situazioni emotive.', d: 'Prepara e testa in anticipo un piano per affrontarle con efficacia.' },
          { t: 'PLEASE · Prenditi cura della mente prendendoti cura del corpo.', d: 'Cura del corpo, cibo equilibrato, evita le sostanze, sonno equilibrato, esercizio fisico.' },
        ] },
      ],
    },
    {
      id: 'reg-15', numero: '15', etichetta: 'BREVE TERMINE', pagina: 248,
      titolo: 'Accumula emozioni positive nel breve termine',
      blocchi: [
        { titolo: 'Costruisci esperienze positive ora', voci: [
          'Aumenta gli eventi piacevoli che suscitano emozioni positive.',
          'Fai una cosa ogni giorno dalla lista degli eventi piacevoli (scheda 16).',
          'Pratica l’azione opposta: evita di evitare.',
          'Sii consapevole degli eventi piacevoli: una cosa per volta.',
        ] },
        { titolo: 'Sii consapevole delle esperienze positive', voci: [
          'Focalizza l’attenzione sui momenti positivi quando accadono.',
          'Se la mente va verso la negatività, riporta l’attenzione sul momento.',
          'Partecipa e impegnati completamente in ogni esperienza.',
        ] },
        { titolo: 'Non curarti delle preoccupazioni', voci: [
          'Per esempio: quando finirà questa esperienza positiva; se la meriti; quanto di più ci si potrebbe aspettare da te ora.',
        ] },
      ],
    },
    {
      id: 'reg-16', numero: '16', etichetta: 'EVENTI PIACEVOLI', pagina: 249,
      titolo: 'Lista degli eventi piacevoli',
      blocchi: [
        { testo: 'Gli eventi piacevoli del manuale, nello stesso ordine e con la stessa numerazione (225). Scegline uno ogni giorno e aggiungi i tuoi: il manuale lascia spazio per “altro”.' },
        { numerati: true, voci: EVENTI_PIACEVOLI },
      ],
    },
    {
      id: 'reg-17', numero: '17', etichetta: 'LUNGO TERMINE', pagina: 252,
      titolo: 'Accumula emozioni positive nel lungo termine',
      blocchi: [
        { testo: 'Per costruire una “vita degna di essere vissuta”: fai cambiamenti perché in futuro accadano più eventi positivi.' },
        { numerati: true, voci: [
          { t: 'Evita di evitare.', d: 'Comincia ora a fare ciò che serve per costruire la vita che vuoi. Se non sai cosa vuoi, segui i passi seguenti.' },
          { t: 'Identifica i valori per te importanti.', d: 'Esempi: essere produttivi, far parte di un gruppo, trattare bene gli altri, essere in forma.' },
          { t: 'Scegli un valore su cui lavorare adesso.', d: 'Cosa è davvero importante per te, in questo momento?' },
          { t: 'Identifica qualche obiettivo legato a quel valore.', d: 'Per esempio: scegliere un lavoro utile, svolgere compiti importanti a casa, trovare un’attività di volontariato.' },
          { t: 'Scegli un obiettivo su cui lavorare adesso.', d: 'Se serve, fai pro e contro.' },
          { t: 'Identifica piccoli passi concreti.', d: 'Per esempio: cercare offerte di lavoro, presentare domanda, scrivere un curriculum.' },
          { t: 'Fai il primo passo adesso.', d: '' },
        ] },
      ],
    },
    {
      id: 'reg-18', numero: '18', etichetta: 'VALORI', pagina: 253,
      titolo: 'Lista dei valori e delle priorità',
      blocchi: [
        { testo: 'La lista del manuale (adattata da Schwartz) con la stessa numerazione (58 valori). Chiediti: “nella mia mente saggia, cosa credo sia importante?”. Dopo ogni gruppo il manuale lascia spazio per aggiungere i tuoi.' },
        { titolo: 'A. Occuparsi delle relazioni', numerati: true, start: 1, voci: [
          'Riparare vecchie relazioni.',
          'Cercare nuove relazioni.',
          'Lavorare sulle relazioni attuali.',
          'Chiudere relazioni distruttive.',
        ] },
        { titolo: 'B. Far parte di un gruppo', numerati: true, start: 5, voci: [
          'Avere relazioni intime e soddisfacenti con gli altri.',
          'Sentire di appartenere.',
          'Ricevere affetto e amore.',
          'Essere coinvolta e in intimità con gli altri; avere e mantenere amici intimi.',
          'Avere una famiglia; restare in contatto e passare tempo con i familiari.',
          'Avere persone con cui fare cose.',
        ] },
        { titolo: 'C. Essere forti e influenzare gli altri', numerati: true, start: 11, voci: [
          'Avere l’autorità di approvare o disapprovare ciò che le persone fanno o di controllare come si usano le risorse.',
          'Essere una leader.',
          'Fare molti soldi.',
          'Essere rispettata dagli altri.',
          'Essere vista come di successo, diventare nota, ottenere riconoscimento e status.',
          'Competere con successo con gli altri.',
          'Essere popolare e accettata.',
        ] },
        { titolo: 'D. Ottenere cose nella vita', numerati: true, start: 18, voci: [
          'Raggiungere obiettivi significativi; impegnarsi in imprese che ritengo significative.',
          'Essere produttiva.',
          'Lavorare verso gli obiettivi; lavorare sodo.',
          'Essere ambiziosa.',
        ] },
        { titolo: 'E. Vivere una vita di piacere e soddisfazione', numerati: true, start: 22, voci: [
          'Divertirsi.',
          'Cercare il divertimento e le cose che danno piacere.',
          'Avere tempo libero.',
          'Apprezzare il lavoro che faccio.',
        ] },
        { titolo: 'F. Avere una vita piena di eventi, relazioni e cose stimolanti', numerati: true, start: 26, voci: [
          'Provare cose nuove e diverse nella vita.',
          'Essere audace e cercare avventure.',
          'Avere una vita stimolante.',
        ] },
        { titolo: 'G. Comportarsi rispettosamente', numerati: true, start: 29, voci: [
          'Essere umile e modesta; non attirare l’attenzione.',
          'Seguire tradizioni e usanze; comportarsi in modo appropriato.',
          'Fare ciò che mi viene detto e seguire le regole.',
          'Trattare bene gli altri.',
        ] },
        { titolo: 'H. Essere padroni di se stessi', numerati: true, start: 33, voci: [
          'Seguire il mio percorso di vita.',
          'Essere innovativa, pensare idee nuove, essere creativa.',
          'Prendere le mie decisioni ed essere libera.',
          'Essere indipendente; prendermi cura di me e di chi dipende da me.',
          'Avere libertà di pensiero e di azione; poter agire secondo le mie priorità.',
        ] },
        { titolo: 'I. Essere una persona spirituale', numerati: true, start: 38, voci: [
          'Fare spazio alla spiritualità; vivere secondo principi spirituali.',
          'Praticare una religione o una fede.',
          'Crescere nella comprensione di me, di ciò a cui sono destinata e del mio vero scopo di vita.',
          'Riconoscere e fare il volere di Dio (o del potere superiore) e trovare il significato duraturo della vita.',
        ] },
        { titolo: 'J. Essere sicura', numerati: true, start: 42, voci: [
          'Vivere in un ambiente sicuro e privo di pericoli.',
          'Essere fisicamente sana e in forma.',
          'Avere un reddito stabile che soddisfi i bisogni di base miei e della mia famiglia.',
        ] },
        { titolo: 'K. Giustizia e natura (nel manuale il titolo ripete “Vivere una vita di piacere e soddisfazione”)', numerati: true, start: 45, voci: [
          'Essere giusta, trattare le persone equamente e dare uguali opportunità.',
          'Comprendere persone diverse; avere una mente aperta.',
          'Preoccuparmi per la natura e per l’ambiente.',
        ] },
        { titolo: 'L. Dare un contributo alla comunità', numerati: true, start: 48, voci: [
          'Aiutare le persone e chi ha bisogno; occuparmi del benessere altrui; migliorare la società.',
          'Essere leale con gli amici e dedicarmi al prossimo; impegnarmi in un gruppo che condivide le mie credenze, i miei valori e i miei principi etici.',
          'Impegnarmi in una causa o in un gruppo con uno scopo più ampio.',
          'Fare sacrifici per gli altri.',
        ] },
        { titolo: 'M. Lavorare allo sviluppo personale', numerati: true, start: 52, voci: [
          'Sviluppare una filosofia di vita personale.',
          'Imparare e fare cose impegnative che mi aiutano a crescere e maturare come essere umano.',
        ] },
        { titolo: 'N. Avere integrità', numerati: true, start: 54, voci: [
          'Essere onesta, riconoscere e sostenere ciò in cui credo.',
          'Essere una persona responsabile; mantenere la parola data.',
          'Essere coraggiosa nell’affrontare e vivere la vita.',
          'Essere una persona che paga i debiti agli altri e ripara i danni che ha causato.',
          'Accettare me, gli altri e la vita così com’è; vivere senza risentimento.',
        ] },
      ],
    },
    {
      id: 'reg-19', numero: '19', etichetta: 'MASTERY', pagina: 256,
      titolo: 'Diventa bravo nella mastery e gestisci in anticipo',
      blocchi: [
        { titolo: 'Diventa brava nella mastery', numerati: true, voci: [
          'Pianifica di fare almeno una cosa al giorno che costruisca un senso di realizzazione.',
          'Fai piani per il successo, non per il fallimento: qualcosa di difficile ma possibile.',
          'Aumenta gradualmente la difficoltà; se il primo compito è troppo duro, fai qualcosa di un po’ più semplice la volta dopo.',
          'Cerca una sfida; se il compito è troppo facile, scegli qualcosa di un po’ più difficile.',
        ] },
        { titolo: 'Gestisci in anticipo le circostanze difficili', numerati: true, voci: [
          { t: 'Descrivi una situazione che potrebbe creare problemi.', d: 'Controlla i fatti, sii specifica, dai un nome alle emozioni e alle azioni che di solito interferiscono con le tue abilità.' },
          { t: 'Decidi quale abilità di coping o di problem solving usare.', d: 'Scrivi nel dettaglio come affronterai la situazione, le emozioni e l’impulso ad agire.' },
          { t: 'Immagina la situazione nel modo più vivido possibile,', d: 'come se fossi NELLA situazione adesso, non come se la guardassi da fuori.' },
          { t: 'Ripeti mentalmente come farvi fronte.', d: 'Azioni, pensieri, parole e tono; i nuovi problemi che emergono; anche la catastrofe che temi di più.' },
          { t: 'Pratica il rilassamento', d: 'dopo aver provato.' },
        ] },
      ],
    },
    {
      id: 'reg-20', numero: '20', etichetta: 'PLEASE', pagina: 257,
      titolo: 'Prenditi cura della mente prendendoti cura del corpo (PLEASE)',
      blocchi: [
        { numerati: true, voci: [
          { t: 'Prenditi cura del corpo (dolori, malattie).', d: 'Vai dal medico quando serve e prendi i farmaci prescritti.' },
          { t: 'Cibo equiLibrato.', d: 'Non mangiare troppo né troppo poco; mangia con regolarità e consapevolezza; stai lontana dai cibi che ti rendono troppo emotiva.' },
          { t: 'Evita le sostAnze.', d: 'Stai lontana dalle sostanze illecite e usa l’alcol con moderazione (se non riesci a eliminarlo del tutto).' },
          { t: 'Sonno equilibrato.', d: 'Cerca di dormire 7-9 ore, o almeno quanto ti serve per stare bene; fai un programma del sonno, soprattutto se fai fatica a dormire.' },
          { t: 'Esercizio fisico.', d: 'Un po’ ogni giorno, puntando a 20 minuti.' },
        ] },
      ],
    },
    {
      id: 'reg-20a', numero: '20A', etichetta: 'INCUBI', pagina: 258,
      titolo: 'Protocollo sugli incubi, passo dopo passo',
      blocchi: [
        { testo: 'Per quando gli incubi ti impediscono di dormire.' },
        { numerati: true, voci: [
          { t: 'Prima pratica rilassamento, immaginazione piacevole e coping,', d: 'per essere sicura di essere pronta: rilassamento progressivo, respiro regolare, mente saggia, musica o immaginazione guidata, abilità di tolleranza della sofferenza.' },
          { t: 'Scegli un incubo ricorrente su cui lavorare', d: '(l’incubo bersaglio), uno che puoi gestire ora. Se non sei pronta, rimanda.' },
          { t: 'Scrivi l’incubo bersaglio.', d: 'Con le descrizioni sensoriali (vista, odori, suoni, gusti) e i pensieri, i sentimenti e le supposizioni su di te nel sogno.' },
          { t: 'Scegli un finale diverso.', d: 'Il cambiamento deve avvenire PRIMA di qualsiasi evento negativo o traumatico; può essere insolito e straordinario (per esempio, poteri speciali che ti portano al sicuro). Scrivi un finale che ti lasci in pace quando ti svegli.' },
          { t: 'Scrivi l’incubo completo con i cambiamenti.', d: '' },
          { t: 'Ripeti e rilassati ogni notte', d: 'prima di dormire: visualizza l’intero sogno cambiato, poi fai il rilassamento.' },
          { t: 'Ripeti e rilassati durante il giorno,', d: 'ogni volta che puoi.' },
        ] },
      ],
    },
    {
      id: 'reg-20b', numero: '20B', etichetta: 'SONNO', pagina: 259,
      titolo: 'Protocollo sull’igiene del sonno',
      blocchi: [
        { testo: 'Quando non riesci a dormire, cosa fare invece di rimuginare.' },
        { titolo: 'Per aumentare la probabilità di riposo', numerati: true, voci: [
          'Segui un programma del sonno anche nei fine settimana: stessi orari ogni giorno, niente pisolini oltre i 10 minuti.',
          'Non usare il letto di giorno per TV, telefono o lettura.',
          'Evita caffeina, nicotina, alcol, pasti pesanti ed esercizio a fine giornata.',
          'Prepara la camera: luci spente, silenzio, temperatura fresca e confortevole; coperta elettrica, ventilatore, mascherina, tappi o rumore bianco se servono.',
          'Datti mezz’ora, al massimo un’ora per addormentarti; se non succede, valuta se sei calma, ansiosa o se stai rimuginando.',
          'Non drammatizzare: hai bisogno di riposo, puoi sognare a occhi aperti e far riposare il cervello. Stare svegli non è una catastrofe.',
        ] },
        { titolo: 'Se sei tranquilla ma ben sveglia', numerati: true, voci: [
          'Alzati, vai in un’altra stanza e fai qualcosa che non ti tenga sveglia a lungo; torna a letto appena senti sonno.',
          'Prova uno snack leggero, per esempio una mela.',
        ] },
        { titolo: 'Se sei ansiosa o rimugini', numerati: true, voci: [
          { t: 'Fai la TIP:', d: 'torna a letto e usa il ritmo del respiro (Tolleranza della sofferenza, scheda 6). Con problemi medici chiedi prima al medico per l’acqua fredda.' },
          { t: 'Pratica meditativa 9-0:', d: 'inspira a fondo ed espira lentamente dicendo mentalmente 9; all’espirazione dopo 8, poi 7… fino a 0. Ricomincia da 8, poi da 7, e così fino a partire da 1. Se ti perdi, riprendi dall’ultimo numero che ricordi. Continua finché ti addormenti.' },
          'Concentrati sulle sensazioni del corpo legate alla rimuginazione: spesso è una scappatoia dalle emozioni faticose.',
          'Ricordati che le preoccupazioni notturne sono “pensieri nel cuore della notte”: di giorno penserai e sentirai in modo diverso.',
          'Leggi qualche minuto un romanzo avvincente finché sei stanca, poi chiudi gli occhi e continua la storia a mente.',
          'Se la rimuginazione non smette: se il problema è risolvibile, risolvilo; se non lo è, immagina la conseguenza più catastrofica e immagina di superarla (scheda 19). Se nulla funziona, ascolta la radio a basso volume (auricolari se serve).',
        ] },
      ],
    },
    {
      id: 'reg-21', numero: '21', sezione: 'Gestire emozioni particolarmente difficili', etichetta: 'PANORAMICA', pagina: 263,
      titolo: 'Panoramica: gestire emozioni particolarmente difficili',
      blocchi: [
        { voci: [
          { t: 'Mindfulness delle emozioni del momento.', d: 'Sopprimere le emozioni aumenta la sofferenza; esserne consapevoli è il sentiero verso la libertà emotiva.' },
          { t: 'Gestire le emozioni estreme.', d: 'A volte l’attivazione è così alta da impedirti di usare qualsiasi abilità, soprattutto se complicata: è il punto di rottura delle abilità. Servono abilità di sopravvivenza alla crisi.' },
          { t: 'Risolvere i problemi e revisione.', d: 'Ci sono molti modi di cambiare le emozioni: può servire una lista delle abilità importanti da consultare quando non ti ricordi cosa usare.' },
        ] },
      ],
    },
    {
      id: 'reg-22', numero: '22', etichetta: 'ONDA', pagina: 264,
      titolo: 'Mindfulness delle emozioni del momento: lasciare andare la sofferenza',
      blocchi: [
        { titolo: 'Osserva la tua emozione', voci: [
          'Fai un passo indietro e limitati a osservarla.',
          'L’emozione è come un’onda che va e viene: immagina di cavalcarla.',
          'Non bloccarla né sopprimerla; non cercare di liberartene né di respingerla; non sostenerla, non aggrapparti, non amplificarla.',
        ] },
        { titolo: 'Pratica la consapevolezza delle sensazioni del corpo', voci: [
          'Nota DOVE nel corpo senti le sensazioni emotive.',
          'Vivile il più completamente possibile.',
          'Osserva QUANTO tempo ci vuole perché l’emozione diminuisca.',
        ] },
        { titolo: 'Ricorda: tu non sei la tua emozione', voci: [
          'Non devi per forza agire sulla tua emozione.',
          'Ricorda le volte in cui ti sei sentita diversamente.',
        ] },
        { titolo: 'Pratica l’amore per la tua emozione', voci: [
          'Rispettala, non giudicarla, allena la disponibilità e accettala radicalmente.',
        ] },
      ],
    },
    {
      id: 'reg-23', numero: '23', etichetta: 'EMOZIONI ESTREME', pagina: 265,
      titolo: 'Gestire le emozioni estreme',
      blocchi: [
        { testo: 'Segui queste indicazioni quando l’attivazione emotiva è così alta da non poter usare le abilità.' },
        { titolo: 'Primo: riconosci il punto di rottura delle abilità', voci: [
          'La sofferenza è estrema e sei sopraffatta.',
          'Non riesci a focalizzare la mente su altro che sull’emozione.',
          'La mente si spegne, il cervello smette di elaborare informazioni.',
          'Non riesci a risolvere problemi né a usare abilità complicate.',
        ] },
        { titolo: 'Poi controlla i fatti', testo: 'Stai davvero “cadendo a pezzi” a questo livello di sofferenza? Se no, usa le tue abilità. Se sì, vai ai passi.' },
        { numerati: true, voci: [
          { t: 'Usa le abilità di sopravvivenza alla crisi', d: 'per ridurre l’attivazione (Tolleranza della sofferenza, schede 6-9A): TIP per cambiare la chimica del corpo, distrazione, autoconsolazione con i cinque sensi, migliorare il momento.' },
          { t: 'Torna alla mindfulness delle emozioni del momento', d: '(scheda 22).' },
          { t: 'Se serve, prova altre abilità di regolazione emotiva.', d: '' },
        ] },
      ],
    },
    {
      id: 'reg-24', numero: '24', etichetta: 'SE NON FUNZIONA', pagina: 266,
      titolo: 'Risolvere i problemi delle abilità di regolazione emotiva',
      blocchi: [
        { testo: 'Quando ciò che stai facendo non funziona, controlla in ordine:' },
        { numerati: true, voci: [
          { t: 'I rinforzi.', d: 'Le mie emozioni comunicano un messaggio importante o influenzano gli altri? Mi motivano? Validano le mie convinzioni o la mia identità? Mi fanno sentire bene? Se sì: usa le abilità interpersonali per comunicare, cerca nuovi rinforzi che ti motivino, pratica l’autovalidazione e fai un pro e contro del cambiare le emozioni.' },
          { t: 'Le tue abilità.', d: 'Rivedi cosa hai provato: era un’abilità che poteva funzionare? Hai seguito le istruzioni alla lettera? Ripassa e prova altre abilità, chiedi aiuto al terapeuta, riprova.' },
          { t: 'La sensibilità biologica.', d: 'Sono più vulnerabile? Ho malattie o disagi non curati, squilibri in cibo, sostanze, sonno, esercizio? Ho preso i farmaci prescritti? Lavora sulle abilità PLEASE e riprova.' },
          { t: 'Il sovraccarico emotivo.', d: 'Sono troppo scossa per abilità complicate? Se il problema si risolve facilmente adesso, fai problem solving (schede 9 e 12); altrimenti pratica la mindfulness delle emozioni del momento (scheda 22). Se le emozioni sono troppo forti per ragionare, vai alla TIP.' },
          { t: 'L’umore.', d: 'Sto investendo tempo ed energie sufficienti? Se no, fai pro e contro del lavorare sulle abilità, pratica accettazione radicale e disponibilità, e le abilità di mindfulness partecipare e agire con efficacia.' },
          { t: 'I miti sulle emozioni.', d: 'Controlla se ci sono miti giudicanti (“alcune emozioni sono stupide”, “c’è un modo giusto di sentirsi”) o la convinzione “io sono le mie emozioni”. Se ci sono: controlla i fatti, confuta i miti, pratica il pensiero non giudicante.' },
        ] },
      ],
    },
    {
      id: 'reg-25', numero: '25', etichetta: 'RIASSUNTO', pagina: 268,
      titolo: 'Riassunto delle abilità di regolazione emotiva',
      blocchi: [
        { voci: [
          { t: 'Riduci la vulnerabilità emotiva:', d: 'accumula emozioni positive, diventa brava nella mastery, gestisci in anticipo, abilità PLEASE.' },
          { t: 'Riduci gli eventi che scatenano emozioni:', d: 'problem solving, distrazione, gestisci le conseguenze, ripeti per le emozioni secondarie.' },
          { t: 'Riduci le reazioni emotive e la forte attivazione:', d: 'abilità di gestione della sofferenza, strategie di sopravvivenza alla crisi, mindfulness delle emozioni del momento.' },
          { t: 'Cambia le reazioni emotive:', d: 'azione opposta (fino in fondo), linguaggio non verbale opposto, parole opposte.' },
          { t: 'Cambia pensieri e interpretazioni sulle emozioni:', d: 'controlla i fatti, denomina e descrivi le emozioni.' },
        ] },
      ],
    },
  ],
};
