import { Navigate } from 'react-router-dom';
import { useAutenticazione } from '../funzioni/autenticazione/useAutenticazione.js';

// Mostra la pagina solo a chi ha fatto l'accesso (e, se indicato, ha il ruolo giusto)
export default function RottaProtetta({ ruolo, children }) {
  const { utente } = useAutenticazione();
  if (!utente) return <Navigate to="/accedi" replace />;
  if (ruolo && utente.ruolo !== ruolo) return <Navigate to="/" replace />;
  return children;
}
