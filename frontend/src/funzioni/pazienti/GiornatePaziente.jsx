import { daChiave } from '../diario/date.js';
import { giornatePianificate } from './calcoliPaziente.js';
import stili from './VistePaziente.module.css';

const formato = (data) => daChiave(data).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' });

// Le giornate che la paziente ha pianificato (mattina, pomeriggio, sera)
export default function GiornatePaziente({ voci }) {
  const giornate = giornatePianificate(voci);
  if (!giornate.length) {
    return (
      <div className={stili.vuotoIllustrato}>
        <img src={`${import.meta.env.BASE_URL}illustrazioni/vuoti/vuoto-attivita.svg`} width="150" height="150" alt="" />
        <p className={stili.vuoto}>Nessuna giornata pianificata in questo periodo.</p>
      </div>
    );
  }
  return (
    <div>
      {giornate.map((g) => (
        <section key={g.data} aria-label={formato(g.data)}>
          <h3 className={stili.data}>{formato(g.data)}</h3>
          <div className={stili.giornata}>
            {g.fasce.map((f) => (
              <div key={f.etichetta} className={stili.fascia}>
                <span className={stili.kicker}>{f.etichetta}</span>
                <div className={stili.pillole}>
                  {f.attivita.map((a) => <span key={a} className={stili.pillola}>{a}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
