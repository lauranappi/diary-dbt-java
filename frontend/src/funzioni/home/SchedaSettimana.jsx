import stili from './Schede.module.css';

export default function SchedaSettimana({ giorni, onApri }) {
  return (
    <div className={`${stili.scheda} ${stili.settimana}`} role="link" tabIndex={0} onClick={onApri}
      onKeyDown={(e) => e.key === 'Enter' && onApri()}>
      <div className={stili.rigaTitolo}>
        <span className={stili.titolo}>Ultimi 7 giorni</span>
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" className={stili.freccia} aria-hidden="true">
          <path d="M2.5 2.5L8 9.5L2.5 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={stili.colonne}>
        {giorni.map((g) => (
          <div key={g.data} className={stili.colonna}>
            <span className={`${stili.colonnaBarra} ${g.piena ? (g.oggi ? stili.oggi : '') : stili.vuota}`} style={{ height: g.altezza }} />
            <span className={stili.lettera}>{g.lettera}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
