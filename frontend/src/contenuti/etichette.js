// I nomi con cui i dati del diary si mostrano nello storico e nel dettaglio del giorno.

export const ETICHETTE_SCALE = {
  sp: 'Pensieri suicidari', ai: 'Intenzione autolesività', ser: 'Serenità', gio: 'Gioia',
  pau: 'Paura', rab: 'Rabbia', tri: 'Tristezza', ver: 'Vergogna', col: 'Colpa', vuo: 'Vuoto',
  sf: 'Sofferenza fisica', se: 'Sofferenza emotiva', abb: 'Abbandonare la terapia',
  fid: 'Fiducia nel cambiamento', atti: 'Attività piacevoli (intenzione)',
  alci: 'Alcol (intenzione)', cbdi: 'CBD (intenzione)', rap: 'Rapporti occasionali',
};

export const ETICHETTE_SINO = {
  sa: 'Azione suicidaria', aa: 'Azione autolesività', ee: 'Emotional eating', farm: 'Farmaci prescritti',
};

export const ETICHETTE_TESTI = {
  rim: 'Rimuginio', att: 'Attività piacevoli / sociali', note: 'Note libere',
  alcu: 'Uso alcol', cbdu: 'Uso CBD', rap: 'Rapporti occasionali (dettagli)',
};

// Per queste scale un valore alto e' una buona notizia
export const SCALE_POSITIVE = new Set(['ser', 'gio', 'fid', 'sf', 'atti']);

// Colore della barra: dipende dal valore e dal fatto che alto sia bene o male
export function coloreScala(valore, positiva) {
  if (positiva) return valore >= 4 ? '#1B4B4A' : valore >= 2 ? '#4E7B79' : valore >= 1 ? '#F5CE47' : '#C6DAD7';
  return valore >= 4 ? '#C1714A' : valore >= 3 ? '#F5CE47' : valore >= 1 ? '#1B4B4A' : '#C6DAD7';
}

export const SCALE_RISCHIO = ['sp', 'ai', 'alci', 'cbdi', 'rap', 'atti'];
export const SINO_RISCHIO = ['sa', 'aa', 'ee', 'farm'];
export const TESTI_RISCHIO = ['alcu', 'cbdu'];
export const SCALE_EMOZIONI = ['ser', 'gio', 'pau', 'rab', 'tri', 'ver', 'col', 'vuo', 'sf', 'se', 'abb', 'fid'];
