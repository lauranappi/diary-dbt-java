import { useEffect, useState } from 'react';
import { profiloApi } from '../../api/profilo.js';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import Riga from './Riga.jsx';
import stili from './Sezione.module.css';

// Nome, cognome, il proprio codice e la terapeuta a cui si e' collegate.
// Ogni campo si salva quando si esce dal campo, senza un pulsante.
export default function SezioneProfilo() {
  const { utente, aggiornaUtente } = useAutenticazione();
  const [nome, setNome] = useState(utente.nome || '');
  const [cognome, setCognome] = useState(utente.cognome || '');
  const [terapeuta, setTerapeuta] = useState(utente.codiceTerapeuta || '');
  const [nomeTerapeuta, setNomeTerapeuta] = useState('');
  const [errore, setErrore] = useState('');

  // Il nome per esteso della terapeuta lo sa solo il server; legge anche il collegamento attuale
  useEffect(() => {
    if (utente.ruolo !== 'PAZIENTE') return undefined;
    let annullato = false;
    profiloApi.leggi()
      .then((p) => {
        if (annullato) return;
        setNomeTerapeuta(p.nomeTerapeuta || '');
        if ((p.codiceTerapeuta || '') !== (utente.codiceTerapeuta || '')) {
          setTerapeuta(p.codiceTerapeuta || '');
          aggiornaUtente({ codiceTerapeuta: p.codiceTerapeuta || null });
        }
      })
      .catch(() => {});
    return () => { annullato = true; };
    // solo all'apertura della pagina
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function salvaNome() {
    if (nome.trim() === (utente.nome || '') && cognome.trim() === (utente.cognome || '')) return;
    if (!nome.trim()) { setNome(utente.nome || ''); return; }
    setErrore('');
    try {
      const salvati = await profiloApi.modifica(nome.trim(), cognome.trim());
      aggiornaUtente({ nome: salvati.nome, cognome: salvati.cognome });
    } catch (e) {
      setErrore(e.message);
    }
  }

  async function salvaTerapeuta() {
    const codice = terapeuta.trim();
    if (codice === (utente.codiceTerapeuta || '')) return;
    setErrore('');
    try {
      if (codice) await profiloApi.collegaTerapeuta(codice);
      else await profiloApi.scollegaTerapeuta();
      aggiornaUtente({ codiceTerapeuta: codice || null });
      const p = await profiloApi.leggi().catch(() => ({}));
      setNomeTerapeuta(codice ? p.nomeTerapeuta || '' : '');
    } catch (e) {
      setErrore(e.message);
      setTerapeuta(utente.codiceTerapeuta || '');
    }
  }

  return (
    <div className={stili.sezione}>
      <h2 className={stili.titolo}>Profilo</h2>
      <Riga nome="Nome e cognome">
        <div className={stili.coppia}>
          <input className={`${stili.campo} ${stili.nome}`} type="text" placeholder="Nome" aria-label="Nome"
            value={nome} onChange={(e) => setNome(e.target.value)} onBlur={salvaNome} />
          <input className={`${stili.campo} ${stili.cognome}`} type="text" placeholder="Cognome" aria-label="Cognome"
            value={cognome} onChange={(e) => setCognome(e.target.value)} onBlur={salvaNome} />
        </div>
      </Riga>
      {utente.ruolo === 'PAZIENTE' && (
        <>
          <Riga nome="Il tuo codice" descrizione="Comunicalo a voce alla terapeuta per collegarti a lei" htmlFor="impostazioni-codice">
            <input id="impostazioni-codice" className={`${stili.campo} ${stili.codice}`} type="text" value={utente.codicePaziente || ''} readOnly />
          </Riga>
          <Riga nome="Username della tua terapeuta" descrizione="Lasciare vuoto se non vuoi condividere i dati" htmlFor="impostazioni-terapeuta">
            <input id="impostazioni-terapeuta" className={`${stili.campo} ${stili.codice}`} type="text" placeholder="es. dott.bianchi"
              autoCapitalize="none" value={terapeuta} onChange={(e) => setTerapeuta(e.target.value)} onBlur={salvaTerapeuta} />
          </Riga>
          {nomeTerapeuta && terapeuta.trim() === (utente.codiceTerapeuta || '') && (
            <Riga nome="La tua terapeuta">
              <span className={stili.valore}>{nomeTerapeuta}</span>
            </Riga>
          )}
        </>
      )}
      {errore && <p className={stili.errore} role="alert">{errore}</p>}
    </div>
  );
}
