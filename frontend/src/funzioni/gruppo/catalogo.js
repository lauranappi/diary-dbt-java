import { trovaFoglio, GRUPPI_FOGLI, TUTTI_I_FOGLI } from '../../contenuti/fogli/index.js';
import { MODULI_GUIDA, trovaScheda } from '../../contenuti/guida/moduli.js';
import { anteprima } from '../fogli/riassunto.js';

// Ambiti di Marea: la Parte generale si chiama 'gen'
const AMBITO_DI_GRUPPO = { pg: 'gen', mind: 'mind', reg: 'reg', inter: 'inter', tol: 'tol' };
const dataBreve = (ts) => new Date(ts).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });

// Tutto ciò a cui si può collegare una pagina del manuale: prima i fogli già compilati (uno per uno),
// poi i fogli vuoti e le schede della Guida. Chiavi: 'fe:<foglio>:<compilato>' | 'fg:<foglio>' | 'gs:<scheda>'.
export function costruisciCatalogo(compilati) {
  const voci = [];
  for (const foglio of TUTTI_I_FOGLI) {
    for (const c of compilati(foglio.id)) {
      const ant = anteprima(foglio, c.v);
      voci.push({ k: `fe:${foglio.id}:${c.id}`, n: `${foglio.titolo} · ${dataBreve(c.ts)}${ant && ant !== '(vuoto)' ? ` · ${String(ant).slice(0, 40)}` : ''}`, tipo: 'Compilato', extra: `${foglio.titolo} ${ant} ${dataBreve(c.ts)}` });
    }
  }
  for (const foglio of TUTTI_I_FOGLI) voci.push({ k: `fg:${foglio.id}`, n: foglio.titolo, tipo: 'Foglio vuoto', extra: `${foglio.titolo} ${foglio.riferimento}` });
  for (const modulo of MODULI_GUIDA) {
    for (const s of modulo.schede) {
      voci.push({ k: `gs:${s.id}`, n: s.titolo, tipo: 'Scheda', extra: `${modulo.titolo} scheda ${s.numero} ${s.etichetta || ''} ${s.pagina ? `p ${s.pagina} pag ${s.pagina} pagina ${s.pagina}` : ''}` });
    }
  }
  return voci;
}

export function ambitoCollegamento(k) {
  const [tipo, id] = String(k || '').split(':');
  if (tipo === 'fg' || tipo === 'fe') {
    const gruppo = GRUPPI_FOGLI.find((g) => g.fogli.some((f) => f.id === id));
    return gruppo ? AMBITO_DI_GRUPPO[gruppo.id] : '';
  }
  if (tipo === 'gs') return AMBITO_DI_GRUPPO[trovaScheda(id)?.modulo.id] ?? '';
  return '';
}

// Dove porta un collegamento: la pagina dell'app, oppure null (collegamenti di Marea, solo testo)
export function destinazione(k) {
  const [tipo, id, voce] = String(k || '').split(':');
  if (tipo === 'fe' && trovaFoglio(id)) return `/fogli/${id}?voce=${voce}`;
  if (tipo === 'fg' && trovaFoglio(id)) return `/fogli/${id}`;
  if (tipo === 'gs') {
    const t = trovaScheda(id);
    if (t) return `/guida/${t.modulo.id}?scheda=${id}`;
  }
  return null;
}

export const etichettaApertura = (k) => (String(k).startsWith('gs:') ? 'Apri la scheda: ' : 'Apri il foglio: ');
