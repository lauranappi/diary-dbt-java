import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ProvaAutenticazione, useAutenticazione } from './AuthContext';
import RottaProtetta from './RottaProtetta';
import Accedi from './pagine/Accedi';
import Registrati from './pagine/Registrati';
import Diario from './pagine/Diario';
import Storico from './pagine/Storico';
import Terapeuta from './pagine/Terapeuta';
import './App.css';

function BarraNavigazione() {
  const { utente, esci } = useAutenticazione();
  if (!utente) return null;

  return (
    <nav className="barra-nav">
      {utente.ruolo === 'PAZIENTE' ? (
        <>
          <Link to="/">Diary</Link>
          <Link to="/storico">Storico</Link>
        </>
      ) : (
        <Link to="/terapeuta">Pazienti</Link>
      )}
      <button onClick={esci} className="pulsante-esci">Esci</button>
    </nav>
  );
}

function ContenutoApp() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <BarraNavigazione />
      <Routes>
        <Route path="/accedi" element={<Accedi />} />
        <Route path="/registrati" element={<Registrati />} />

        <Route path="/" element={
          <RottaProtetta ruoloRichiesto="PAZIENTE"><Diario /></RottaProtetta>
        } />
        <Route path="/storico" element={
          <RottaProtetta ruoloRichiesto="PAZIENTE"><Storico /></RottaProtetta>
        } />

        <Route path="/terapeuta" element={
          <RottaProtetta ruoloRichiesto="TERAPEUTA"><Terapeuta /></RottaProtetta>
        } />

        <Route path="*" element={<Navigate to="/accedi" replace />} />
      </Routes>
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
