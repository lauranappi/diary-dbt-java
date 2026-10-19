import { useCallback, useRef } from 'react';

// Restituisce un gestore di click che chiama azione() al secondo tocco entro 0,6 secondi.
export function useDoppioTocco(azione) {
  const ultimo = useRef(0);
  return useCallback(() => {
    const adesso = Date.now();
    if (adesso - ultimo.current < 600) {
      ultimo.current = 0;
      azione();
    } else {
      ultimo.current = adesso;
    }
  }, [azione]);
}
