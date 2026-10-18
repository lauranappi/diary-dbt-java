import { useSchermoLargo } from '../app/useSchermoLargo.js';
import stili from './Hero.module.css';

const dataOggi = () => new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });

// Testata petrolio con onda in basso (e un ramo decorativo).
// semplice: titolo come un h2 di pagina (Abilita, Impostazioni); inAlto: senza spazio sopra (Impostazioni).
// Con soloDesktop la testata verde si vede da 701px in su; sul telefono resta un'intestazione
// trasparente sullo sfondo crema (come Diary, Abilita e Attivita di Marea).
//   <Hero saluto="Lunedì 12 ottobre" titolo="Buonasera, Laura" sottotitolo="..." azione={<Pulsante/>} angolo={<Bottone/>} />
export default function Hero({ saluto, titolo, sottotitolo, azione, angolo, soloDesktop = false, semplice = false, inAlto = false, className = '' }) {
  // Da schermo largo sopra il titolo c'e' la data (come in Marea su desktop) e il ramo al posto dei tratti
  const largo = useSchermoLargo();
  const kicker = largo ? dataOggi() : saluto;
  return (
    <header className={`${stili.hero} ${soloDesktop ? stili.soloDesktop : ''} ${semplice ? stili.semplice : ''} ${inAlto ? stili.inAlto : ''} ${className}`}>
      <img className={stili.decorazione} src={`${import.meta.env.BASE_URL}illustrazioni/decorative/${largo ? 'deco-ramo-chiaro' : 'deco-tratti-chiaro'}.svg`} alt="" />
      <svg className={stili.onda} viewBox="0 0 390 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 13C52 33 104 3 156 13C208 23 260 -1 312 8C342 13 368 19 390 15V41H0V13Z" />
      </svg>
      <div className={stili.riga}>
        <div className={stili.testo}>
          {kicker && <span className={`${stili.saluto} ${largo ? stili.dataLarga : ''}`}>{kicker}</span>}
          <h1 className={stili.titolo}>{titolo}</h1>
          {sottotitolo && <p className={stili.sottotitolo}>{sottotitolo}</p>}
          {azione && <div className={stili.azione}>{azione}</div>}
        </div>
        {angolo}
      </div>
    </header>
  );
}
