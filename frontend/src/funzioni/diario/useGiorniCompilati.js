import { useEffect, useState } from 'react';
import { diarioApi } from '../../api/diario.js';
import { chiave } from './date.js';
import { compilata } from './voce.js';

// Quali tra i giorni mostrati hanno gia' qualcosa di compilato (il pallino giallo della striscia).
// "versione" cambia quando si salva, per rileggere.
export function useGiorniCompilati(giorni, versione) {
  const [piene, setPiene] = useState(() => new Set());
  const da = chiave(giorni[0]);
  const a = chiave(giorni[giorni.length - 1]);

  useEffect(() => {
    let annullato = false;
    diarioApi
      .intervallo(da, a)
      .then((voci) => {
        if (!annullato) setPiene(new Set(voci.filter(compilata).map((v) => v.data)));
      })
      .catch(() => { /* senza rete i pallini non si aggiornano */ });
    return () => { annullato = true; };
  }, [da, a, versione]);

  return piene;
}
