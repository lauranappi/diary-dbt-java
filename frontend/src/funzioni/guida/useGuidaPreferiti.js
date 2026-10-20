import { useCallback } from 'react';
import { useDocumento } from '../../api/useDocumento.js';

const PREDEFINITO = { elenco: [] };

// I preferiti si aggiungono e si tolgono: vale l'ultima modifica fatta (unire le due liste
// farebbe ricomparire le stelle appena tolte).
const unisci = (locale) => locale;

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
