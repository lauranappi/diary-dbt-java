import { Navigate } from 'react-router-dom';
import { useAutenticazione } from './AuthContext';

// Avvolge una pagina che richiede di essere autenticati. Se ruoloRichiesto
// e' passato, blocca anche chi ha l'altro ruolo (es. una paziente che
// prova ad aprire la pagina della terapeuta).
export default function RottaProtetta({ children, ruoloRichiesto }) {
  const { utente } = useAutenticazione();

  if (!utente) {
    return <Navigate to="/accedi" replace />;
  }

  if (ruoloRichiesto && utente.ruolo !== ruoloRichiesto) {
    return <Navigate to="/" replace />;
  }

  return children;
}
