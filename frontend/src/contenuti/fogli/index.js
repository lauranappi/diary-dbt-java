import { FOGLI_INTERPERSONALE } from './interpersonale.js';
import { FOGLI_MINDFULNESS } from './mindfulness.js';
import { FOGLI_REGOLAZIONE } from './regolazione.js';
import { FOGLI_GENERALI, FOGLI_REGOLAZIONE_SPECIALI } from './speciali.js';
import { FOGLI_TOLLERANZA } from './tolleranza.js';

// Nello stesso ordine dei moduli della Guida
export const GRUPPI_FOGLI = [
  { id: 'pg', nome: 'Parte generale', fogli: FOGLI_GENERALI },
  { id: 'mind', nome: 'Mindfulness', fogli: FOGLI_MINDFULNESS },
  { id: 'reg', nome: 'Regolazione emotiva', fogli: [...FOGLI_REGOLAZIONE_SPECIALI, ...FOGLI_REGOLAZIONE] },
  { id: 'inter', nome: 'Efficacia interpersonale', fogli: FOGLI_INTERPERSONALE },
  { id: 'tol', nome: 'Tolleranza della sofferenza', fogli: FOGLI_TOLLERANZA },
];

export const TUTTI_I_FOGLI = GRUPPI_FOGLI.flatMap((g) => g.fogli);
export const trovaFoglio = (id) => TUTTI_I_FOGLI.find((f) => f.id === id) ?? null;
