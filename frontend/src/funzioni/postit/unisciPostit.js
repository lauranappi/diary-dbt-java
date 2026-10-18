// Il documento 'post-it' ha la forma di Marea: { '<chiave>': [{ id, t: testo, c: colore, ts: ultima modifica, d?: 1 }] }
// chiave: 'mod:<modulo>' | 'fg:<foglio>' | (da Marea) 'sk:<abilità>' | 'emo:<emozione>'
// Un post-it tolto resta come "lapide" (d: 1) per 90 giorni, così la cancellazione arriva anche agli altri dispositivi.
const NOVANTA_GIORNI = 90 * 86400000;

export function unisciPostit(locale, remoto, adesso = Date.now()) {
  const limite = adesso - NOVANTA_GIORNI;
  const unito = {};
  const chiavi = new Set([...Object.keys(locale || {}), ...Object.keys(remoto || {})]);
  for (const chiave of chiavi) {
    const per = new Map();
    for (const p of [...(remoto?.[chiave] || []), ...(locale?.[chiave] || [])]) {
      if (!p?.id) continue;
      const gia = per.get(p.id);
      if (!gia || (p.ts || 0) >= (gia.ts || 0)) per.set(p.id, p);
    }
    const lista = [...per.values()].filter((p) => !(p.d && (p.ts || 0) < limite)).sort((a, b) => (b.ts || 0) - (a.ts || 0));
    if (lista.length) unito[chiave] = lista;
  }
  return unito;
}
