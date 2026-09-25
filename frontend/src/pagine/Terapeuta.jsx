import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAutenticazione } from '../AuthContext';
import Intestazione from '../componenti/Intestazione';

function dataDiOggiMeno(giorni) {
  const d = new Date();
  d.setDate(d.getDate() - giorni);
  return d.toISOString().slice(0, 10);
}

export default function Terapeuta() {
  const { utente, esci } = useAutenticazione();
  const [pazienti, setPazienti] = useState([]);
  const [codiceDaCollegare, setCodiceDaCollegare] = useState('');
  const [erroreCollegamento, setErroreCollegamento] = useState(null);
  const [pazienteAperta, setPazienteAperta] = useState(null);
  const [storicoPaziente, setStoricoPaziente] = useState(null);

  function ricaricaPazienti() {
    api.mieiePazienti().then(setPazienti).catch(() => {});
  }

  useEffect(ricaricaPazienti, []);

  async function collega(e) {
    e.preventDefault();
    setErroreCollegamento(null);
    try {
      await api.collegaPaziente(codiceDaCollegare.trim().toUpperCase());
      setCodiceDaCollegare('');
      ricaricaPazienti();
    } catch (err) {
      setErroreCollegamento(err.message);
    }
  }

  async function apriPaziente(paziente) {
    setPazienteAperta(paziente);
    setStoricoPaziente(null);
    try {
      setStoricoPaziente(await api.storicoPaziente(paziente.id, dataDiOggiMeno(30), dataDiOggiMeno(0)));
    } catch {
      setStoricoPaziente([]);
    }
  }

  async function scollega(pazienteId) {
    await api.scollegaPaziente(pazienteId);
    setPazienteAperta(null);
    ricaricaPazienti();
  }

  return (
    <>
      <Intestazione
        sopraTitolo={new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}
        titolo="Le mie pazienti"
        sottotitolo={utente.username}
        azioni={
          <button className="dc-btn-secondario" onClick={esci} style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>
            Esci
          </button>
        }
      />
      <div className="dc-corpo">
        <div className="dc-card">
          <form onSubmit={collega} className="riga-collega">
            <input
              type="text" placeholder="Codice della paziente (es. ABC123)"
              value={codiceDaCollegare} onChange={(e) => setCodiceDaCollegare(e.target.value)} required
            />
            <button type="submit" className="dc-btn-secondario">Collega</button>
          </form>
          {erroreCollegamento && <p className="messaggio-errore">{erroreCollegamento}</p>}
        </div>

        {pazienti.length === 0 && <p>Nessuna paziente collegata ancora.</p>}

        <ul className="elenco-pazienti">
          {pazienti.map((p) => (
            <li key={p.id}>
              <button className="riga-paziente" onClick={() => apriPaziente(p)}>
                {p.username}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {pazienteAperta && (
        <div className="pannello-paziente">
          <div className="testata-pannello">
            <h2>{pazienteAperta.username}</h2>
            <button onClick={() => setPazienteAperta(null)}>Chiudi</button>
          </div>
          <div className="dc-corpo">
            {storicoPaziente === null && <p>Caricamento...</p>}
            {storicoPaziente?.length === 0 && <p>Nessuna voce negli ultimi 30 giorni.</p>}
            {storicoPaziente?.map((v) => (
              <div key={v.id} className="dc-card">
                <strong>{v.data}</strong>
                {v.testi?.note && <p>{v.testi.note}</p>}
              </div>
            ))}
            <button className="dc-btn-secondario dc-btn-pericolo" onClick={() => scollega(pazienteAperta.id)}>
              Scollega paziente
            </button>
          </div>
        </div>
      )}
    </>
  );
}
