import stili from './Avviso.module.css';

// Il messaggio che compare in basso per un attimo ("Salvato"). Con errore diventa rosso.
export default function Avviso({ testo, errore = false }) {
  if (!testo) return null;
  return (
    <p className={`${stili.avviso} ${errore ? stili.errore : ''}`} role="status">
      {!errore && <span className={stili.spunta} aria-hidden="true">✓</span>}
      {testo}
    </p>
  );
}
