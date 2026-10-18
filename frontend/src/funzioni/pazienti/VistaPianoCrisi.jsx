import { SEZIONI_PIANO_CRISI } from '../../contenuti/pianoCrisi.js';
import stili from '../fogli/PianoCrisi.module.css';

// Il piano di crisi di una paziente, in sola lettura (solo le parti compilate)
export default function VistaPianoCrisi({ piano }) {
  return (
    <>
      {SEZIONI_PIANO_CRISI.map((sezione) => {
        const righe = sezione.campi.map((c) => piano[c.k]).filter((x) => typeof x === 'string' && x.trim());
        if (!righe.length) return null;
        return (
          <section key={sezione.titolo} className={stili.scheda} aria-label={sezione.titolo}>
            <h3 className={stili.titolo}>{sezione.titolo}</h3>
            <div className={stili.lettura}>
              {righe.map((r) => <p key={r} className={stili.voce}>{r}</p>)}
            </div>
          </section>
        );
      })}
    </>
  );
}
