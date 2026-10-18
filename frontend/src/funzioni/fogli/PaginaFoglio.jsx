import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { trovaFoglio } from '../../contenuti/fogli/index.js';
import FormFoglio from './FormFoglio.jsx';
import { anteprima } from './riassunto.js';
import { useFogli } from './useFogli.js';
import stili from './Fogli.module.css';

const dataBreve = (ts) => new Date(ts).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });

// Un foglio di lavoro: l'elenco di quelli compilati e il modulo per un foglio nuovo o da rivedere
export default function PaginaFoglio() {
  const { id } = useParams();
  const foglio = trovaFoglio(id);
  const { compilati, salva, elimina, stato } = useFogli();
  // null = elenco; 'nuovo' = foglio vuoto; altrimenti il foglio compilato aperto
  const [aperto, setAperto] = useState(null);

  if (!foglio) {
    return (
      <div className={stili.contenuto}>
        <Link to="/fogli" className={stili.indietro}>← Fogli di lavoro</Link>
        <p className={stili.errore} role="alert">Questo foglio non esiste.</p>
      </div>
    );
  }
  const lista = compilati(foglio.id);

  return (
    <>
      <Hero soloDesktop semplice titolo={foglio.titolo} sottotitolo={foglio.riferimento} />
      <div className={stili.contenuto}>
        <Link to="/fogli" className={stili.indietro}>← Fogli di lavoro</Link>
        {aperto ? (
          <FormFoglio
            key={aperto === 'nuovo' ? 'nuovo' : aperto.id}
            foglio={foglio}
            voce={aperto === 'nuovo' ? null : aperto}
            onSalva={(campi, idVoce) => salva(foglio.id, campi, idVoce)}
            onElimina={(idVoce) => elimina(foglio.id, idVoce)}
            onIndietro={() => setAperto(null)}
          />
        ) : (
          <>
            <p className={stili.intro}>{foglio.intro}</p>
            {foglio.riferimento && <p className={stili.riferimento}>📖 Manuale: {foglio.riferimento}</p>}
            <Pulsante pieno className={stili.nuovo} onClick={() => setAperto('nuovo')}>+ Nuovo foglio</Pulsante>
            {lista.length > 0 && <h2 className={stili.titoloSezione}>Compilati</h2>}
            {lista.map((voce) => (
              <button key={voce.id} type="button" className={stili.riga} onClick={() => setAperto(voce)}>
                <span className={stili.testoRiga}>
                  <span className={stili.data}>{dataBreve(voce.ts)}</span>
                  <span className={stili.anteprima}>{anteprima(foglio, voce.v)}</span>
                </span>
              </button>
            ))}
            {stato === 'offline' && <p className={stili.sottoRiga}>Salvato su questo dispositivo, si sincronizza appena c’è rete.</p>}
          </>
        )}
      </div>
    </>
  );
}
