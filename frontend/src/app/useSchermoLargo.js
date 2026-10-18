import { useEffect, useState } from 'react';

const QUERY = '(min-width: 701px)';

// true da 701px in su (versione desktop). Dove matchMedia non esiste (test) vale false.
export function useSchermoLargo() {
  const leggi = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches;
  const [largo, setLargo] = useState(leggi);
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const m = window.matchMedia(QUERY);
    const cambia = () => setLargo(m.matches);
    cambia();
    m.addEventListener('change', cambia);
    return () => m.removeEventListener('change', cambia);
  }, []);
  return largo;
}
