import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAutenticazione } from '../AuthContext';

export default function Registrati() {
  const { registrati } = useAutenticazione();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ruolo, setRuolo] = useState('PAZIENTE');
  const [errore, setErrore] = useState(null);
  const [caricamento, setCaricamento] = useState(false);
  const [codiceRicevuto, setCodiceRicevuto] = useState(null);

  async function gestisciInvio(e) {
    e.preventDefault();
    setErrore(null);
    setCaricamento(true);
    try {
      const utente = await registrati(username, password, ruolo);
      if (utente.ruolo === 'PAZIENTE' && utente.codicePaziente) {
        // mostro il codice prima di andare avanti - la paziente deve
        // poterlo copiare/annotare per comunicarlo alla terapeuta
        setCodiceRicevuto(utente.codicePaziente);
      } else {
        navigate('/terapeuta');
      }
    } catch (err) {
      setErrore(err.message);
    } finally {
      setCaricamento(false);
    }
  }

  if (codiceRicevuto) {
    return (
      <div className="pagina-centrata">
        <div className="scheda-form">
          <h1>Registrazione completata</h1>
          <p>Il tuo codice, da comunicare alla tua terapeuta per collegarvi:</p>
          <p className="codice-grande">{codiceRicevuto}</p>
          <p className="nota-piccola">
            Comunicalo a voce o di persona — non è pensato per essere scritto
            in un messaggio.
          </p>
          <button onClick={() => navigate('/')}>Vai al diario</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-centrata">
      <form onSubmit={gestisciInvio} className="scheda-form">
        <h1>Registrati</h1>

        <label>
          Sono...
          <select value={ruolo} onChange={(e) => setRuolo(e.target.value)}>
            <option value="PAZIENTE">Una paziente</option>
            <option value="TERAPEUTA">Una terapeuta</option>
          </select>
        </label>

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
          Password (almeno 8 caratteri)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>

        {errore && <p className="messaggio-errore">{errore}</p>}

        <button type="submit" disabled={caricamento}>
          {caricamento ? 'Registrazione in corso...' : 'Registrati'}
        </button>

        <p>
          Hai già un account? <Link to="/accedi">Accedi</Link>
        </p>
      </form>
    </div>
  );
}
