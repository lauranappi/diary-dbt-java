import { compilata } from '../diario/voce.js';
import { aggiungiGiorni, chiave } from '../diario/date.js';
import { ETICHETTE_SCALE } from '../../contenuti/etichette.js';
import { SUGGERIMENTI } from '../../contenuti/suggerimenti.js';

// Le voci arrivano dal server: { data, scale, toggle, testi, abilitaUsate, planner }
const perData = (voci) => new Map(voci.map((v) => [v.data, v]));

// Giorni di fila compilati. La serie finisce oggi, oppure ieri se oggi non e' ancora compilato
// (compilare oggi non deve azzerare la serie di ieri).
export function giorniDiFila(voci, oggi = new Date()) {
  const mappa = perData(voci);
  const compilato = (giorno) => compilata(mappa.get(chiave(giorno)));
  let cursore = compilato(oggi) ? oggi : aggiungiGiorni(oggi, -1);
  let n = 0;
  while (compilato(cursore)) {
    n++;
    cursore = aggiungiGiorni(cursore, -1);
  }
  return n;
}

// Le tre emozioni piu' alte di ieri. Pensieri suicidari e autolesivi restano fuori:
// sono dati delicati che meritano il contesto del Diary o dello Storico.
const EMOZIONI = ['ser', 'gio', 'pau', 'rab', 'tri', 'ver', 'col', 'vuo', 'sf', 'se', 'abb', 'fid'];

export function emozioniDiIeri(voci, oggi = new Date()) {
  const ieri = perData(voci).get(chiave(aggiungiGiorni(oggi, -1)));
  const scale = ieri?.scale || {};
  return EMOZIONI
    .filter((id) => scale[id] != null)
    .map((id) => ({ id, nome: ETICHETTE_SCALE[id], valore: scale[id] }))
    .sort((a, b) => b.valore - a.valore)
    .slice(0, 3);
}

// Gli ultimi sette giorni: altezza della barra secondo quanto e' stato segnato
export function ultimiSetteGiorni(voci, oggi = new Date()) {
  const mappa = perData(voci);
  return Array.from({ length: 7 }, (_, i) => {
    const giorno = aggiungiGiorni(oggi, i - 6);
    const voce = mappa.get(chiave(giorno));
    const piena = compilata(voce);
    const somma = Object.values(voce?.scale || {}).reduce((s, x) => s + (x ?? 0), 0);
    return {
      data: chiave(giorno),
      lettera: 'DLMMGVS'[giorno.getDay()],
      piena,
      oggi: i === 6,
      altezza: piena ? Math.max(14, Math.min(44, 14 + somma * 1.1)) : 8,
    };
  });
}

// Quali suggerimenti valgono per la giornata di oggi, i piu' urgenti per primi
export function suggerimentiPer(voceDiOggi) {
  const voce = voceDiOggi || { scale: {}, toggle: {}, testi: {} };
  return SUGGERIMENTI
    .filter((s) => { try { return s.quando(voce); } catch { return false; } })
    .sort((a, b) => a.priorita - b.priorita);
}

const CHIAVE_ROTAZIONE = 'marea:suggerimento:';

export function indiceSuggerimento(giorno) {
  try {
    return parseInt(localStorage.getItem(CHIAVE_ROTAZIONE + giorno) || '0', 10) || 0;
  } catch {
    return 0;
  }
}

export function ruotaSuggerimento(giorno, totale) {
  try {
    localStorage.setItem(CHIAVE_ROTAZIONE + giorno, String((indiceSuggerimento(giorno) + 1) % totale));
  } catch {
    // senza archivio il suggerimento resta quello di prima
  }
}

export function saluto(ora) {
  if (ora < 5) return 'Notte fonda';
  if (ora < 12) return 'Buongiorno';
  if (ora < 17) return 'Buon pomeriggio';
  if (ora < 21) return 'Buonasera';
  return 'Buonanotte';
}

// La serie piu' lunga di giorni compilati nelle voci che si hanno (anche passata)
export function recordDiFila(voci) {
  const giorni = voci.filter((v) => compilata(v)).map((v) => v.data).sort();
  let record = 0;
  let corrente = 0;
  let precedente = null;
  for (const g of giorni) {
    const atteso = precedente && chiave(aggiungiGiorni(new Date(`${precedente}T12:00:00`), 1));
    corrente = atteso === g ? corrente + 1 : 1;
    record = Math.max(record, corrente);
    precedente = g;
  }
  return record;
}

// Media della sofferenza emotiva negli ultimi quattordici giorni compilati (null se non c'e' nulla)
export function sofferenzaMedia(voci) {
  const valori = voci
    .filter((v) => compilata(v))
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(-14)
    .map((v) => v.scale?.se)
    .filter((x) => x != null);
  return valori.length ? valori.reduce((a, b) => a + b, 0) / valori.length : null;
}

// Quante voci (scale e sì/no) di una giornata hanno una risposta
export function vociCompilate(voce) {
  return Object.keys(voce?.scale || {}).length + Object.keys(voce?.toggle || {}).length;
}
