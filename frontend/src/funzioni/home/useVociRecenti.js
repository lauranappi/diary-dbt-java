import { useEffect, useState } from 'react';
import { diarioApi } from '../../api/diario.js';
import { aggiungiGiorni, chiave } from '../diario/date.js';

const GIORNI_INDIETRO = 120;

// Le voci degli ultimi mesi: bastano per la serie di giorni, ieri e gli ultimi sette giorni.
// { voci, pronto }
export function useVociRecenti() {
  const [stato, setStato] = useState({ voci: [], pronto: false });

  useEffect(() => {
    let annullato = false;
    const oggi = new Date();
    diarioApi
      .intervallo(chiave(aggiungiGiorni(oggi, -GIORNI_INDIETRO)), chiave(oggi))
      .then((voci) => { if (!annullato) setStato({ voci, pronto: true }); })
      .catch(() => { if (!annullato) setStato({ voci: [], pronto: true }); });
    return () => { annullato = true; };
  }, []);

  return stato;
}
