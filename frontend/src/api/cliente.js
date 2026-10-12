import { leggiSessione } from './sessione.js';

// Indirizzo del backend: in sviluppo localhost, in produzione quello del servizio.
const URL_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class ErroreApi extends Error {
  constructor(messaggio, stato, corpo) {
    super(messaggio);
    this.stato = stato;
    this.corpo = corpo;
  }
}

let quandoSessioneScaduta = () => {};

// L'app registra qui cosa fare quando il server non riconosce piu' il token
export function alleSessioneScaduta(funzione) {
  quandoSessioneScaduta = funzione;
}

// Unica porta d'accesso al backend: aggiunge il token, trasforma le risposte
// in dati JS e gli errori in ErroreApi con il messaggio del server.
export async function chiamata(percorso, { metodo = 'GET', corpo } = {}) {
  const intestazioni = { Accept: 'application/json' };
  if (corpo !== undefined) intestazioni['Content-Type'] = 'application/json';

  const sessione = leggiSessione();
  if (sessione?.token) intestazioni.Authorization = `Bearer ${sessione.token}`;

  let risposta;
  try {
    risposta = await fetch(`${URL_BASE}${percorso}`, {
      method: metodo,
      headers: intestazioni,
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
  } catch {
    throw new ErroreApi('Server non raggiungibile', 0, null);
  }

  if (risposta.status === 204) return null;

  let dati = null;
  try {
    dati = await risposta.json();
  } catch {
    // risposta senza corpo JSON
  }

  if (!risposta.ok) {
    // Il server risponde 403 senza messaggio quando il token manca o e' scaduto
    if (risposta.status === 403 && !dati?.errore && sessione?.token) quandoSessioneScaduta();
    throw new ErroreApi(dati?.errore || `Errore ${risposta.status}`, risposta.status, dati);
  }
  return dati;
}
