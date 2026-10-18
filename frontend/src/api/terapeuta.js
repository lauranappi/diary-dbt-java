import { chiamata } from './cliente.js';

// Lato terapeuta: le pazienti collegate e i loro diari (solo lettura).
export const terapeutaApi = {
  pazienti: () => chiamata('/api/terapeuta/pazienti'),
  voci: (pazienteId, da, a) => chiamata(`/api/diario/paziente/${pazienteId}?da=${da}&a=${a}`),
  // i documenti condivisi della paziente (fogli di lavoro...): { fogli: { contenuto, versione, ... } }
  documenti: (pazienteId) => chiamata(`/api/terapeuta/pazienti/${pazienteId}/documenti`),
};
