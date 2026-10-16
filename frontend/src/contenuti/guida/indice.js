// Indice delle schede del modulo i cui testi arrivano nella prossima fase:
// stessi numeri, titoli e pagine del manuale. Finché una scheda non ha i "blocchi",
// nella Guida compare come "in arrivo".

function indice(idModulo, voci) {
  return voci.map(([numero, titolo, pagina, sezione]) => ({
    id: `${idModulo}-${numero.toLowerCase()}`,
    numero,
    titolo,
    pagina,
    ...(sezione ? { sezione } : {}),
    blocchi: [],
  }));
}

export const SCHEDE_TOLLERANZA = indice('tol', [
  ['1', 'Obiettivi della tolleranza della sofferenza', 321],
  ['2', 'Panoramica: abilità di sopravvivenza alla crisi', 325, 'Sopravvivere alla crisi'],
  ['3', 'Quando usare le abilità di sopravvivenza alla crisi', 326],
  ['4', 'L’abilità STOP', 327],
  ['5', 'Abilità dei pro e contro', 328],
  ['6', 'Abilità TIP: cambiare la chimica del corpo', 329],
  ['6A', 'Guida all’utilizzo dell’acqua fredda', 330],
  ['6B', 'Guida al rilassamento muscolare progressivo', 331],
  ['6C', 'Guida alla riformulazione efficace dei pensieri', 332],
  ['7', 'Distrarsi', 333],
  ['8', 'Autoconsolazione', 334],
  ['8A', 'Guida alla meditazione body scan', 335],
  ['9', 'Migliora il momento presente', 336],
  ['9A', 'Guida alla consapevolezza sensoriale', 337],
  ['10', 'Panoramica: abilità di accettazione della realtà', 341, 'Accettare la realtà'],
  ['11', 'Accettazione radicale', 342],
  ['11A', 'Accettazione radicale: i fattori che interferiscono', 343],
  ['11B', 'Praticare l’accettazione radicale passo dopo passo', 344],
  ['12', 'Orientare la mente', 345],
  ['13', 'Disponibilità', 346],
  ['14', 'Abbozzare un sorriso e mani aperte', 347],
  ['14A', 'Praticare “abbozzare un sorriso” e “mani aperte”', 348],
  ['15', 'Mindfulness dei pensieri del momento', 350],
  ['15A', 'Praticare la mindfulness dei pensieri del momento', 351],
  ['16', 'Panoramica: quando la crisi è la dipendenza', 355, 'Quando la crisi è la dipendenza'],
  ['16A', 'Dipendenze comuni', 356],
  ['17', 'Astinenza dialettica', 357],
  ['17A', 'Programmare l’astinenza dialettica', 358],
  ['18', 'Mente chiara', 359],
  ['18A', 'Pattern comportamentali tipici della mente dipendente e della mente pulita', 360],
  ['19', 'Rinforzo della comunità', 361],
  ['20', 'Bruciare i ponti e costruirne di nuovi', 362],
  ['21', 'Ribellione alternativa e negazione adattiva', 363],
]);
