import { useEffect, useRef } from 'react';
import { chiave, giornoCorto } from './date.js';
import stili from './StrisciaGiorni.module.css';

// Gli ultimi giorni in fila: il selezionato e' petrolio, quelli compilati hanno il pallino giallo
export default function StrisciaGiorni({ giorni, selezionato, compilati, onScegli }) {
  const scelto = useRef(null);
  const chiaveScelto = chiave(selezionato);

  useEffect(() => {
    scelto.current?.scrollIntoView?.({ inline: 'center', block: 'nearest' });
  }, [chiaveScelto]);

  return (
    <div className={stili.striscia}>
      {giorni.map((giorno) => {
        const k = chiave(giorno);
        const sel = k === chiaveScelto;
        return (
          <button
            key={k}
            ref={sel ? scelto : null}
            type="button"
            aria-pressed={sel}
            aria-label={`${giorno.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}${compilati.has(k) ? ', compilato' : ''}`}
            className={`${stili.giorno} ${sel ? stili.sel : ''}`}
            onClick={() => onScegli(giorno)}
          >
            <span className={stili.sigla}>{giornoCorto(giorno)}</span>
            <span className={stili.numero}>{giorno.getDate()}</span>
            <span className={`${stili.pallino} ${compilati.has(k) ? stili.piena : ''}`} />
          </button>
        );
      })}
    </div>
  );
}
