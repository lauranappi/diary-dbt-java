import { useCallback, useEffect, useState } from 'react';
import {
  attivaPromemoria, cambiaOraPromemoria, disattivaPromemoria, iscrizioneAttuale,
  notificaDiProva, oraSalvata, pushSupportato,
} from './push.js';

// Stato e azioni del promemoria giornaliero: { supportato, attivo, ora, occupato, messaggio, ... }
export function usePromemoria() {
  const supportato = pushSupportato();
  const [attivo, setAttivo] = useState(false);
  const [ora, setOra] = useState(oraSalvata);
  const [occupato, setOccupato] = useState(false);
  const [messaggio, setMessaggio] = useState('');

  useEffect(() => {
    if (!supportato) return undefined;
    let annullato = false;
    iscrizioneAttuale()
      .then((i) => { if (!annullato) setAttivo(!!i && Notification.permission === 'granted'); })
      .catch(() => { /* senza service worker il promemoria resta spento */ });
    return () => { annullato = true; };
  }, [supportato]);

  const esegui = useCallback(async (lavoro, dopo) => {
    setOccupato(true);
    setMessaggio('');
    try {
      await lavoro();
      dopo?.();
    } catch (e) {
      setMessaggio(e.message || 'Qualcosa è andato storto, riprova.');
    } finally {
      setOccupato(false);
    }
  }, []);

  const cambiaAttivo = useCallback((acceso) => esegui(
    () => (acceso ? attivaPromemoria(ora) : disattivaPromemoria()),
    () => setAttivo(acceso),
  ), [esegui, ora]);

  const cambiaOra = useCallback((nuova) => {
    setOra(nuova);
    if (attivo && /^\d\d:\d\d$/.test(nuova)) esegui(() => cambiaOraPromemoria(nuova));
  }, [attivo, esegui]);

  const prova = useCallback(() => esegui(notificaDiProva), [esegui]);

  return { supportato, attivo, ora, occupato, messaggio, cambiaAttivo, cambiaOra, prova };
}
