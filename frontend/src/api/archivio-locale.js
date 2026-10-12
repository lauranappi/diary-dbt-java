// Copia dei documenti nel browser: l'app si apre subito e funziona anche
// senza rete. "modificato" = c'e' una modifica non ancora arrivata al server.
function chiaveArchivio(utenteId, chiave) {
  return `marea:doc:${utenteId}:${chiave}`;
}

export function leggiLocale(utenteId, chiave) {
  try {
    const grezzo = localStorage.getItem(chiaveArchivio(utenteId, chiave));
    return grezzo ? JSON.parse(grezzo) : null;
  } catch {
    return null;
  }
}

export function scriviLocale(utenteId, chiave, { contenuto, versione, modificato }) {
  try {
    localStorage.setItem(
      chiaveArchivio(utenteId, chiave),
      JSON.stringify({ contenuto, versione, modificato }),
    );
  } catch {
    // archivio pieno: il dato resta in memoria e verra' inviato al server
  }
}
