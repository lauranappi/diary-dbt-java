// I moduli della Guida, nell'ordine del manuale.
import { PARTE_GENERALE } from './parteGenerale.js';
import { MINDFULNESS } from './mindfulness.js';
import { SCHEDE_EFFICACIA, SCHEDE_REGOLAZIONE, SCHEDE_TOLLERANZA } from './indice.js';

export const MODULI_GUIDA = [
  PARTE_GENERALE,
  MINDFULNESS,
  {
    id: 'inter', titolo: 'Efficacia interpersonale', sottotitolo: 'Chiedere, dire no, restare in relazione',
    icona: 'modulo-interpersonale',
    quando: 'Quando vuoi ottenere qualcosa, dire di no, mantenere una relazione o il rispetto di te stessa, o capire se una relazione ti fa bene.',
    schede: SCHEDE_EFFICACIA,
  },
  {
    id: 'reg', titolo: 'Regolazione emotiva', sottotitolo: 'Capire le emozioni e ridurre la vulnerabilità',
    icona: 'modulo-regolazione',
    quando: 'Quando le emozioni sono difficili da capire o da gestire, o per costruire una vita meno esposta alla mente emotiva.',
    schede: SCHEDE_REGOLAZIONE,
  },
  {
    id: 'tol', titolo: 'Tolleranza della sofferenza', sottotitolo: 'Quando la crisi è già in corso',
    icona: 'modulo-tolleranza',
    quando: 'Quando provi un dolore intenso che non puoi alleviare subito, o agiresti sulla spinta dell’emozione peggiorando le cose. Include le abilità per quando la crisi è la dipendenza.',
    schede: SCHEDE_TOLLERANZA,
  },
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
