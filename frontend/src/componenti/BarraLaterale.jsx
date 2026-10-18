import { NavLink } from 'react-router-dom';
import stili from './BarraLaterale.module.css';

const ETICHETTA_RUOLO = { PAZIENTE: 'Paziente', TERAPEUTA: 'Terapeuta' };

function iniziali(nome) {
  return (nome || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
}

// Barra laterale petrolio per schermi larghi (al posto della barra in basso).
// voci: [{ percorso, etichetta }]; utente: { nome, username, ruolo }
export default function BarraLaterale({ voci, utente, onEsci }) {
  const nome = [utente.nome, utente.cognome].filter(Boolean).join(' ') || utente.username;
  return (
    <aside className={stili.laterale}>
      <div className={stili.marchio}>
        <img className={stili.icona} src={`${import.meta.env.BASE_URL}illustrazioni/icona-app-chiara.svg`} alt="" width="40" height="40" />
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

      <div className={stili.piede}>
        <NavLink to="/impostazioni" className={({ isActive }) => `${stili.voce} ${isActive ? stili.attiva : ''}`}>
          <span className={stili.segno} />
          Impostazioni
        </NavLink>
        <div className={stili.utente}>
          <span className={stili.avatar} aria-hidden="true">{iniziali(nome)}</span>
          <div className={stili.dati}>
            <span className={stili.utenteNome}>{nome}</span>
            <span className={stili.ruolo}>{ETICHETTA_RUOLO[utente.ruolo] || utente.ruolo}</span>
          </div>
          <button type="button" className={stili.esci} onClick={onEsci} aria-label="Esci" title="Esci">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
