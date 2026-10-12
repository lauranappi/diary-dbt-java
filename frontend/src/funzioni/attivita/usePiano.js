import { useCallback, useEffect, useRef, useState } from 'react';
import { creaCoda } from '../../api/coda.js';
import { diarioApi } from '../../api/diario.js';
import { FASCE } from '../../contenuti/attivita.js';

export const PIANO_VUOTO = Object.freeze({ mattina: [], pomeriggio: [], sera: [] });

// Dal server arriva solo cio' che e' stato salvato: le fasce mancanti sono vuote
export function normalizzaPiano(planner) {
  const piano = {};
  for (const { id } of FASCE) piano[id] = Array.isArray(planner?.[id]) ? [...planner[id]] : [];
  return piano;
}

export const haAttivita = (piano) => FASCE.some(({ id }) => piano[id].length > 0);

// Il piano della giornata: { piano, modifica(funzione), salvataggi, errore }
// modifica(f) applica f al piano, lo mostra subito e lo salva; se non riesce torna a com'era.
// salvataggi cresce a ogni salvataggio riuscito (la pagina ci mostra "Salvato").
export function usePiano(giorno) {
  const [piano, setPiano] = useState(PIANO_VUOTO);
  const [salvataggi, setSalvataggi] = useState(0);
  const [errore, setErrore] = useState(false);
  const ultimo = useRef(PIANO_VUOTO);
  const [coda] = useState(creaCoda);

  useEffect(() => {
    let annullato = false;
    diarioApi
      .intervallo(giorno, giorno)
      .then((voci) => {
        if (annullato) return;
        ultimo.current = normalizzaPiano(voci[0]?.planner);
        setPiano(ultimo.current);
      })
      .catch(() => { /* senza rete si parte da un piano vuoto */ });
    return () => { annullato = true; };
  }, [giorno]);

  const modifica = useCallback(async (cambia) => {
    const prima = ultimo.current;
    const dopo = cambia(prima);
    ultimo.current = dopo;
    setPiano(dopo);
    setErrore(false);
    try {
      await coda(() => diarioApi.salva({ data: giorno, planner: dopo }));
      setSalvataggi((n) => n + 1);
    } catch {
      ultimo.current = prima;
      setPiano(prima);
      setErrore(true);
    }
  }, [giorno, coda]);

  return { piano, modifica, salvataggi, errore };
}

// Funzioni pure per cambiare il piano senza toccare l'originale
export const conAttivita = (piano, fascia, voce) =>
  piano[fascia].includes(voce) ? piano : { ...piano, [fascia]: [...piano[fascia], voce] };

export const senzaAttivita = (piano, fascia, voce) =>
  ({ ...piano, [fascia]: piano[fascia].filter((v) => v !== voce) });

export const alternaAttivita = (piano, fascia, voce) =>
  (piano[fascia].includes(voce) ? senzaAttivita : conAttivita)(piano, fascia, voce);
