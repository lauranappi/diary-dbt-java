import { createContext, useContext, useState, useCallback } from 'react';
import { api, salvaToken, cancellaToken } from './api';

const ContestoAutenticazione = createContext(null);

function utenteDaLocalStorage() {
  const grezzo = localStorage.getItem('utente');
  if (!grezzo) return null;
  try {
    return JSON.parse(grezzo);
  } catch {
    return null;
  }
}

export function ProvaAutenticazione({ children }) {
  const [utente, setUtente] = useState(utenteDaLocalStorage);

  const registrati = useCallback(async (username, password, ruolo) => {
    const risposta = await api.registrati(username, password, ruolo);
    salvaToken(risposta.token);
    const nuovoUtente = {
      id: risposta.utenteId,
      username: risposta.username,
      ruolo: risposta.ruolo,
      codicePaziente: risposta.codicePaziente,
    };
    localStorage.setItem('utente', JSON.stringify(nuovoUtente));
    setUtente(nuovoUtente);
    return nuovoUtente;
  }, []);

  const accedi = useCallback(async (username, password) => {
    const risposta = await api.accedi(username, password);
    salvaToken(risposta.token);
    const nuovoUtente = {
      id: risposta.utenteId,
      username: risposta.username,
      ruolo: risposta.ruolo,
      codicePaziente: risposta.codicePaziente,
    };
    localStorage.setItem('utente', JSON.stringify(nuovoUtente));
    setUtente(nuovoUtente);
    return nuovoUtente;
  }, []);

  const esci = useCallback(() => {
    cancellaToken();
    localStorage.removeItem('utente');
    setUtente(null);
  }, []);

  return (
    <ContestoAutenticazione.Provider value={{ utente, registrati, accedi, esci }}>
      {children}
    </ContestoAutenticazione.Provider>
  );
}

export function useAutenticazione() {
  const contesto = useContext(ContestoAutenticazione);
  if (!contesto) {
    throw new Error('useAutenticazione va usato dentro <ProvaAutenticazione>');
  }
  return contesto;
}
