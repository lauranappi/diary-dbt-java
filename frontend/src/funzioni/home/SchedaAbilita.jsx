import { MODULI } from '../../contenuti/suggerimenti.js';
import stili from './Schede.module.css';

// "Abilita' di oggi": un suggerimento scelto in base a come e' andata la giornata.
// Toccando la scheda si va alla Guida; "Altro" mostra un altro suggerimento.
export default function SchedaAbilita({ suggerimento, quanti, onApri, onAltro }) {
  if (!suggerimento) return null;
  const modulo = MODULI[suggerimento.guida] || MODULI.gen;
  return (
    <div className={`${stili.scheda} ${stili.abilita}`} role="link" tabIndex={0} onClick={onApri}
      onKeyDown={(e) => e.key === 'Enter' && onApri()}>
      <div className={stili.rigaAbilita}>
        <img className={stili.icona} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/${modulo.icona}.svg`} width="46" height="46" alt="" />
        <div className={stili.corpoAbilita}>
          <span className={stili.kicker}>Abilità di oggi</span>
          <span className={stili.nomeAbilita}>{suggerimento.titolo}</span>
          <span className={stili.descrizione}>{suggerimento.descrizione}</span>
          <div className={stili.etichette}>
            <span className={stili.modulo}>{modulo.nome}</span>
            <span className={stili.durata}>3 min</span>
          </div>
        </div>
      </div>
      {quanti > 1 && (
        <div className={stili.azioni}>
          <button type="button" className={stili.altro} onClick={(e) => { e.stopPropagation(); onAltro(); }}>↻ Altro</button>
        </div>
      )}
    </div>
  );
}
