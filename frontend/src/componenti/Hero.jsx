import stili from './Hero.module.css';

// Testata petrolio con onda in basso (e un ramo decorativo).
//   <Hero saluto="Lunedì 12 ottobre" titolo="Buonasera, Laura" sottotitolo="..." azione={<Pulsante/>} angolo={<Bottone/>} />
export default function Hero({ saluto, titolo, sottotitolo, azione, angolo }) {
  return (
    <header className={stili.hero}>
      <img className={stili.decorazione} src={`${import.meta.env.BASE_URL}illustrazioni/decorative/deco-tratti-chiaro.svg`} alt="" />
      <svg className={stili.onda} viewBox="0 0 390 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 13C52 33 104 3 156 13C208 23 260 -1 312 8C342 13 368 19 390 15V41H0V13Z" />
      </svg>
      <div className={stili.riga}>
        <div className={stili.testo}>
          {saluto && <span className={stili.saluto}>{saluto}</span>}
          <h1 className={stili.titolo}>{titolo}</h1>
          {sottotitolo && <p className={stili.sottotitolo}>{sottotitolo}</p>}
          {azione}
        </div>
        {angolo}
      </div>
    </header>
  );
}
