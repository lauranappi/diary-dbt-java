import { FASCE } from '../../contenuti/attivita.js';
import stili from './RiepilogoPiano.module.css';

// Le tre fasce della giornata con le attivita' scelte. Toccare una pillola la toglie.
export default function RiepilogoPiano({ piano, onAggiungi, onTogli }) {
  return (
    <div>
      {FASCE.map(({ id, etichetta }) => (
        <section key={id} className={stili.fascia} aria-label={etichetta}>
          <div className={stili.testata}>
            <h2 className={stili.titolo}>{etichetta}</h2>
            <button type="button" className={stili.piu} onClick={() => onAggiungi(id)} aria-label={`Aggiungi alla fascia ${etichetta}`}>+</button>
          </div>
          {piano[id].length === 0 ? (
            <span className={stili.vuota}>Niente ancora</span>
          ) : (
            <div className={stili.pillole}>
              {piano[id].map((voce) => (
                <button key={voce} type="button" className={stili.pillola} onClick={() => onTogli(id, voce)} title="Tocca per togliere">
                  {voce}
                </button>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
