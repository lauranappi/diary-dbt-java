import { compilata } from '../diario/voce.js';
import { aggiungiGiorni, chiave } from '../diario/date.js';

// Le voci arrivano dal server cosi': { data, scale, toggle, testi, abilitaUsate, planner }

// Solo i giorni in cui c'e' qualcosa di compilato, dal piu' recente, nel periodo scelto
// (giorni = 0 significa tutti). Al massimo 60, come in Marea.
export function vociDelPeriodo(voci, giorni, oggi = new Date()) {
  const dal = giorni === 0 ? '' : chiave(aggiungiGiorni(oggi, -(giorni - 1)));
  return voci
    .filter((v) => compilata(v) && v.data >= dal)
    .sort((a, b) => (a.data < b.data ? 1 : -1))
    .slice(0, 60);
}

const conta = (voci, condizione) => voci.filter(condizione).length;
const pieno = (testo) => !!testo && testo.trim() !== '';

// I numeri della griglia dello storico
export function riepilogo(voci) {
  const sommaRapporti = voci.reduce((somma, v) => somma + Math.max(v.scale?.rap ?? 0, 0), 0);
  const abilita = voci.reduce((somma, v) => somma + Object.values(v.abilitaUsate || {}).filter(Boolean).length, 0);
  return {
    giorniCompilati: voci.length,
    azioniSuicidarie: conta(voci, (v) => v.toggle?.sa === 'Sì'),
    azioniAutolesive: conta(voci, (v) => v.toggle?.aa === 'Sì'),
    giorniAlcol: conta(voci, (v) => pieno(v.testi?.alcu)),
    giorniCbd: conta(voci, (v) => pieno(v.testi?.cbdu)),
    emotionalEating: conta(voci, (v) => v.toggle?.ee === 'Sì'),
    // si contano solo i giorni compilati in cui la risposta e' "No": senza diary non si sa cosa sia successo
    farmaciSaltati: conta(voci, (v) => v.toggle?.farm === 'No'),
    rapporti: sommaRapporti,
    abilita,
  };
}

// Le etichette brevi che si vedono accanto a ogni giornata
export function etichetteGiorno(voce) {
  const s = voce.scale || {};
  const t = voce.toggle || {};
  const x = voce.testi || {};
  const e = [];
  if (t.sa === 'Sì') e.push('Azione suicidaria');
  if (s.sp >= 3) e.push(`Pensieri suic. ${s.sp}`);
  if (t.aa === 'Sì') e.push('Azione autolesività');
  if (s.ai >= 3) e.push(`Autolesività ${s.ai}`);
  if (pieno(x.alcu)) e.push(x.alcu);
  if (pieno(x.cbdu)) e.push(`CBD: ${x.cbdu}`);
  if (t.ee === 'Sì') e.push('Emotional eating');
  if (s.rap > 0) e.push(`Rapporti: ${s.rap}`);
  if (t.farm === 'Sì') e.push('Farmaci');
  return e;
}

// I giorni da mettere nei grafici, dal piu' vecchio. Se nel periodo non c'e' niente si
// mostrano comunque le ultime N voci, cosi' il grafico non resta vuoto.
export function vociPerGrafici(voci, giorni, oggi = new Date()) {
  const tutte = voci.filter(compilata).sort((a, b) => (a.data < b.data ? -1 : 1));
  if (giorni === 0) return tutte;
  const dal = chiave(aggiungiGiorni(oggi, -(giorni - 1)));
  const nelPeriodo = tutte.filter((v) => v.data >= dal);
  return nelPeriodo.length ? nelPeriodo : tutte.slice(-giorni);
}

export const serieScala = (voci, id) => voci.map((v) => v.scale?.[id] ?? null);
export const serieSino = (voci, id) => voci.map((v) => (v.toggle?.[id] === 'Sì' ? 1 : 0));
