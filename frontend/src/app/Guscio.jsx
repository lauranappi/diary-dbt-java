import { Outlet } from 'react-router-dom';
import BarraInferiore from '../componenti/BarraInferiore.jsx';
import BarraLaterale from '../componenti/BarraLaterale.jsx';
import { useAutenticazione } from '../funzioni/autenticazione/useAutenticazione.js';
import { vociLateraliPerRuolo, vociPerRuolo } from './navigazione.js';
import stili from './Guscio.module.css';

// Cornice delle pagine per chi ha fatto l'accesso: sul telefono contenuto + barra in basso,
// da 1024px in su con il mouse barra laterale a sinistra; su iPad barra in basso e contenuto centrato.
export default function Guscio() {
  const { utente } = useAutenticazione();
  const voci = vociPerRuolo(utente.ruolo);
  return (
    <div className={stili.guscio}>
      <div className={stili.laterale}>
        <BarraLaterale voci={vociLateraliPerRuolo(utente.ruolo)} utente={utente} />
      </div>
      <main className={stili.contenuto}>
        <Outlet />
      </main>
      <div className={stili.inferiore}>
        <BarraInferiore voci={voci} />
      </div>
    </div>
  );
}
