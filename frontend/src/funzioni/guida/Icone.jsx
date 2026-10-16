export function Stella({ piena }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill={piena ? 'var(--senape)' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 3.2l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L3.4 9.5l6-.8z" />
    </svg>
  );
}

export function Freccia({ aperta = false, verso = 'destra' }) {
  const rotazione = verso === 'basso' ? (aperta ? 'rotate(270deg)' : 'rotate(90deg)') : 'none';
  return (
    <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true" style={{ transform: rotazione, flex: 'none' }}>
      <path d="M2.5 2.5L8 9.5L2.5 16.5" stroke="var(--petrolio)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Lente() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
