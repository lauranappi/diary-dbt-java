// I moduli della Guida, nell'ordine del manuale.
import { PARTE_GENERALE } from './parteGenerale.js';
import { MINDFULNESS } from './mindfulness.js';
import { EFFICACIA } from './efficacia.js';
import { REGOLAZIONE } from './regolazione.js';
import { TOLLERANZA } from './tolleranza.js';

export const MODULI_GUIDA = [
  PARTE_GENERALE,
  MINDFULNESS,
  EFFICACIA,
  REGOLAZIONE,
  TOLLERANZA,
];

export const trovaModulo = (id) => MODULI_GUIDA.find((m) => m.id === id);
export const trovaScheda = (idScheda) => {
  for (const modulo of MODULI_GUIDA) {
    const scheda = modulo.schede.find((s) => s.id === idScheda);
    if (scheda) return { modulo, scheda };
  }
  return null;
};
export const haTesto = (scheda) => scheda.blocchi.length > 0;
