import { chiamata } from './cliente.js';

export const notificheApi = {
  chiavePubblica: async () => (await chiamata('/api/notifiche/chiave-pubblica')).chiave,
  salvaIscrizione: (iscrizione) => chiamata('/api/notifiche/iscrizione', { metodo: 'PUT', corpo: iscrizione }),
  rimuoviIscrizione: (endpoint) =>
    chiamata(`/api/notifiche/iscrizione?endpoint=${encodeURIComponent(endpoint)}`, { metodo: 'DELETE' }),
};
