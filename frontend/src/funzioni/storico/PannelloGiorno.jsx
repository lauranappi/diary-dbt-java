import Pannello from '../../componenti/Pannello.jsx';
import {
  coloreScala, ETICHETTE_SCALE, ETICHETTE_SINO, ETICHETTE_TESTI, SCALE_EMOZIONI, SCALE_POSITIVE,
  SCALE_RISCHIO, SINO_RISCHIO, TESTI_RISCHIO,
} from '../../contenuti/etichette.js';
import { FASCE } from '../../contenuti/attivita.js';
import { daChiave } from '../diario/date.js';
import stili from './PannelloGiorno.module.css';

function Scheda({ titolo, children }) {
  return (
    <section className={stili.scheda}>
      <h3 className={stili.kicker}>{titolo}</h3>
      {children}
    </section>
  );
}

function Barre({ ids, scale }) {
  return (
    <div className={stili.barre}>
      {ids.map((id) => (
        <div key={id} className={stili.barra}>
          <span className={stili.nome}>{ETICHETTE_SCALE[id]}</span>
          <span className={stili.binario}><i style={{ width: `${Math.min(100, (scale[id] / 5) * 100)}%`, background: coloreScala(scale[id], SCALE_POSITIVE.has(id)) }} /></span>
          <span className={stili.valore}>{scale[id]}</span>
        </div>
      ))}
    </div>
  );
}

const Pillole = ({ voci }) => (
  <div className={stili.pillole}>{voci.map((v) => <span key={v} className={stili.pillola}>{v}</span>)}</div>
);

// Il dettaglio di un giorno: comportamenti, emozioni, piano e abilita' usate
export default function PannelloGiorno({ voce, onChiudi }) {
  const scale = voce.scale || {};
  const sino = voce.toggle || {};
  const testi = voce.testi || {};
  const titolo = daChiave(voce.data).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const scaleRischio = SCALE_RISCHIO.filter((id) => scale[id] != null);
  const sinoRischio = SINO_RISCHIO.filter((id) => sino[id]);
  const testiRischio = TESTI_RISCHIO.filter((id) => testi[id]?.trim());
  const emozioni = SCALE_EMOZIONI.filter((id) => scale[id] != null);
  const piano = FASCE.filter((f) => voce.planner?.[f.id]?.length);
  const abilita = Object.keys(voce.abilitaUsate || {}).filter((id) => voce.abilitaUsate[id]);
  const vuoto = !scaleRischio.length && !sinoRischio.length && !testiRischio.length && !emozioni.length && !piano.length && !abilita.length;

  return (
    <Pannello titolo={titolo} onChiudi={onChiudi}>
      {(scaleRischio.length > 0 || sinoRischio.length > 0 || testiRischio.length > 0) && (
        <Scheda titolo="Comportamenti e sostanze">
          <Barre ids={scaleRischio} scale={scale} />
          {sinoRischio.length > 0 && (
            <div className={stili.pillole}>
              {sinoRischio.map((id) => {
                const pericolo = sino[id] === 'Sì' && (id === 'sa' || id === 'aa');
                const classe = pericolo ? stili.pericolo : sino[id] === 'Sì' ? stili.si : stili.no;
                return <span key={id} className={`${stili.pillola} ${classe}`}>{ETICHETTE_SINO[id]}: {sino[id]}</span>;
              })}
            </div>
          )}
          {testiRischio.map((id) => (
            <div key={id}>
              <div className={stili.kicker}>{ETICHETTE_TESTI[id]}</div>
              <div className={stili.testo}>{testi[id]}</div>
            </div>
          ))}
        </Scheda>
      )}
      {emozioni.length > 0 && (
        <Scheda titolo="Emozioni e benessere"><Barre ids={emozioni} scale={scale} /></Scheda>
      )}
      {piano.length > 0 && (
        <Scheda titolo="Piano giornata">
          {piano.map((f) => (
            <div key={f.id}>
              <div className={`${stili.kicker} ${stili.sotto}`}>{f.etichetta}</div>
              <Pillole voci={voce.planner[f.id]} />
            </div>
          ))}
        </Scheda>
      )}
      {abilita.length > 0 && (
        <Scheda titolo="Abilità DBT usate">
          <Pillole voci={abilita.map((id) => id.replace(/^sk_/, '').split('_').slice(1).join(' '))} />
        </Scheda>
      )}
      {vuoto && <p className={stili.nulla}>Nessun dato compilato.</p>}
    </Pannello>
  );
}
