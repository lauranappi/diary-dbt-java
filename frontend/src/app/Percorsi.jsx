import { Navigate, Route, Routes } from 'react-router-dom';
import InPreparazione from '../componenti/InPreparazione.jsx';
import PaginaAccedi from '../funzioni/autenticazione/PaginaAccedi.jsx';
import PaginaRegistrati from '../funzioni/autenticazione/PaginaRegistrati.jsx';
import PaginaAbilita from '../funzioni/abilita/PaginaAbilita.jsx';
import PaginaAttivita from '../funzioni/attivita/PaginaAttivita.jsx';
import PaginaDiario from '../funzioni/diario/PaginaDiario.jsx';
import PaginaImpostazioni from '../funzioni/impostazioni/PaginaImpostazioni.jsx';
import PaginaGuida from '../funzioni/guida/PaginaGuida.jsx';
import PaginaModulo from '../funzioni/guida/PaginaModulo.jsx';
import PaginaStorico from '../funzioni/storico/PaginaStorico.jsx';
import PaginaHome from '../funzioni/home/PaginaHome.jsx';
import Guscio from './Guscio.jsx';
import RottaProtetta from './RottaProtetta.jsx';

// Sezioni che arrivano nelle fasi successive: per ora mostrano un segnaposto
const SEZIONI_IN_ARRIVO = [
  { percorso: 'pazienti', titolo: 'Pazienti', ruolo: 'TERAPEUTA' },
];

export default function Percorsi() {
  return (
    <Routes>
      <Route path="/accedi" element={<PaginaAccedi />} />
      <Route path="/registrati" element={<PaginaRegistrati />} />

      <Route element={<RottaProtetta><Guscio /></RottaProtetta>}>
        <Route index element={<PaginaHome />} />
        <Route path="diario" element={<RottaProtetta ruolo="PAZIENTE"><PaginaDiario /></RottaProtetta>} />
        <Route path="abilita" element={<RottaProtetta ruolo="PAZIENTE"><PaginaAbilita /></RottaProtetta>} />
        <Route path="attivita" element={<RottaProtetta ruolo="PAZIENTE"><PaginaAttivita /></RottaProtetta>} />
        <Route path="impostazioni" element={<PaginaImpostazioni />} />
        <Route path="storico" element={<RottaProtetta ruolo="PAZIENTE"><PaginaStorico /></RottaProtetta>} />
        <Route path="guida" element={<PaginaGuida />} />
        <Route path="guida/:modulo" element={<PaginaModulo />} />
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
