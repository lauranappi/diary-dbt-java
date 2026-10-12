import { daChiave } from '../diario/date.js';
import { etichetteGiorno } from './calcoli.js';
import stili from './ElencoGiornate.module.css';

const formato = (data) => daChiave(data).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });

export default function ElencoGiornate({ voci, onApri }) {
  if (!voci.length) return <p className={stili.vuoto}>Nessun giorno compilato ancora.</p>;
  return (
    <div>
      {voci.map((v) => (
        <button key={v.data} type="button" className={stili.giornata} onClick={() => onApri(v)}>
          <div className={stili.testo}>
            <div className={stili.data}>{formato(v.data)}</div>
            <div className={stili.etichette}>
              {etichetteGiorno(v).map((e) => <span key={e} className={stili.etichetta}>{e}</span>)}
            </div>
          </div>
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true">
            <path d="M2.5 2.5L8 9.5L2.5 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
    </div>
  );
}
