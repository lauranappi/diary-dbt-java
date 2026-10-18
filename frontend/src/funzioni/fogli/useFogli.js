import { useCallback } from 'react';
import { useDocumento } from '../../api/useDocumento.js';
import { FOGLI_VUOTI, nuovoIdFoglio, unisciFogli } from './unisciFogli.js';

// I fogli di lavoro compilati (documento 'fogli' sul server): { compilati(id), salva, elimina, stato }
export function useFogli() {
  const { valore, imposta, stato } = useDocumento('fogli', { predefinito: FOGLI_VUOTI, unisci: unisciFogli });

  const compilati = useCallback((idFoglio) => valore?.generici?.[idFoglio] ?? [], [valore]);

  // senza idVoce crea un nuovo foglio compilato, con idVoce modifica quello esistente
  const salva = useCallback((idFoglio, campi, idVoce) => {
    imposta((prima) => {
      const generici = { ...(prima?.generici || {}) };
      const lista = [...(generici[idFoglio] || [])];
      const adesso = Date.now();
      const posto = idVoce ? lista.findIndex((e) => e.id === idVoce) : -1;
      if (posto >= 0) lista[posto] = { ...lista[posto], v: campi, m: adesso };
      else lista.push({ id: nuovoIdFoglio(), ts: adesso, v: campi });
      generici[idFoglio] = lista.sort((a, b) => b.ts - a.ts);
      return { ...prima, generici };
    });
  }, [imposta]);

  const elimina = useCallback((idFoglio, idVoce) => {
    imposta((prima) => {
      const generici = { ...(prima?.generici || {}) };
      generici[idFoglio] = (generici[idFoglio] || []).filter((e) => e.id !== idVoce);
      return { ...prima, generici, cancellati: { ...(prima?.cancellati || {}), [`${idFoglio}:${idVoce}`]: Date.now() } };
    });
  }, [imposta]);

  return { compilati, salva, elimina, stato };
}
