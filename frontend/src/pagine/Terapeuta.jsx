import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAutenticazione } from '../AuthContext';

function dataDiOggiMeno(giorni) {
  const d = new Date();
  d.setDate(d.getDate() - giorni);
  return d.toISOString().slice(0, 10);
}

export default function Terapeuta() {
  const { utente } = useAutenticazione();
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
      const storico = await api.storicoPaziente(paziente.id, dataDiOggiMeno(30), dataDiOggiMeno(0));
      setStoricoPaziente(storico);
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
    <div className="pagina">
      <h1>Le mie pazienti</h1>
      <p className="nota-piccola">{utente.username}</p>

      <form onSubmit={collega} className="riga-collega">
        <input
          type="text"
          placeholder="Codice della paziente (es. ABC123)"
          value={codiceDaCollegare}
          onChange={(e) => setCodiceDaCollegare(e.target.value)}
          required
        />
        <button type="submit">Collega</button>
      </form>
      {erroreCollegamento && <p className="messaggio-errore">{erroreCollegamento}</p>}

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

      {pazienteAperta && (
        <div className="pannello-paziente">
          <div className="testata-pannello">
            <h2>{pazienteAperta.username}</h2>
            <button onClick={() => setPazienteAperta(null)}>Chiudi</button>
          </div>

          {storicoPaziente === null && <p>Caricamento...</p>}
          {storicoPaziente?.length === 0 && <p>Nessuna voce negli ultimi 30 giorni.</p>}
          {storicoPaziente?.map((v) => (
            <div key={v.id} className="riga-storico">
              <strong>{v.data}</strong>
              {v.testi?.note && <p>{v.testi.note}</p>}
            </div>
          ))}

          <button className="pulsante-pericolo" onClick={() => scollega(pazienteAperta.id)}>
            Scollega paziente
          </button>
        </div>
      )}
    </div>
  );
}
