import { useEffect, useState } from 'react';
import { terapeutaApi } from '../../api/terapeuta.js';

// Le pazienti collegate alla terapeuta: { pazienti, caricamento, errore }
export function usePazienti() {
  const [stato, setStato] = useState({ pazienti: [], caricamento: true, errore: false });

  useEffect(() => {
    let annullato = false;
    terapeutaApi
      .pazienti()
      .then((pazienti) => { if (!annullato) setStato({ pazienti, caricamento: false, errore: false }); })
      .catch(() => { if (!annullato) setStato({ pazienti: [], caricamento: false, errore: true }); });
    return () => { annullato = true; };
  }, []);

  return stato;
}
