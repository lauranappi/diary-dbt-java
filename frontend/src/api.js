// Indirizzo del backend: in sviluppo punta a localhost, in produzione va
// sostituito con l'indirizzo vero del servizio (Render o dove finisce).
const URL_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function prendiToken() {
  return localStorage.getItem('token');
}

function salvaToken(token) {
  localStorage.setItem('token', token);
}

function cancellaToken() {
  localStorage.removeItem('token');
}

// Funzione unica per tutte le chiamate al backend: aggiunge da sola il
// token se presente, e trasforma gli errori del server in eccezioni JS
// leggibili invece di lasciare che sia ogni pagina a gestirli a modo suo.
async function chiamata(percorso, opzioni = {}) {
  const intestazioni = { 'Content-Type': 'application/json', ...opzioni.headers };
  const token = prendiToken();
  if (token) {
    intestazioni['Authorization'] = `Bearer ${token}`;
  }

  const risposta = await fetch(`${URL_BASE}${percorso}`, { ...opzioni, headers: intestazioni });

  if (!risposta.ok) {
    let messaggio = `Errore ${risposta.status}`;
    try {
      const corpo = await risposta.json();
      messaggio = corpo.errore || messaggio;
    } catch {
      // corpo non-JSON, tengo il messaggio generico
    }
    throw new Error(messaggio);
  }

  if (risposta.status === 204) return null; // nessun contenuto (es. scollegamento)
  return risposta.json();
}

export const api = {
  // ── Autenticazione ──
  registrati: (username, password, ruolo) =>
    chiamata('/api/auth/registrati', {
      method: 'POST',
      body: JSON.stringify({ username, password, ruolo }),
    }),

  accedi: (username, password) =>
    chiamata('/api/auth/accedi', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  // ── Diario ──
  salvaMioDiario: (voce) =>
    chiamata('/api/diario/mio', { method: 'POST', body: JSON.stringify(voce) }),

  mioStorico: (da, a) =>
    chiamata(`/api/diario/mio?da=${da}&a=${a}`),

  storicoPaziente: (pazienteId, da, a) =>
    chiamata(`/api/diario/paziente/${pazienteId}?da=${da}&a=${a}`),

  // ── Abilità (catalogo pubblico, non serve token) ──
  abilita: () => chiamata('/api/abilita'),

  // ── Terapeuta ──
  collegaPaziente: (codicePaziente) =>
    chiamata('/api/terapeuta/pazienti', {
      method: 'POST',
      body: JSON.stringify({ codicePaziente }),
    }),

  mieiePazienti: () => chiamata('/api/terapeuta/pazienti'),

  scollegaPaziente: (pazienteId) =>
    chiamata(`/api/terapeuta/pazienti/${pazienteId}`, { method: 'DELETE' }),
};

export { salvaToken, cancellaToken, prendiToken };
