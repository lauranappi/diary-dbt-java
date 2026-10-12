import { Outlet } from 'react-router-dom';
import BarraInferiore from '../componenti/BarraInferiore.jsx';
import { useAutenticazione } from '../funzioni/autenticazione/useAutenticazione.js';
import { vociPerRuolo } from './navigazione.js';
import stili from './Guscio.module.css';

// Cornice delle pagine per chi ha fatto l'accesso: contenuto + barra in basso
export default function Guscio() {
  const { utente } = useAutenticazione();
  return (
    <div className={stili.guscio}>
      <main className={stili.contenuto}>
        <Outlet />
      </main>
      <BarraInferiore voci={vociPerRuolo(utente.ruolo)} />
    </div>
  );
}
