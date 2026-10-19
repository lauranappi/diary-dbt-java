import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { aggiornaApp } from '../app/aggiornaApp.js';
import { useDoppioTocco } from '../app/useDoppioTocco.js';
import stili from './BarraInferiore.module.css';

// voci: [{ percorso, etichetta }]. Ogni voce e' un pallino che si allunga quando e' attiva.
// Un doppio tocco su Home (entro 0,6 secondi) ricarica l'app per prendere la versione nuova.
export default function BarraInferiore({ voci }) {
  const [aggiorno, setAggiorno] = useState(false);
  const tocco = useDoppioTocco(() => {
    setAggiorno(true);
    setTimeout(aggiornaApp, 480);
  });

  return (
    <nav className={stili.barra} aria-label="Navigazione principale">
      <div className={stili.dentro}>
        {voci.map((voce) => (
          <NavLink
            key={voce.percorso}
            to={voce.percorso}
            end={voce.percorso === '/'}
            onClick={voce.percorso === '/' ? tocco : undefined}
            className={({ isActive }) => `${stili.voce} ${isActive ? stili.attiva : ''}`}
          >
            {aggiorno && voce.percorso === '/' ? (
              <svg className={stili.gira} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-label="Aggiorno">
                <path d="M12.5 7A5.5 5.5 0 1 1 9.9 2.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M12.5 2.5v3.2H9.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <span className={stili.pallino} />
            )}
            <span className={stili.etichetta}>{voce.etichetta}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
