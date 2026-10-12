import { NavLink } from 'react-router-dom';
import stili from './BarraInferiore.module.css';

// voci: [{ percorso, etichetta }]. Ogni voce e' un pallino che si allunga quando e' attiva.
export default function BarraInferiore({ voci }) {
  return (
    <nav className={stili.barra} aria-label="Navigazione principale">
      <div className={stili.dentro}>
        {voci.map((voce) => (
          <NavLink
            key={voce.percorso}
            to={voce.percorso}
            end={voce.percorso === '/'}
            className={({ isActive }) => `${stili.voce} ${isActive ? stili.attiva : ''}`}
          >
            <span className={stili.pallino} />
            <span className={stili.etichetta}>{voce.etichetta}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
