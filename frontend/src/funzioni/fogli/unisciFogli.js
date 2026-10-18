import { adattaMarea } from './adattaMarea.js';

// Il documento 'fogli' ha la stessa forma di Marea:
//   { generici: { '<idFoglio>': [{ id, ts, m?, v: {campo: valore} }] }, cancellati: { '<idFoglio>:<id>': ts }, ...altri fogli }
// "cancellati" ricorda gli eliminati: senza, un foglio tolto qui tornerebbe da un dispositivo che lo ha ancora.
const NOVANTA_GIORNI = 90 * 86400000;

export const pienoDiTesto = (piano) => !!piano && Object.values(piano).some((x) => typeof x === 'string' && x.trim());

export const FOGLI_VUOTI = { generici: {}, cancellati: {} };

const piuRecente = (a, b) => (a.m ?? a.ts ?? 0) >= (b.m ?? b.ts ?? 0);

function unisciLista(locale = [], remoto = [], cancellati, idFoglio) {
  const per = new Map();
  for (const voce of [...remoto, ...locale]) {
    if (!voce?.id || cancellati[`${idFoglio}:${voce.id}`]) continue;
    const gia = per.get(voce.id);
    if (!gia || piuRecente(voce, gia)) per.set(voce.id, voce);
  }
  return [...per.values()].sort((a, b) => b.ts - a.ts);
}

export function unisciFogli(localeGrezzo, remotoGrezzo, adesso = Date.now()) {
  const locale = adattaMarea(localeGrezzo);
  const remoto = adattaMarea(remotoGrezzo);
  const cancellati = {};
  for (const fonte of [remoto?.cancellati, locale?.cancellati]) {
    for (const [k, t] of Object.entries(fonte || {})) {
      if (t > adesso - NOVANTA_GIORNI && t > (cancellati[k] ?? 0)) cancellati[k] = t;
    }
  }
  const generici = {};
  const ids = new Set([...Object.keys(remoto?.generici || {}), ...Object.keys(locale?.generici || {})]);
  for (const id of ids) {
    const lista = unisciLista(locale?.generici?.[id], remoto?.generici?.[id], cancellati, id);
    if (lista.length) generici[id] = lista;
  }
  // gli altri fogli (controllaFatti, proContro...) restano come sono: li gestiscono altre schermate
  // il piano di crisi è un documento unico: vale quello di questo dispositivo, se ha qualcosa scritto
  const pianoCrisi = pienoDiTesto(locale?.pianoCrisi) ? locale.pianoCrisi : (remoto?.pianoCrisi ?? locale?.pianoCrisi);
  return { ...(remoto || {}), ...(locale || {}), generici, cancellati, ...(pianoCrisi ? { pianoCrisi } : {}) };
}

export const nuovoIdFoglio = () => `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;
