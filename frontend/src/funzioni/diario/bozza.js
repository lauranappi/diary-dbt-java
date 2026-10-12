// Bozza locale di un giorno: ogni modifica si salva subito nel browser, cosi'
// non si perde nulla se manca la rete o si chiude l'app prima di salvare.
function chiaveBozza(utenteId, giorno) {
  return `marea:bozza:${utenteId}:${giorno}`;
}

export function leggiBozza(utenteId, giorno) {
  try {
    const grezzo = localStorage.getItem(chiaveBozza(utenteId, giorno));
    return grezzo ? JSON.parse(grezzo) : null;
  } catch {
    return null;
  }
}

export function scriviBozza(utenteId, giorno, voce) {
  try {
    localStorage.setItem(chiaveBozza(utenteId, giorno), JSON.stringify(voce));
  } catch {
    // archivio pieno: la modifica resta in memoria
  }
}

export function cancellaBozza(utenteId, giorno) {
  try {
    localStorage.removeItem(chiaveBozza(utenteId, giorno));
  } catch {
    // niente da fare
  }
}
