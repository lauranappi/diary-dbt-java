import { useEffect, useState } from 'react';
import { diarioApi } from '../../api/diario.js';
import { chiave } from '../diario/date.js';

const DAL = '2020-01-01';

// Tutte le voci del diary della paziente: { voci, caricamento, errore }.
// Si scaricano una volta sola e il periodo (7gg, 14gg, tutti) si sceglie poi qui sul dispositivo.
export function useVoci() {
  const [stato, setStato] = useState({ voci: [], caricamento: true, errore: false });

  useEffect(() => {
    let annullato = false;
    diarioApi
      .intervallo(DAL, chiave(new Date()))
      .then((voci) => { if (!annullato) setStato({ voci, caricamento: false, errore: false }); })
      .catch(() => { if (!annullato) setStato({ voci: [], caricamento: false, errore: true }); });
    return () => { annullato = true; };
  }, []);

  return stato;
}
