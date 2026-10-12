import { chiamata } from './cliente.js';

export const autenticazioneApi = {
  accedi: (username, password) =>
    chiamata('/api/auth/accedi', { metodo: 'POST', corpo: { username, password } }),

  registra: (dati) => chiamata('/api/auth/registrati', { metodo: 'POST', corpo: dati }),
};
