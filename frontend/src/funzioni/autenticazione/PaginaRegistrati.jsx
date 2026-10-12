import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Campo from '../../componenti/Campo.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import SchermataAccesso from './SchermataAccesso.jsx';
import { useAutenticazione } from './useAutenticazione.js';
import moduli from './Moduli.module.css';

export default function PaginaRegistrati() {
  const { registrati } = useAutenticazione();
  const navigate = useNavigate();
  const [ruolo, setRuolo] = useState('PAZIENTE');
  const [dati, setDati] = useState({
    nome: '', cognome: '', email: '', username: '', password: '', codiceTerapeuta: '',
  });
  const [errore, setErrore] = useState('');
  const [inCorso, setInCorso] = useState(false);

  const cambia = (campo) => (e) => setDati((d) => ({ ...d, [campo]: e.target.value }));

  async function invia(evento) {
    evento.preventDefault();
    setErrore('');
    setInCorso(true);
    try {
      await registrati({
        ruolo,
        nome: dati.nome.trim(),
        cognome: dati.cognome.trim(),
        email: dati.email.trim(),
        username: dati.username.trim().toLowerCase(),
        password: dati.password,
        codiceTerapeuta: ruolo === 'PAZIENTE' ? dati.codiceTerapeuta.trim() : '',
      });
      navigate('/', { replace: true });
    } catch (e) {
      setErrore(e.message);
    } finally {
      setInCorso(false);
    }
  }

  return (
    <SchermataAccesso titolo="Crea il tuo account" sottotitolo="Ci vuole un minuto, poi la diary è tua.">
      <form onSubmit={invia}>
        <div className={moduli.ruoli} role="group" aria-label="Ruolo">
          {[['PAZIENTE', 'Sono una paziente'], ['TERAPEUTA', 'Sono una terapeuta']].map(([valore, testo]) => (
            <button
              key={valore}
              type="button"
              aria-pressed={ruolo === valore}
              className={`${moduli.ruolo} ${ruolo === valore ? moduli.ruoloScelto : ''}`}
              onClick={() => setRuolo(valore)}
            >
              {testo}
            </button>
          ))}
        </div>

        <Campo etichetta="Nome" value={dati.nome} onChange={cambia('nome')} autoComplete="given-name" />
        <Campo etichetta="Cognome" value={dati.cognome} onChange={cambia('cognome')} autoComplete="family-name" />
        <Campo etichetta="Email" type="email" value={dati.email} onChange={cambia('email')} autoComplete="email" autoCapitalize="none" />
        <Campo
          etichetta="Username"
          value={dati.username}
          onChange={cambia('username')}
          autoComplete="username"
          autoCapitalize="none"
          required
          suggerimento={ruolo === 'TERAPEUTA' ? 'È il codice che le tue pazienti useranno per collegarsi a te.' : undefined}
        />
        <Campo
          etichetta="Password"
          type="password"
          value={dati.password}
          onChange={cambia('password')}
          autoComplete="new-password"
          minLength={8}
          required
          suggerimento="Almeno 8 caratteri."
        />
        {ruolo === 'PAZIENTE' && (
          <Campo
            etichetta="Codice della terapeuta (facoltativo)"
            value={dati.codiceTerapeuta}
            onChange={cambia('codiceTerapeuta')}
            autoCapitalize="none"
            suggerimento="Lo puoi aggiungere anche dopo, dalle impostazioni."
          />
        )}

        <p className={moduli.messaggio} role="alert">{errore}</p>
        <Pulsante type="submit" pieno disabled={inCorso}>Crea account</Pulsante>
      </form>
      <div className={moduli.collegamenti}>
        <Link to="/accedi" className={moduli.forte}>Hai già un account?<br />Accedi</Link>
      </div>
    </SchermataAccesso>
  );
}
