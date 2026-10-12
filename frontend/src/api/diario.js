import { chiamata } from './cliente.js';

// Le voci del diario sul server (una per giorno). Il salvataggio e' parziale:
// le parti non inviate (es. planner, abilita') restano com'erano.
export const diarioApi = {
  salva: (voce) => chiamata('/api/diario/mio', { metodo: 'POST', corpo: voce }),
  intervallo: (da, a) => chiamata(`/api/diario/mio?da=${da}&a=${a}`),
};
