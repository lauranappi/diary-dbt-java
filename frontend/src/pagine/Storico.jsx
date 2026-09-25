import { useState, useEffect } from 'react';
import { api } from '../api';
import Intestazione from '../componenti/Intestazione';

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

  return (
    <>
      <Intestazione titolo="Storico" sottotitolo="Ultimi 30 giorni" />
      <div className="dc-corpo">
        {caricamento && <p>Caricamento...</p>}
        {errore && <p className="messaggio-errore">{errore}</p>}
        {!caricamento && voci.length === 0 && <p>Nessuna voce ancora in questo periodo.</p>}

        {voci.map((v) => (
          <div key={v.id} className="dc-card">
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
    </>
  );
}
