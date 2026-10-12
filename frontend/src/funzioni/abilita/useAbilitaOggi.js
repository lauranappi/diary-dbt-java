import { useCallback, useEffect, useRef, useState } from 'react';
import { creaCoda } from '../../api/coda.js';
import { diarioApi } from '../../api/diario.js';

// Le abilita' spuntate in un giorno: { usate: {id: true}, alterna(id), errore }.
// Ogni tocco aggiorna subito lo schermo e poi salva sul server l'elenco completo;
// se il salvataggio fallisce si torna a com'era e si segnala l'errore.
export function useAbilitaOggi(giorno) {
  const [usate, setUsate] = useState({});
  const [errore, setErrore] = useState(false);
  const ultime = useRef({});
  const [coda] = useState(creaCoda);

  useEffect(() => {
    let annullato = false;
    diarioApi
      .intervallo(giorno, giorno)
      .then((voci) => {
        if (annullato) return;
        ultime.current = { ...(voci[0]?.abilitaUsate || {}) };
        setUsate(ultime.current);
      })
      .catch(() => { /* senza rete si parte da vuoto */ });
    return () => { annullato = true; };
  }, [giorno]);

  const alterna = useCallback(async (id) => {
    const prima = ultime.current;
    const dopo = { ...prima };
    if (dopo[id]) delete dopo[id];
    else dopo[id] = true;
    ultime.current = dopo;
    setUsate(dopo);
    setErrore(false);
    try {
      await coda(() => diarioApi.salva({ data: giorno, abilitaUsate: dopo }));
    } catch {
      ultime.current = prima;
      setUsate(prima);
      setErrore(true);
    }
  }, [giorno, coda]);

  return { usate, alterna, errore };
}
