import { NavLink } from 'react-router-dom';

const ICONE = {
  diary: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  ),
  storico: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  guida: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
  impostazioni: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1Z" />
    </svg>
  ),
};

export default function BarraInferiore() {
  return (
    <nav className="dc-bottom-nav">
      <NavLink to="/" end className={({ isActive }) => 'dc-bn-btn' + (isActive ? ' attivo' : '')}>
        <span className="dc-bn-icona">{ICONE.diary}</span>
        Diary
      </NavLink>
      <NavLink to="/storico" className={({ isActive }) => 'dc-bn-btn' + (isActive ? ' attivo' : '')}>
        <span className="dc-bn-icona">{ICONE.storico}</span>
        Storico
      </NavLink>
      <NavLink to="/guida" className={({ isActive }) => 'dc-bn-btn' + (isActive ? ' attivo' : '')}>
        <span className="dc-bn-icona">{ICONE.guida}</span>
        Guida
      </NavLink>
      <NavLink to="/impostazioni" className={({ isActive }) => 'dc-bn-btn' + (isActive ? ' attivo' : '')}>
        <span className="dc-bn-icona">{ICONE.impostazioni}</span>
        Impostazioni
      </NavLink>
    </nav>
  );
}
