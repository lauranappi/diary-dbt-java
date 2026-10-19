import { useEffect, useRef } from 'react';
import { haTesto } from '../../contenuti/guida/moduli.js';
import Blocchi from './Blocchi.jsx';
import { Freccia, Stella } from './Icone.jsx';
import stili from './RigaScheda.module.css';

// Una scheda del manuale nell'elenco di un modulo: si apre per leggerla, la stella la rende preferita.
export default function RigaScheda({ modulo, scheda, aperta, preferita, evidenziata, onApriChiudi, onPreferita }) {
  const radice = useRef(null);
  const testo = haTesto(scheda);

  useEffect(() => {
    if (evidenziata) radice.current?.scrollIntoView?.({ block: 'start', behavior: 'smooth' });
  }, [evidenziata]);

  const riferimento = `Manuale: ${modulo.titolo} · Scheda ${scheda.numero}${scheda.pagina ? `, p. ${scheda.pagina}` : ''}`;

  return (
    <div ref={radice} className={stili.scheda}>
      <div className={stili.testata}>
        <button
          type="button"
          className={stili.apri}
          onClick={testo ? onApriChiudi : undefined}
          aria-expanded={testo ? aperta : undefined}
          disabled={!testo}
        >
          <span className={`${stili.etichetta} ${testo ? '' : stili.spenta}`}>{scheda.etichetta || `SCHEDA ${scheda.numero}`}</span>
          <span className={`${stili.nome} ${testo ? '' : stili.spento}`}>{scheda.titolo}</span>
          {!testo && <span className={stili.inArrivo}>in arrivo</span>}
        </button>
        {testo && (
          <button
            type="button"
            className={`${stili.stella} ${preferita ? stili.accesa : ''}`}
            onClick={onPreferita}
            aria-pressed={preferita}
            aria-label={preferita ? 'Togli dai preferiti' : 'Aggiungi ai preferiti'}
          >
            <Stella piena={preferita} />
          </button>
        )}
        {testo && (
          <button type="button" className={stili.freccia} onClick={onApriChiudi} tabIndex={-1} aria-hidden="true">
            <Freccia verso="basso" aperta={aperta} />
          </button>
        )}
      </div>
      {aperta && testo && (
        <div className={stili.corpo}>
          <p className={stili.riferimento}>📖 {riferimento}</p>
          <Blocchi blocchi={scheda.blocchi} />
        </div>
      )}
    </div>
  );
}
