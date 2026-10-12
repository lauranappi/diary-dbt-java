import { ConflittoVersione, documentiApi } from './documenti.js';

const TENTATIVI_MASSIMI = 4;

// Porta d'accordo copia locale e server per un documento.
//   locale:  { contenuto, versione, modificato } oppure null
//   unisci:  (locale, remoto) => contenuto unito, quando entrambi sono cambiati
// Restituisce { contenuto, versione, modificato }. Se il server non risponde
// l'errore risale a chi chiama, e la copia locale resta "modificato".
export async function sincronizza(chiave, locale, unisci) {
  let remoto = await documentiApi.leggi(chiave);

  for (let tentativo = 0; tentativo < TENTATIVI_MASSIMI; tentativo++) {
    if (!locale?.modificato) {
      // niente da inviare: vale quello che c'e' sul server
      return remoto
        ? { contenuto: remoto.contenuto, versione: remoto.versione, modificato: false }
        : locale || null;
    }

    const contenuto = remoto ? unisci(locale.contenuto, remoto.contenuto) : locale.contenuto;
    try {
      const salvato = await documentiApi.salva(chiave, contenuto, remoto ? remoto.versione : 0);
      return { contenuto, versione: salvato.versione, modificato: false };
    } catch (e) {
      if (!(e instanceof ConflittoVersione)) throw e;
      remoto = e.attuale; // qualcun altro ha scritto nel frattempo: si unisce di nuovo
      locale = { ...locale, contenuto };
    }
  }
  throw new Error('Impossibile sincronizzare: troppe modifiche concorrenti');
}
