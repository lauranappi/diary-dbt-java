import { useCallback, useEffect, useRef, useState } from 'react';
import { leggiLocale, scriviLocale } from './archivio-locale.js';
import { sincronizza } from './sincronizzatore.js';
import { leggiSessione } from './sessione.js';

const ATTESA_INVIO_MS = 800;
const prevalgonoIDatiDelServer = (_locale, remoto) => remoto;

// Un documento personale (impostazioni, post-it, preferiti...) come stato React.
//   const { valore, imposta, stato } = useDocumento('impostazioni', { predefinito: {...} })
// - parte subito dalla copia nel browser, poi si allinea al server;
// - imposta(nuovo | funzione) salva subito in locale e invia al server dopo una breve pausa;
// - unisci(locale, remoto) decide cosa fare se due dispositivi hanno modificato lo stesso documento.
// stato: 'caricamento' | 'sincronizzato' | 'in-attesa' | 'offline'
export function useDocumento(chiave, { predefinito = {}, unisci = prevalgonoIDatiDelServer } = {}) {
  const utenteId = leggiSessione()?.utente?.id;

  const [copia, setCopia] = useState(() => leggiLocale(utenteId, chiave));
  const [stato, setStato] = useState('caricamento');
  const attuale = useRef(copia);
  const timer = useRef(null);
  const inCorso = useRef(false);
  const rifare = useRef(false);
  const unisciRef = useRef(unisci);
  unisciRef.current = unisci;

  const aggiorna = useCallback(
    (nuova) => {
      attuale.current = nuova;
      setCopia(nuova);
      if (nuova) scriviLocale(utenteId, chiave, nuova);
    },
    [utenteId, chiave],
  );

  const allinea = useCallback(async () => {
    if (inCorso.current) {
      rifare.current = true; // arrivata una modifica durante l'invio: si riparte dopo
      return;
    }
    inCorso.current = true;
    try {
      do {
        rifare.current = false;
        const risultato = await sincronizza(chiave, attuale.current, (l, r) => unisciRef.current(l, r));
        // Se nel frattempo e' cambiato qualcosa in locale non si butta via la modifica
        if (!rifare.current) {
          aggiorna(risultato);
          setStato('sincronizzato');
        }
      } while (rifare.current);
    } catch {
      setStato('offline');
    } finally {
      inCorso.current = false;
    }
  }, [chiave, aggiorna]);

  useEffect(() => {
    allinea();
    const alRitornoOnline = () => allinea();
    window.addEventListener('online', alRitornoOnline);
    return () => {
      window.removeEventListener('online', alRitornoOnline);
      clearTimeout(timer.current);
      // uscendo dalla pagina una modifica in attesa parte subito, non si perde
      if (attuale.current?.modificato) allinea();
    };
  }, [allinea]);

  const imposta = useCallback(
    (nuovo) => {
      const base = attuale.current?.contenuto ?? predefinito;
      const contenuto = typeof nuovo === 'function' ? nuovo(base) : nuovo;
      aggiorna({
        contenuto,
        versione: attuale.current?.versione ?? 0,
        modificato: true,
      });
      setStato('in-attesa');
      clearTimeout(timer.current);
      timer.current = setTimeout(allinea, ATTESA_INVIO_MS);
    },
    // il predefinito e' solo un punto di partenza: non deve rigenerare la funzione ad ogni render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [aggiorna, allinea],
  );

  return { valore: copia?.contenuto ?? predefinito, imposta, stato };
}
