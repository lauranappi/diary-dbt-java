import stili from './Interruttore.module.css';

// Interruttore acceso/spento (una casella accessibile vestita da interruttore)
export default function Interruttore({ acceso, onCambia, etichetta, disabilitato = false }) {
  return (
    <label className={stili.interruttore}>
      <input type="checkbox" role="switch" checked={acceso} disabled={disabilitato} aria-label={etichetta}
        onChange={(e) => onCambia(e.target.checked)} />
      <span className={stili.binario} />
    </label>
  );
}
