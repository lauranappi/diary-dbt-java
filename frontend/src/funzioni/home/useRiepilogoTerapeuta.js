import { useEffect, useState } from 'react';
import { terapeutaApi } from '../../api/terapeuta.js';
import { aggiungiGiorni, chiave } from '../diario/date.js';
import { riepilogoTerapeuta } from '../pazienti/riepilogoTerapeuta.js';

const GIORNI = 7;

// Per la home della terapeuta: { pazienti, compilateOggi, segnalazioni, caricamento, errore }
// Gli ultimi sette giorni di ogni paziente; se una paziente non risponde le altre si vedono lo stesso.
export function useRiepilogoTerapeuta() {
  const [stato, setStato] = useState({ pazienti: [], compilateOggi: 0, segnalazioni: [], caricamento: true, errore: false });

  useEffect(() => {
    let annullato = false;
    const adesso = new Date();
    const oggi = chiave(adesso);
    const da = chiave(aggiungiGiorni(adesso, -(GIORNI - 1)));
    terapeutaApi
      .pazienti()
      .then(async (pazienti) => {
        const vociPerPaziente = await Promise.all(
          pazienti.map((paziente) => terapeutaApi.voci(paziente.id, da, oggi).then((voci) => ({ paziente, voci })).catch(() => ({ paziente, voci: [] }))),
        );
        if (annullato) return;
        setStato({ pazienti, ...riepilogoTerapeuta(vociPerPaziente, oggi), caricamento: false, errore: false });
      })
      .catch(() => { if (!annullato) setStato((s) => ({ ...s, caricamento: false, errore: true })); });
    return () => { annullato = true; };
  }, []);

  return stato;
}
