export default function Intestazione({ sopraTitolo, titolo, sottotitolo, azioni }) {
  return (
    <div className="dc-hero">
      <svg className="dc-onda" viewBox="0 0 390 40" preserveAspectRatio="none">
        <path d="M0 13C52 33 104 3 156 13C208 23 260 -1 312 8C342 13 368 19 390 15V41H0V13Z" />
      </svg>
      <div className="dc-hero-riga">
        <div>
          {sopraTitolo && <span className="dc-hero-data">{sopraTitolo}</span>}
          <h1 className="dc-hero-tit">{titolo}</h1>
          {sottotitolo && <p className="dc-hero-sub">{sottotitolo}</p>}
        </div>
        {azioni}
      </div>
    </div>
  );
}
