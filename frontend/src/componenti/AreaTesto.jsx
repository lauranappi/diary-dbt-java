import { useId } from 'react';
import stili from './AreaTesto.module.css';

// Campo di testo del diario: una riga ("riga") o piu' righe ("area").
export default function AreaTesto({ etichetta, multilinea = false, ...resto }) {
  const id = useId();
  const Elemento = multilinea ? 'textarea' : 'input';
  return (
    <div className={stili.contenitore}>
      {etichetta && <label htmlFor={id} className={stili.etichetta}>{etichetta}</label>}
      <Elemento id={id} className={stili.campo} {...(multilinea ? { rows: 3 } : { type: 'text' })} {...resto} />
    </div>
  );
}
