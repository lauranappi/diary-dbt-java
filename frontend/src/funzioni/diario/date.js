const GIORNI_CORTI = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];

// Giorno nel formato del server (AAAA-MM-GG), secondo l'ora locale del dispositivo
export function chiave(data) {
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const g = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${m}-${g}`;
}

export function daChiave(testo) {
  const [a, m, g] = testo.split('-').map(Number);
  return new Date(a, m - 1, g);
}

export function aggiungiGiorni(data, n) {
  const d = new Date(data);
  d.setDate(d.getDate() + n);
  return d;
}

export function eFuturo(data, adesso = new Date()) {
  return chiave(data) > chiave(adesso);
}

export function giorniRecenti(quanti, adesso = new Date()) {
  return Array.from({ length: quanti }, (_, i) => aggiungiGiorni(adesso, i - (quanti - 1)));
}

export function giornoCorto(data) {
  return GIORNI_CORTI[data.getDay()];
}

export function titoloGiorno(data, adesso = new Date()) {
  if (chiave(data) === chiave(adesso)) return 'Diary di oggi';
  if (chiave(data) === chiave(aggiungiGiorni(adesso, -1))) return 'Diary di ieri';
  return `Diary di ${data.toLocaleDateString('it-IT', { weekday: 'long' })}`;
}

export function dataLunga(data) {
  return data.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
}
