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
    </nav>
  );
}
