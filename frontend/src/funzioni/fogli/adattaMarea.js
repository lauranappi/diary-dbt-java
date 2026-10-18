// In Marea questi quattro fogli avevano un elenco proprio nel documento 'fogli' (controllaFatti, proContro,
// diarioEmozioni, catena). Qui sono fogli come gli altri, dentro 'generici'. Questa funzione porta i dati
// vecchi nella forma nuova; si può chiamare più volte sullo stesso documento.

const ELENCHI = [
  { vecchio: 'controllaFatti', foglio: 'r-controlla-fatti', lapide: 'cf_fogli', chiavi: (k) => k.replace(/^cf-int-/, 'cf-').replace(/^cf-/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase()) },
  { vecchio: 'proContro', foglio: 'g-pro-contro', lapide: 'pc2_fogli', chiavi: (k) => k.replace(/^pc2-/, '').replace(/-(\w)/g, (_, c) => c.toUpperCase()) },
  { vecchio: 'diarioEmozioni', foglio: 'r-diario-emozioni', lapide: 'diario_emo', chiavi: (k) => k },
  { vecchio: 'catena', foglio: 'g-catena', lapide: 'catena_list', chiavi: (k) => k },
];
const NON_SONO_RISPOSTE = new Set(['id', 'data']);

function converti(elemento, rinomina) {
  const grezzo = Number(elemento.id);
  const ts = grezzo > 1e11 ? grezzo : Date.parse(elemento.data) || 0;
  const v = {};
  for (const [k, x] of Object.entries(elemento)) {
    if (NON_SONO_RISPOSTE.has(k) || x == null || x === '') continue;
    v[rinomina(k)] = k === 'corrisponde' || k === 'intensita' ? String(x) : x;
  }
  return { id: String(elemento.id), ts, v };
}

export function adattaMarea(documento) {
  if (!documento || !ELENCHI.some((e) => Array.isArray(documento[e.vecchio]))) return documento;
  const risultato = { ...documento, generici: { ...(documento.generici || {}) }, cancellati: { ...(documento.cancellati || {}) } };
  for (const e of ELENCHI) {
    if (!Array.isArray(documento[e.vecchio])) continue;
    const gia = risultato.generici[e.foglio] || [];
    const presenti = new Set(gia.map((x) => x.id));
    const nuovi = documento[e.vecchio].filter((x) => x && x.id != null).map((x) => converti(x, e.chiavi)).filter((x) => !presenti.has(x.id));
    risultato.generici[e.foglio] = [...gia, ...nuovi].sort((a, b) => b.ts - a.ts);
    delete risultato[e.vecchio];
  }
  for (const [k, t] of Object.entries(risultato.cancellati)) {
    const e = ELENCHI.find((x) => k.startsWith(`${x.lapide}:`));
    if (e) {
      delete risultato.cancellati[k];
      risultato.cancellati[`${e.foglio}:${k.slice(e.lapide.length + 1)}`] = t;
    }
  }
  // un foglio cancellato in Marea non deve tornare dai dati importati
  for (const [foglio, lista] of Object.entries(risultato.generici)) {
    risultato.generici[foglio] = lista.filter((x) => !risultato.cancellati[`${foglio}:${x.id}`]);
  }
  return risultato;
}
