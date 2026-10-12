import stili from './Pillole.module.css';

// Una fila di pillole di cui una sola e' scelta (periodo, Storico/Trend)
export default function Pillole({ nome, opzioni, valore, onScegli }) {
  return (
    <div className={stili.fila} role="group" aria-label={nome}>
      {opzioni.map((o) => (
        <button key={o.valore} type="button" aria-pressed={o.valore === valore}
          className={`${stili.pillola} ${o.valore === valore ? stili.attiva : ''}`} onClick={() => onScegli(o.valore)}>
          {o.etichetta}
        </button>
      ))}
    </div>
  );
}
