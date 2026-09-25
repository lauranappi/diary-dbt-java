import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ProvaAutenticazione, useAutenticazione } from './AuthContext';
import RottaProtetta from './RottaProtetta';
import Accedi from './pagine/Accedi';
import Registrati from './pagine/Registrati';
import Diario from './pagine/Diario';
import Storico from './pagine/Storico';
import Guida from './pagine/Guida';
import Impostazioni from './pagine/Impostazioni';
import PianoCrisi from './pagine/PianoCrisi';
import CatenaEventi from './pagine/CatenaEventi';
import DearMan from './pagine/DearMan';
import Terapeuta from './pagine/Terapeuta';
import BarraInferiore from './componenti/BarraInferiore';
import './App.css';

function ContenutoApp() {
  const { utente } = useAutenticazione();
  const posizione = useLocation();

  return (
    <div className="app-schermo">
      {/* La chiave legata al percorso forza React a rimontare questo div
          a ogni cambio pagina, cosi' l'animazione CSS (che parte solo al
          montaggio) riparte da capo invece di restare ferma. */}
      <div key={posizione.pathname} className="contenitore-transizione">
        <Routes location={posizione}>
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
          <Route path="/catena-eventi" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><CatenaEventi /></RottaProtetta>
          } />
          <Route path="/dear-man" element={
            <RottaProtetta ruoloRichiesto="PAZIENTE"><DearMan /></RottaProtetta>
          } />

          <Route path="/terapeuta" element={
            <RottaProtetta ruoloRichiesto="TERAPEUTA"><Terapeuta /></RottaProtetta>
          } />

          <Route path="*" element={<Navigate to="/accedi" replace />} />
        </Routes>
      </div>

      {utente?.ruolo === 'PAZIENTE' && <BarraInferiore />}
    </div>
  );
}

export default function App() {
  return (
    <ProvaAutenticazione>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ContenutoApp />
      </BrowserRouter>
    </ProvaAutenticazione>
  );
}
