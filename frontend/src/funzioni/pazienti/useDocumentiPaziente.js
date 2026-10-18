import { useEffect, useState } from 'react';
import { terapeutaApi } from '../../api/terapeuta.js';

// I documenti condivisi di una paziente (fogli di lavoro...): { documenti, caricamento, errore }
export function useDocumentiPaziente(pazienteId) {
  const [stato, setStato] = useState({ documenti: null, caricamento: true, errore: false });

  useEffect(() => {
    let annullato = false;
    terapeutaApi
      .documenti(pazienteId)
      .then((documenti) => { if (!annullato) setStato({ documenti, caricamento: false, errore: false }); })
      .catch(() => { if (!annullato) setStato({ documenti: null, caricamento: false, errore: true }); });
    return () => { annullato = true; };
  }, [pazienteId]);

  return stato;
}
