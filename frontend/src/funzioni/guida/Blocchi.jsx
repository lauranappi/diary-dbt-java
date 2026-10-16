import stili from './Blocchi.module.css';

// Il contenuto di una scheda: blocchi con titolo, testo e voci (elenco puntato o numerato).
export default function Blocchi({ blocchi }) {
  return (
    <div className={stili.blocchi}>
      {blocchi.map((blocco, i) => (
        <section key={i} className={stili.blocco}>
          {blocco.titolo && <h4 className={stili.titolo}>{blocco.titolo}</h4>}
          {blocco.testo && <p className={stili.testo}>{blocco.testo}</p>}
          {blocco.voci?.map((voce, n) => (
            <div key={n} className={stili.voce}>
              <span className={`${stili.segno} ${blocco.numerati ? '' : stili.punto}`}>{blocco.numerati ? n + (blocco.start ?? 1) : ''}</span>
              <p className={stili.testoVoce}>
                {typeof voce === 'string' ? voce : <><b>{voce.t}</b> {voce.d}</>}
              </p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
