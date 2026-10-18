import { Navigate, Route, Routes } from 'react-router-dom';
import PaginaAccedi from '../funzioni/autenticazione/PaginaAccedi.jsx';
import PaginaRegistrati from '../funzioni/autenticazione/PaginaRegistrati.jsx';
import PaginaAbilita from '../funzioni/abilita/PaginaAbilita.jsx';
import PaginaAttivita from '../funzioni/attivita/PaginaAttivita.jsx';
import PaginaDiario from '../funzioni/diario/PaginaDiario.jsx';
import PaginaImpostazioni from '../funzioni/impostazioni/PaginaImpostazioni.jsx';
import PaginaPianoCrisi from '../funzioni/fogli/PaginaPianoCrisi.jsx';
import PaginaFormIncontro from '../funzioni/gruppo/PaginaFormIncontro.jsx';
import PaginaGruppo from '../funzioni/gruppo/PaginaGruppo.jsx';
import PaginaIncontro from '../funzioni/gruppo/PaginaIncontro.jsx';
import PaginaAppunti from '../funzioni/postit/PaginaAppunti.jsx';
import PaginaFoglio from '../funzioni/fogli/PaginaFoglio.jsx';
import PaginaFogli from '../funzioni/fogli/PaginaFogli.jsx';
import PaginaGuida from '../funzioni/guida/PaginaGuida.jsx';
import PaginaModulo from '../funzioni/guida/PaginaModulo.jsx';
import PaginaPaziente from '../funzioni/pazienti/PaginaPaziente.jsx';
import PaginaPazienti from '../funzioni/pazienti/PaginaPazienti.jsx';
import PaginaStorico from '../funzioni/storico/PaginaStorico.jsx';
import PaginaHome from '../funzioni/home/PaginaHome.jsx';
import Guscio from './Guscio.jsx';
import RottaProtetta from './RottaProtetta.jsx';

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
        <Route path="gruppo" element={<RottaProtetta ruolo="PAZIENTE"><PaginaGruppo /></RottaProtetta>} />
        <Route path="gruppo/nuovo" element={<RottaProtetta ruolo="PAZIENTE"><PaginaFormIncontro /></RottaProtetta>} />
        <Route path="gruppo/:id" element={<RottaProtetta ruolo="PAZIENTE"><PaginaIncontro /></RottaProtetta>} />
        <Route path="gruppo/:id/modifica" element={<RottaProtetta ruolo="PAZIENTE"><PaginaFormIncontro /></RottaProtetta>} />
        <Route path="appunti" element={<RottaProtetta ruolo="PAZIENTE"><PaginaAppunti /></RottaProtetta>} />
        <Route path="fogli" element={<RottaProtetta ruolo="PAZIENTE"><PaginaFogli /></RottaProtetta>} />
        <Route path="fogli/piano-crisi" element={<RottaProtetta ruolo="PAZIENTE"><PaginaPianoCrisi /></RottaProtetta>} />
        <Route path="fogli/:id" element={<RottaProtetta ruolo="PAZIENTE"><PaginaFoglio /></RottaProtetta>} />
        <Route path="pazienti" element={<RottaProtetta ruolo="TERAPEUTA"><PaginaPazienti /></RottaProtetta>} />
        <Route path="pazienti/:id" element={<RottaProtetta ruolo="TERAPEUTA"><PaginaPaziente /></RottaProtetta>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
