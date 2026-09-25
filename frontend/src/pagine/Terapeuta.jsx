import { useState, useEffect } from 'react';
import { api } from '../api';
import { useAutenticazione } from '../AuthContext';
import Intestazione from '../componenti/Intestazione';
import GraficoLinea from '../componenti/GraficoLinea';

function dataDiOggiMeno(giorni) {
  const d = new Date();
  d.setDate(d.getDate() - giorni);
  return d.toISOString().slice(0, 10);
}

function calcolaMedie(voci) {
  const somme = {};
  const conteggi = {};
  for (const v of voci) {
    for (const [chiave, valore] of Object.entries(v.scale || {})) {
      somme[chiave] = (somme[chiave] || 0) + valore;
      conteggi[chiave] = (conteggi[chiave] || 0) + 1;
    }
  }
  return Object.keys(somme).map((chiave) => ({ chiave, media: somme[chiave] / conteggi[chiave] }));
}

// Ordina le voci dal giorno piu' vecchio al piu' recente (per il grafico,
// che va letto da sinistra a destra) e prende solo i giorni che hanno
// davvero un valore per quella scala.
function serieTemporale(voci, chiave) {
  return [...voci]
    .filter((v) => v.scale && v.scale[chiave] !== undefined)
    .sort((a, b) => a.data.localeCompare(b.data))
    .map((v) => ({ data: v.data, valore: v.scale[chiave] }));
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

            {storicoPaziente?.length > 0 && (
              <div className="dc-card">
                <h2>Ultimi 30 giorni</h2>
                <p className="nota-piccola">{storicoPaziente.length} giorni compilati</p>
                <div className="griglia-medie">
                  {calcolaMedie(storicoPaziente).map(({ chiave, media }) => (
                    <div key={chiave} className="cella-media">
                      <span className="cella-media-valore">{media.toFixed(1)}</span>
                      <span className="cella-media-etichetta">{chiave}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {storicoPaziente?.length >= 2 && calcolaMedie(storicoPaziente).map(({ chiave }) => (
              <div key={chiave} className="dc-card">
                <h3 style={{ marginTop: 0, textTransform: 'uppercase', fontSize: 12, color: 'var(--dc-terracotta)' }}>
                  Andamento — {chiave}
                </h3>
                <GraficoLinea
                  punti={serieTemporale(storicoPaziente, chiave)}
                />
              </div>
            ))}

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
