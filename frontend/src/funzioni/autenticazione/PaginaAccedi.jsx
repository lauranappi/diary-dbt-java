import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Campo from '../../componenti/Campo.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import SchermataAccesso from './SchermataAccesso.jsx';
import { useAutenticazione } from './useAutenticazione.js';
import moduli from './Moduli.module.css';

export default function PaginaAccedi() {
  const { accedi } = useAutenticazione();
  const navigate = useNavigate();
  const [nomeUtente, setNomeUtente] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const [avviso, setAvviso] = useState(false);
  const [inCorso, setInCorso] = useState(false);

  async function invia(evento) {
    evento.preventDefault();
    setErrore('');
    setInCorso(true);
    try {
      await accedi(nomeUtente.trim(), password);
      navigate('/', { replace: true });
    } catch (e) {
      setErrore(e.message);
    } finally {
      setInCorso(false);
    }
  }

  return (
    <SchermataAccesso titolo="Bentornata" sottotitolo="La diary di ieri è al sicuro: riprendi da dove eri.">
      <form onSubmit={invia}>
        <Campo
          etichetta="Email o username"
          value={nomeUtente}
          onChange={(e) => setNomeUtente(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          required
        />
        <Campo
          etichetta="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <p className={moduli.messaggio} role="alert">{errore}</p>
        <Pulsante type="submit" pieno disabled={inCorso}>Accedi</Pulsante>
      </form>

      <div className={moduli.collegamenti}>
        <Link to="/registrati" className={moduli.forte}>Non hai un account?<br />Registrati</Link>
        <button type="button" className={moduli.lieve} onClick={() => setAvviso(true)}>
          Password<br />dimenticata
        </button>
      </div>
      {avviso && (
        <p className={`${moduli.messaggio} ${moduli.messaggioNeutro}`} style={{ marginTop: 12 }}>
          Il recupero della password via email non è ancora attivo in questa versione.
        </p>
      )}
    </SchermataAccesso>
  );
}
