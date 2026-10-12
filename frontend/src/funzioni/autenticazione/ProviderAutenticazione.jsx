import { useCallback, useEffect, useMemo, useState } from 'react';
import { alleSessioneScaduta } from '../../api/cliente.js';
import { autenticazioneApi } from '../../api/autenticazione.js';
import { cancellaSessione, leggiSessione, salvaSessione } from '../../api/sessione.js';
import { ContestoAutenticazione } from './contesto.js';

function utenteDaRisposta(r) {
  return {
    id: r.utenteId,
    username: r.username,
    ruolo: r.ruolo,
    nome: r.nome || '',
    cognome: r.cognome || '',
    codicePaziente: r.codicePaziente || null,
    codiceTerapeuta: r.codiceTerapeuta || null,
  };
}

export function ProviderAutenticazione({ children }) {
  const [utente, setUtente] = useState(() => leggiSessione()?.utente ?? null);

  const entra = useCallback((risposta) => {
    const nuovo = utenteDaRisposta(risposta);
    salvaSessione({ token: risposta.token, utente: nuovo });
    setUtente(nuovo);
    return nuovo;
  }, []);

  const accedi = useCallback(
    async (username, password) => entra(await autenticazioneApi.accedi(username, password)),
    [entra],
  );

  const registrati = useCallback(
    async (dati) => entra(await autenticazioneApi.registra(dati)),
    [entra],
  );

  const esci = useCallback(() => {
    cancellaSessione();
    setUtente(null);
  }, []);

  // Se il server non riconosce piu' il token si torna alla pagina di accesso
  useEffect(() => {
    alleSessioneScaduta(esci);
  }, [esci]);

  const valore = useMemo(
    () => ({ utente, accedi, registrati, esci }),
    [utente, accedi, registrati, esci],
  );
  return <ContestoAutenticazione.Provider value={valore}>{children}</ContestoAutenticazione.Provider>;
}
