import stili from './Scelte.module.css';

// Una fila di celle 0..max. Toccare la cella gia' scelta la toglie.
export default function ScalaNumerica({ etichetta, valore, onChange, max = 5, ultimaEtichetta, classeFila = '', classeCella = '' }) {
  return (
    <div className={`${stili.fila} ${classeFila}`} role="group" aria-label={etichetta}>
      {Array.from({ length: max + 1 }, (_, n) => (
        <button
          key={n}
          type="button"
          aria-pressed={valore === n}
          className={`${stili.cella} ${valore === n ? stili.scelta : ''} ${classeCella}`}
          onClick={() => onChange(valore === n ? null : n)}
        >
          {n === max && ultimaEtichetta ? ultimaEtichetta : n}
        </button>
      ))}
    </div>
  );
}
