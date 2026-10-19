import { useEffect } from 'react';

// Dietro l'ora e la batteria di iPhone si vede lo sfondo della pagina: sulla Home e' petrolio
// (come la testata), sulle altre pagine crema. Come in Marea: la classe va sull'elemento <html>.
export function useSfondoPetrolio() {
  useEffect(() => {
    document.documentElement.classList.add('sfondoPetrolio');
    return () => document.documentElement.classList.remove('sfondoPetrolio');
  }, []);
}
