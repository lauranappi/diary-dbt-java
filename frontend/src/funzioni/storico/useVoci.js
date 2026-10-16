import { useEffect, useState } from 'react';
import { diarioApi } from '../../api/diario.js';
import { terapeutaApi } from '../../api/terapeuta.js';
import { chiave } from '../diario/date.js';

const DAL = '2020-01-01';

// Tutte le voci del diary: della paziente stessa, o (con pazienteId) di una paziente della terapeuta.
// Restituisce { voci, caricamento, errore }.
// Si scaricano una volta sola e il periodo (7gg, 14gg, tutti) si sceglie poi qui sul dispositivo.
export function useVoci(pazienteId) {
  const [stato, setStato] = useState({ voci: [], caricamento: true, errore: false });

  useEffect(() => {
    let annullato = false;
    const fine = chiave(new Date());
    const carica = pazienteId ? terapeutaApi.voci(pazienteId, DAL, fine) : diarioApi.intervallo(DAL, fine);
    carica
      .then((voci) => { if (!annullato) setStato({ voci, caricamento: false, errore: false }); })
      .catch(() => { if (!annullato) setStato({ voci: [], caricamento: false, errore: true }); });
    return () => { annullato = true; };
  }, [pazienteId]);

  return stato;
}
