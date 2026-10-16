import { MODULI_GUIDA } from '../../contenuti/guida/moduli.js';

const normalizza = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function testiDi(scheda) {
  const pezzi = [scheda.titolo, scheda.etichetta, scheda.numero ? `scheda ${scheda.numero}` : '', ...(scheda.parole || [])];
  for (const b of scheda.blocchi) {
    pezzi.push(b.titolo, b.testo);
    for (const v of b.voci || []) pezzi.push(typeof v === 'string' ? v : `${v.t} ${v.d}`);
  }
  return normalizza(pezzi.filter(Boolean).join(' '));
}

const INDICE = MODULI_GUIDA.flatMap((modulo) => modulo.schede.map((scheda) => ({ modulo, scheda, testo: testiDi(scheda) })));

// Cerca nella Guida: ogni parola scritta deve comparire nella scheda; prima i titoli.
export function cerca(domanda) {
  const parole = normalizza(domanda).split(/\s+/).filter((p) => p.length >= 2);
  if (!parole.length) return [];
  return INDICE
    .filter((voce) => parole.every((p) => voce.testo.includes(p)))
    .map((voce) => ({
      ...voce,
      punti: parole.filter((p) => normalizza(`${voce.scheda.titolo} ${voce.scheda.etichetta || ''}`).includes(p)).length,
    }))
    .sort((a, b) => b.punti - a.punti)
    .slice(0, 30);
}
