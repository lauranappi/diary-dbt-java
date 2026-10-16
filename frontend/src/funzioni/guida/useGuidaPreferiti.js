import { useCallback } from 'react';
import { useDocumento } from '../../api/useDocumento.js';

const PREDEFINITO = { elenco: [] };

// Se due dispositivi aggiungono un preferito ciascuno, si tengono entrambi.
function unisci(locale, remoto) {
  const elenco = [...(remoto?.elenco || [])];
  for (const id of locale?.elenco || []) if (!elenco.includes(id)) elenco.push(id);
  return { ...remoto, elenco };
}

// Le schede preferite (documento 'guida-preferiti' sul server): ids come 'mind-3'.
export function useGuidaPreferiti() {
  const { valore, imposta } = useDocumento('guida-preferiti', { predefinito: PREDEFINITO, unisci });
  const elenco = valore?.elenco || [];

  const alterna = useCallback((id) => {
    imposta((c) => {
      const attuale = c?.elenco || [];
      return { ...c, elenco: attuale.includes(id) ? attuale.filter((x) => x !== id) : [...attuale, id] };
    });
  }, [imposta]);

  return { elenco, alterna };
}
