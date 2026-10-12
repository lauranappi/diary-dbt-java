import { chiamata } from './cliente.js';

export const profiloApi = {
  // Cambia nome e cognome; il server risponde con i valori salvati
  modifica: (nome, cognome) => chiamata('/api/profilo', { metodo: 'PUT', corpo: { nome, cognome } }),
  // La paziente indica (o toglie) la propria terapeuta con il suo username
  collegaTerapeuta: (codiceTerapeuta) =>
    chiamata('/api/paziente/terapeuta', { metodo: 'PUT', corpo: { codiceTerapeuta } }),
  scollegaTerapeuta: () => chiamata('/api/paziente/terapeuta', { metodo: 'DELETE' }),
};
