// La sessione (token + dati dell'utente) sta nel browser: e' l'unico punto
// dell'app che legge e scrive questa chiave.
const CHIAVE = 'marea:sessione';

export function leggiSessione() {
  try {
    const grezzo = localStorage.getItem(CHIAVE);
    return grezzo ? JSON.parse(grezzo) : null;
  } catch {
    return null;
  }
}

export function salvaSessione(sessione) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(sessione));
  } catch {
    // archivio pieno o bloccato: la sessione vale solo finche' la pagina e' aperta
  }
}

export function cancellaSessione() {
  try {
    localStorage.removeItem(CHIAVE);
  } catch {
    // niente da fare
  }
}
