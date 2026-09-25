import { useState, useEffect } from 'react';
import { api } from '../api';

function dataDiOggiMeno(giorni) {
  const d = new Date();
  d.setDate(d.getDate() - giorni);
  return d.toISOString().slice(0, 10);
}

export default function Storico() {
  const [voci, setVoci] = useState([]);
  const [caricamento, setCaricamento] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    api.mioStorico(dataDiOggiMeno(30), dataDiOggiMeno(0))
      .then(setVoci)
      .catch((err) => setErrore(err.message))
      .finally(() => setCaricamento(false));
  }, []);

  if (caricamento) return <div className="pagina">Caricamento...</div>;
  if (errore) return <div className="pagina"><p className="messaggio-errore">{errore}</p></div>;

  return (
    <div className="pagina">
      <h1>Storico</h1>
      <p className="nota-piccola">Ultimi 30 giorni</p>

      {voci.length === 0 && <p>Nessuna voce ancora in questo periodo.</p>}

      {voci.map((v) => (
        <div key={v.id} className="riga-storico">
          <strong>{v.data}</strong>
          {v.testi?.note && <p>{v.testi.note}</p>}
          {v.scale && Object.keys(v.scale).length > 0 && (
            <p className="nota-piccola">
              {Object.entries(v.scale).map(([k, val]) => `${k}: ${val}`).join(' · ')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
