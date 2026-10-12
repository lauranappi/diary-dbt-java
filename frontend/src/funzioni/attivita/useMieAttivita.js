import { useCallback } from 'react';
import { useDocumento } from '../../api/useDocumento.js';

const PREDEFINITO = { elenco: [] };

// Le attivita' personali, sempre a disposizione (documento 'abilita-personali' sul server).
// Se due dispositivi ne aggiungono una ciascuno, si tengono entrambe.
function unisci(locale, remoto) {
  const elenco = [...(remoto?.elenco || [])];
  for (const voce of locale?.elenco || []) if (!elenco.includes(voce)) elenco.push(voce);
  return { ...remoto, elenco };
}

export function useMieAttivita() {
  const { valore, imposta } = useDocumento('abilita-personali', { predefinito: PREDEFINITO, unisci });
  const elenco = valore.elenco || [];

  const aggiungi = useCallback((voce) => {
    imposta((c) => ((c.elenco || []).includes(voce) ? c : { ...c, elenco: [...(c.elenco || []), voce] }));
  }, [imposta]);

  const togli = useCallback((voce) => {
    imposta((c) => ({ ...c, elenco: (c.elenco || []).filter((v) => v !== voce) }));
  }, [imposta]);

  return { elenco, aggiungi, togli };
}
