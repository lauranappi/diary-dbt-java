import { useState } from 'react';
import Pannello from '../../componenti/Pannello.jsx';
import { GRUPPI_FOGLI } from '../../contenuti/fogli/index.js';
import { adattaMarea } from '../fogli/adattaMarea.js';
import { pienoDiTesto } from '../fogli/unisciFogli.js';
import FormFoglio from '../fogli/FormFoglio.jsx';
import { anteprima } from '../fogli/riassunto.js';
import stili from '../fogli/Fogli.module.css';
import VistaPianoCrisi from './VistaPianoCrisi.jsx';
import { useDocumentiPaziente } from './useDocumentiPaziente.js';

const dataBreve = (ts) => new Date(ts).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });

// I fogli di lavoro compilati da una paziente, per modulo, in sola lettura
export default function FogliPaziente({ pazienteId }) {
  const { documenti, caricamento, errore } = useDocumentiPaziente(pazienteId);
  const [aperto, setAperto] = useState(null); // { foglio, voce }

  if (errore) return <p className={stili.errore} role="alert">Non riesco a caricare i fogli: controlla la connessione e riprova.</p>;
  if (caricamento) return null;
  const fogli = adattaMarea(documenti?.fogli?.contenuto) ?? {};
  const generici = fogli.generici ?? {};
  const haPiano = pienoDiTesto(fogli.pianoCrisi);
  const gruppi = GRUPPI_FOGLI
    .map((g) => ({ ...g, fogli: g.fogli.filter((f) => generici[f.id]?.length) }))
    .filter((g) => g.fogli.length);
  if (!gruppi.length && !haPiano) return <p className={stili.vuoto}>Nessun foglio di lavoro compilato.</p>;

  return (
    <>
      {haPiano && (
        <section className={stili.gruppo} aria-label="Piano di crisi">
          <h2 className={stili.nomeGruppo}>Piano di crisi</h2>
          <VistaPianoCrisi piano={fogli.pianoCrisi} />
        </section>
      )}
      {gruppi.map((g) => (
        <section key={g.id} className={stili.gruppo} aria-label={g.nome}>
          <h2 className={stili.nomeGruppo}>{g.nome}</h2>
          {g.fogli.map((f) => (
            <div key={f.id}>
              <h3 className={stili.titoloSezione}>{f.titolo}</h3>
              {[...generici[f.id]].sort((a, b) => b.ts - a.ts).map((voce) => (
                <button key={voce.id} type="button" className={stili.riga} onClick={() => setAperto({ foglio: f, voce })}>
                  <span className={stili.testoRiga}>
                    <span className={stili.data}>{dataBreve(voce.ts)}</span>
                    <span className={stili.anteprima}>{anteprima(f, voce.v)}</span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </section>
      ))}
      {aperto && (
        <Pannello titolo={aperto.foglio.titolo} onChiudi={() => setAperto(null)}>
          <FormFoglio foglio={aperto.foglio} voce={aperto.voce} soloLettura onIndietro={() => setAperto(null)} />
        </Pannello>
      )}
    </>
  );
}
