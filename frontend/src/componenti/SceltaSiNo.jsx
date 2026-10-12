import stili from './Scelte.module.css';

// Sì / No. Toccare di nuovo la risposta gia' data la toglie.
export default function SceltaSiNo({ etichetta, valore, onChange }) {
  return (
    <div className={stili.fila} role="group" aria-label={etichetta}>
      {['Sì', 'No'].map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={valore === v}
          className={`${stili.cella} ${stili.larga} ${valore === v ? stili.scelta : ''}`}
          onClick={() => onChange(valore === v ? null : v)}
        >
          {v}
        </button>
      ))}
    </div>
  );
}
