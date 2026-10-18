import { useCallback, useMemo } from 'react';
import { useDocumento } from '../../api/useDocumento.js';
import { normalizza } from '../gruppo/incontri.js';
import { unisciPostit } from './unisciPostit.js';

export const CHIAVE_INCONTRI = 'grp:pagine'; // il Diario del gruppo vive nello stesso documento dei post-it

const nuovoId = () => `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// I post-it personali (documento 'post-it', privato): { tutti, lista(chiave), salva, rimuovi }
export function usePostit() {
  const { valore, imposta, stato } = useDocumento('post-it', { predefinito: {}, unisci: unisciPostit });
  const tutti = useMemo(() => valore || {}, [valore]);

  const lista = useCallback((chiave) => (tutti[chiave] || []).filter((p) => !p.d), [tutti]);

  // senza id crea un post-it, con id modifica quello esistente
  const salva = useCallback((chiave, id, testo, colore) => {
    imposta((prima) => {
      const elenco = [...(prima?.[chiave] || [])];
      const adesso = Date.now();
      const posto = id ? elenco.findIndex((p) => p.id === id) : -1;
      if (posto >= 0) {
        const { d: _tolto, ...resto } = elenco[posto];
        elenco[posto] = { ...resto, t: testo, c: colore, ts: adesso };
      } else elenco.unshift({ id: nuovoId(), t: testo, c: colore, ts: adesso });
      return { ...prima, [chiave]: elenco };
    });
  }, [imposta]);

  const rimuovi = useCallback((chiave, id) => {
    imposta((prima) => ({
      ...prima,
      [chiave]: (prima?.[chiave] || []).map((p) => (p.id === id ? { id, t: '', c: p.c, ts: Date.now(), d: 1 } : p)),
    }));
  }, [imposta]);

  // gli incontri del Diario del gruppo, in forma attuale
  const incontri = useMemo(() => (tutti[CHIAVE_INCONTRI] || []).filter((x) => !x.d).map(normalizza), [tutti]);
  const testoPostit = useCallback((incontro) => lista(`gn:${incontro.id}`).map((p) => p.t).join(' '), [lista]);

  const salvaIncontro = useCallback((incontro) => {
    imposta((prima) => {
      const elenco = [...(prima?.[CHIAVE_INCONTRI] || [])];
      const posto = elenco.findIndex((x) => x.id === incontro.id);
      const nuovo = { ...incontro, ts: Date.now() };
      if (posto >= 0) elenco[posto] = nuovo;
      else elenco.unshift(nuovo);
      return { ...prima, [CHIAVE_INCONTRI]: elenco };
    });
  }, [imposta]);

  // toglie l'incontro e i post-it presi in quell'incontro
  const eliminaIncontro = useCallback((id) => {
    imposta((prima) => {
      const adesso = Date.now();
      const chiaveNote = `gn:${id}`;
      const altro = { ...prima };
      altro[CHIAVE_INCONTRI] = (prima?.[CHIAVE_INCONTRI] || []).map((x) => (x.id === id ? { id, g: x.g, pp: [], ll: [], n: '', ts: adesso, d: 1 } : x));
      if (prima?.[chiaveNote]) altro[chiaveNote] = prima[chiaveNote].map((p) => ({ id: p.id, t: '', c: p.c, ts: adesso, d: 1 }));
      return altro;
    });
  }, [imposta]);

  return { tutti, lista, salva, rimuovi, incontri, testoPostit, salvaIncontro, eliminaIncontro, stato };
}
