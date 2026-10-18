import { useCallback, useMemo } from 'react';
import { useDocumento } from '../../api/useDocumento.js';
import { unisciPostit } from './unisciPostit.js';

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

  return { tutti, lista, salva, rimuovi, stato };
}
