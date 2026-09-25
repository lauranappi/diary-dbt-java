import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutenticazione } from '../AuthContext';

export default function Accedi() {
  const { accedi } = useAutenticazione();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState(null);
  const [caricamento, setCaricamento] = useState(false);

  async function gestisciInvio(e) {
    e.preventDefault();
    setErrore(null);
    setCaricamento(true);
    try {
      const utente = await accedi(username, password);
      navigate(utente.ruolo === 'TERAPEUTA' ? '/terapeuta' : '/');
    } catch (err) {
      setErrore(err.message);
    } finally {
      setCaricamento(false);
    }
  }

  return (
    <div className="pagina-centrata">
      <form onSubmit={gestisciInvio} className="scheda-form">
        <h1>Accedi</h1>

        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errore && <p className="messaggio-errore">{errore}</p>}

        <button type="submit" disabled={caricamento}>
          {caricamento ? 'Accesso in corso...' : 'Accedi'}
        </button>

        <p>
          Non hai un account? <Link to="/registrati">Registrati</Link>
        </p>
      </form>
    </div>
  );
}
