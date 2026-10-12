import { useEffect } from 'react';
import stili from './Pannello.module.css';

// Pannello che sale dal basso sopra la pagina (dettaglio di un giorno, schede, fogli...).
// Si chiude con la X, toccando lo sfondo o con Esc.
export default function Pannello({ titolo, onChiudi, children }) {
  useEffect(() => {
    const alTasto = (e) => e.key === 'Escape' && onChiudi();
    document.addEventListener('keydown', alTasto);
    return () => document.removeEventListener('keydown', alTasto);
  }, [onChiudi]);

  return (
    <div className={stili.sfondo} onClick={onChiudi}>
      <div className={stili.pannello} role="dialog" aria-modal="true" aria-label={titolo} onClick={(e) => e.stopPropagation()}>
        <div className={stili.testata}>
          <h2 className={stili.titolo}>{titolo}</h2>
          <button type="button" className={stili.chiudi} onClick={onChiudi} aria-label="Chiudi">×</button>
        </div>
        <div className={stili.corpo}>{children}</div>
      </div>
    </div>
  );
}
