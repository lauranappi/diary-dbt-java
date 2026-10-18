import { area, scala, scelta, testo, titolo } from './campi.js';

const DA_0_A_5 = ['0', '1', '2', '3', '4', '5'];

// I fogli che in Marea erano schermate a sé (controlla i fatti, pro e contro, diario delle emozioni, catena).
// Qui sono fogli come gli altri; i dati salvati da Marea si adattano in funzioni/fogli/adattaMarea.js.

export const FOGLI_GENERALI = [
  {
    id: 'g-pro-contro',
    titolo: 'Pro e contro dell’usare le abilità',
    riferimento: 'Parte generale · Foglio di lavoro 1, p. 27',
    intro: 'Qual è il modo più efficace per ottenere ciò che vuoi? Sono i tuoi obiettivi, non quelli di altri.',
    campi: [
      titolo('La situazione'),
      area('situazione', 'Descrivi la situazione o il problema'),
      titolo('Il tuo obiettivo'),
      area('obiettivo', 'Cosa vuoi ottenere in questa situazione'),
      titolo('Praticare le abilità'),
      area('usarePro', 'Pro: vantaggi del praticare le abilità'),
      area('usareContro', 'Contro: svantaggi del praticare le abilità'),
      titolo('Non praticare le abilità'),
      area('nonPro', 'Pro: vantaggi del non praticarle, o del cedere all’impulso'),
      area('nonContro', 'Contro: svantaggi del non praticarle'),
    ],
  },
  {
    id: 'g-catena',
    titolo: 'Analisi a catena',
    riferimento: '',
    intro: 'Ripercorri passo per passo cosa è successo: cosa ha innescato la catena, cosa è venuto dopo e dove avresti potuto intervenire.',
    campi: [
      area('comportamento', 'Comportamento problematico (cosa hai fatto esattamente?)'),
      area('vulnerabilita', 'Fattori di vulnerabilità (poco sonno, fame, conflitti, stress...)'),
      area('evento', 'Evento scatenante (cosa ha innescato la catena?)'),
      area('catena', 'La catena (pensieri → emozioni → azioni, passo per passo)'),
      area('conseguenze', 'Conseguenze (immediate e a lungo termine)'),
      area('intervento', 'Dove avresti potuto intervenire? Quale abilità usare?'),
    ],
  },
];

export const FOGLI_REGOLAZIONE_SPECIALI = [
  {
    id: 'r-controlla-fatti',
    titolo: 'Controlla i fatti',
    riferimento: 'Regolazione emotiva · Scheda 8 e Foglio di lavoro 5, pp. 228, 285',
    intro: 'L’emozione corrisponde ai fatti, o all’interpretazione dei fatti? Per ogni passo, controlla i fatti: cerca estremizzazioni o giudizi e riscrivi in modo più accurato.',
    campi: [
      titolo('1. Quale emozione voglio cambiare?'),
      testo('emozione', 'Nome dell’emozione', 'Nome dell’emozione'),
      scala('prima', 'Intensità prima (0-100)'),
      scala('dopo', 'Intensità dopo (0-100)'),
      titolo('2. Qual è l’evento scatenante?'),
      area('evento', 'Chi ha fatto cosa a chi? Cosa ha causato cosa? Qual è l’aspetto problematico per te?', 'Descrivi l’evento come lo hai osservato'),
      area('eventoFatti', 'Controlla i fatti: riscrivi i fatti, senza giudizi', 'Riscrivi i fatti, senza giudizi'),
      titolo('3. Quali sono le mie interpretazioni?'),
      area('interpretazioni', 'Cosa sto dando per scontato? Sto aggiungendo interpretazioni ai fatti?', 'Pensieri, credenze, assunti'),
      area('alternative', 'Controlla i fatti: elenca quante più interpretazioni alternative riesci', 'Altre interpretazioni possibili'),
      area('interpretazioniFatti', 'L’interpretazione più verosimile o più utile', 'Interpretazione più verosimile o più utile'),
      titolo('4. Esiste una minaccia?'),
      area('minaccia', 'Cosa di questo evento mi mette in pericolo? Quali conseguenze temo?', 'Dai un nome alla minaccia'),
      area('esiti', 'Controlla i fatti: elenca quanti più esiti alternativi ti vengono in mente', 'Altri esiti possibili'),
      area('minacciaFatti', 'Una conseguenza non catastrofica e verosimile', 'Conseguenza non catastrofica verosimile'),
      titolo('5. Qual è la catastrofe?'),
      area('catastrofe', 'Descrivi la conseguenza peggiore che ci si può ragionevolmente aspettare', 'La catastrofe temuta'),
      area('affrontare', 'Come potrei affrontarla, se accadesse davvero?', 'Come potrei affrontarla, se accadesse davvero'),
      area('verifica', 'Cosa ho fatto per controllare i fatti?', 'Cosa ho fatto per controllare i fatti'),
      titolo('6. L’emozione corrisponde ai fatti?'),
      scelta('corrisponde', '0 = no, per niente · 5 = certamente', DA_0_A_5),
    ],
  },
  {
    id: 'r-diario-emozioni',
    titolo: 'Diario delle emozioni',
    riferimento: '',
    intro: 'Un episodio emotivo, con la sua intensità, cosa l’ha scatenato, cosa ti dicevi e cosa avresti potuto fare diversamente.',
    campi: [
      testo('emozione', 'Che emozione hai provato? (quella più forte, più lunga o più dolorosa)', 'Es. tristezza, rabbia, paura...'),
      scelta('intensita', 'Quanto era intensa? (0-5)', DA_0_A_5),
      area('evento', 'Cosa ha scatenato l’emozione? (solo fatti osservabili)', 'Es. Il mio ragazzo non ha risposto ai messaggi per 3 ore.'),
      area('pensieri', 'Cosa ti stavi dicendo? (interpretazioni, pensieri automatici)', 'Es. Non gli importa di me. Mi sta ignorando di proposito.'),
      area('messaggio', 'Cosa ti stava dicendo l’emozione?', 'Es. Che sono sola. Che non valgo abbastanza.'),
      area('azioni', 'Come hai reagito? (azioni, comportamenti)', 'Es. Ho smesso di rispondere, mi sono isolata.'),
      area('fatti', 'Hai controllato i fatti? (interpretazioni alternative)', 'Es. Forse era semplicemente occupato. Non ho prove che mi stia ignorando.'),
      area('diverso', 'Cosa avresti potuto fare diversamente?', 'Es. Aspettare senza catastrofizzare. Usare TIP per calmarmi.'),
    ],
  },
];
