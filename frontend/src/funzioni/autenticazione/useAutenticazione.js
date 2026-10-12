import { useContext } from 'react';
import { ContestoAutenticazione } from './contesto.js';

export function useAutenticazione() {
  const contesto = useContext(ContestoAutenticazione);
  if (!contesto) throw new Error('useAutenticazione va usato dentro <ProviderAutenticazione>');
  return contesto;
}
