import { NavLink, useNavigate } from 'react-router-dom';
import stili from './BarraLaterale.module.css';

const ETICHETTA_RUOLO = { PAZIENTE: 'Paziente', TERAPEUTA: 'Terapeuta' };

function iniziali(nome) {
  return (nome || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
}

// Barra laterale petrolio per schermi larghi (al posto della barra in basso).
// voci: [{ percorso, etichetta }]; utente: { nome, cognome, username, ruolo }.
// In fondo il nome apre le impostazioni, come in Marea.
export default function BarraLaterale({ voci, utente }) {
  const navigate = useNavigate();
  const nome = [utente.nome, utente.cognome].filter(Boolean).join(' ') || utente.username;
  return (
    <aside className={stili.laterale}>
      <div className={stili.scorri}>
        <div className={stili.marchio}>
          <img className={stili.icona} src={`${import.meta.env.BASE_URL}illustrazioni/icona-app.svg`} alt="" width="40" height="40" />
          <span className={stili.nome}>Marea</span>
        </div>

        <nav className={stili.nav} aria-label="Navigazione laterale">
          {voci.map((voce) => (
            <NavLink
              key={voce.percorso}
              to={voce.percorso}
              end={voce.percorso === '/'}
              className={({ isActive }) => `${stili.voce} ${isActive ? stili.attiva : ''}`}
            >
              <span className={stili.segno} />
              {voce.etichetta}
            </NavLink>
          ))}
        </nav>
      </div>

      <button type="button" className={stili.utente} onClick={() => navigate('/impostazioni')} aria-label="Impostazioni">
        <span className={stili.avatar} aria-hidden="true">{iniziali(nome)}</span>
        <span className={stili.dati}>
          <span className={stili.utenteNome}>{nome}</span>
          <span className={stili.ruolo}>{ETICHETTA_RUOLO[utente.ruolo] || utente.ruolo}</span>
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </aside>
  );
}
