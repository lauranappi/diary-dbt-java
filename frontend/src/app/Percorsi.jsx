import { Navigate, Route, Routes } from 'react-router-dom';
import InPreparazione from '../componenti/InPreparazione.jsx';
import PaginaAccedi from '../funzioni/autenticazione/PaginaAccedi.jsx';
import PaginaRegistrati from '../funzioni/autenticazione/PaginaRegistrati.jsx';
import PaginaDiario from '../funzioni/diario/PaginaDiario.jsx';
import PaginaHome from '../funzioni/home/PaginaHome.jsx';
import Guscio from './Guscio.jsx';
import RottaProtetta from './RottaProtetta.jsx';

// Sezioni che arrivano nelle fasi successive: per ora mostrano un segnaposto
const SEZIONI_IN_ARRIVO = [
  { percorso: 'guida', titolo: 'Guida' },
  { percorso: 'abilita', titolo: 'Abilità', ruolo: 'PAZIENTE' },
  { percorso: 'storico', titolo: 'Storico', ruolo: 'PAZIENTE' },
  { percorso: 'attivita', titolo: 'Attività', ruolo: 'PAZIENTE' },
  { percorso: 'pazienti', titolo: 'Pazienti', ruolo: 'TERAPEUTA' },
  { percorso: 'impostazioni', titolo: 'Impostazioni' },
];

export default function Percorsi() {
  return (
    <Routes>
      <Route path="/accedi" element={<PaginaAccedi />} />
      <Route path="/registrati" element={<PaginaRegistrati />} />

      <Route element={<RottaProtetta><Guscio /></RottaProtetta>}>
        <Route index element={<PaginaHome />} />
        <Route path="diario" element={<RottaProtetta ruolo="PAZIENTE"><PaginaDiario /></RottaProtetta>} />
        {SEZIONI_IN_ARRIVO.map(({ percorso, titolo, ruolo }) => (
          <Route
            key={percorso}
            path={percorso}
            element={<RottaProtetta ruolo={ruolo}><InPreparazione titolo={titolo} /></RottaProtetta>}
          />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
