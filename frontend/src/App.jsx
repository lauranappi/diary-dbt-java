import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProvaAutenticazione, useAutenticazione } from './AuthContext';
import RottaProtetta from './RottaProtetta';
import Accedi from './pagine/Accedi';
import Registrati from './pagine/Registrati';
import Diario from './pagine/Diario';
import Storico from './pagine/Storico';
import Guida from './pagine/Guida';
import Impostazioni from './pagine/Impostazioni';
import PianoCrisi from './pagine/PianoCrisi';
import Terapeuta from './pagine/Terapeuta';
import BarraInferiore from './componenti/BarraInferiore';
import './App.css';

function ContenutoApp() {
  const { utente } = useAutenticazione();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app-schermo">
        <Routes>
          <Route path="/accedi" element={<Accedi />} />
          <Route path="/registrati" element={<Registrati />} />

          <Route path="/" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><Diario /></RottaProtetta>
          } />
          <Route path="/storico" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><Storico /></RottaProtetta>
          } />
          <Route path="/guida" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><Guida /></RottaProtetta>
          } />
          <Route path="/impostazioni" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><Impostazioni /></RottaProtetta>
          } />
          <Route path="/piano-crisi" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><PianoCrisi /></RottaProtetta>
          } />

          <Route path="/terapeuta" element={
            <RottaProtetta ruoloRichiesto="TERAPEUTA"><Terapeuta /></RottaProtetta>
          } />

          <Route path="*" element={<Navigate to="/accedi" replace />} />
        </Routes>

        {utente?.ruolo === 'PAZIENTE' && <BarraInferiore />}
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ProvaAutenticazione>
      <ContenutoApp />
    </ProvaAutenticazione>
  );
}
