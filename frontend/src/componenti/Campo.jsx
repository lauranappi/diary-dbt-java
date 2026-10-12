import { useId } from 'react';
import stili from './Campo.module.css';

// Etichetta + campo di testo con suggerimento facoltativo.
export default function Campo({ etichetta, suggerimento, ...resto }) {
  const id = useId();
  return (
    <div className={stili.campo}>
      <label htmlFor={id} className={stili.etichetta}>{etichetta}</label>
      <input id={id} className={stili.input} {...resto} />
      {suggerimento && <p className={stili.suggerimento}>{suggerimento}</p>}
    </div>
  );
}
