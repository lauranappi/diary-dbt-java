import { useCallback, useEffect, useRef, useState } from 'react';
import { diarioApi } from '../../api/diario.js';
import { leggiSessione } from '../../api/sessione.js';
import { cancellaBozza, leggiBozza, scriviBozza } from './bozza.js';
import { conValore, daRisposta } from './voce.js';

function inizio(utenteId, giorno) {
  const bozza = leggiBozza(utenteId, giorno);
  return bozza
    ? { giorno, voce: bozza, caricamento: false, stato: 'modificato' }
    : { giorno, voce: daRisposta(null), caricamento: true, stato: 'salvato' };
}

// Il diary di un giorno come stato React.
//   { voce, caricamento, stato, imposta(parte, id, valore), salva(), haModifiche() }
// stato: 'salvato' | 'modificato' | 'errore'
// Ogni modifica va subito in una bozza locale; salva() la invia al server.
export function useGiorno(giorno, quandoSalvato) {
  const utenteId = leggiSessione()?.utente?.id;
  const [dati, setDati] = useState(() => inizio(utenteId, giorno));
  const ultimo = useRef(dati);

  // Cambiato giorno: si riparte dalla bozza di quel giorno (o da un giorno vuoto da caricare)
  if (dati.giorno !== giorno) setDati(inizio(utenteId, giorno));

  useEffect(() => {
    ultimo.current = dati;
  });

  const daCaricare = dati.giorno === giorno && dati.caricamento;
  useEffect(() => {
    if (!daCaricare) return undefined;
    let annullato = false;
    diarioApi
      .intervallo(giorno, giorno)
      .then((voci) => {
        if (!annullato) setDati((d) => (d.giorno === giorno ? { ...d, voce: daRisposta(voci[0]) } : d));
      })
      .catch(() => { /* senza rete si parte da un giorno vuoto: la bozza non si perde */ })
      .finally(() => {
        if (!annullato) setDati((d) => (d.giorno === giorno ? { ...d, caricamento: false } : d));
      });
    return () => { annullato = true; };
  }, [daCaricare, giorno]);

  const imposta = useCallback((parte, id, valore) => {
    const nuova = conValore(ultimo.current.voce, parte, id, valore);
    ultimo.current = { ...ultimo.current, voce: nuova, stato: 'modificato' };
    setDati(ultimo.current);
    scriviBozza(utenteId, giorno, nuova);
  }, [giorno, utenteId]);

  const salva = useCallback(async () => {
    try {
      await diarioApi.salva({ data: giorno, ...ultimo.current.voce });
      cancellaBozza(utenteId, giorno);
      ultimo.current = { ...ultimo.current, stato: 'salvato' };
      setDati(ultimo.current);
      quandoSalvato?.();
      return true;
    } catch {
      ultimo.current = { ...ultimo.current, stato: 'errore' };
      setDati(ultimo.current);
      return false;
    }
  }, [giorno, utenteId, quandoSalvato]);

  const haModifiche = useCallback(() => ultimo.current.stato !== 'salvato', []);

  return { voce: dati.voce, caricamento: dati.caricamento, stato: dati.stato, imposta, salva, haModifiche };
}
