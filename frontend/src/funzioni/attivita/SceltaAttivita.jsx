import { useState } from 'react';
import { CATEGORIE_ATTIVITA } from '../../contenuti/attivita.js';
import stili from './SceltaAttivita.module.css';

const LE_MIE = 'mie';
const FRECCIA = <path d="M8 2.5L2.5 9.5L8 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />;

function Stella({ piena }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill={piena ? 'currentColor' : 'none'} aria-hidden="true">
      <path d="M7 1l1.76 3.76L13 5.27l-3 2.98.7 4.25L7 10.5l-3.7 1.99.7-4.25-3-2.98 4.24-.51z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

// Seconda schermata: si scelgono le attivita' per una fascia, per categoria, e se ne puo' aggiungere una propria
export default function SceltaAttivita({
  fascia, scelte, mie, onAlterna, onAggiungiPersonale, onAlternaPreferita, onTogliPersonale, onIndietro,
}) {
  const [categoria, setCategoria] = useState(LE_MIE);
  const [testo, setTesto] = useState('');
  const [aggiunta, setAggiunta] = useState(false);
  const voci = categoria === LE_MIE ? mie : CATEGORIE_ATTIVITA.find((c) => c.id === categoria).voci;

  function aggiungi() {
    const voce = testo.trim();
    if (!voce) return;
    onAggiungiPersonale(voce);
    setTesto('');
    setAggiunta(true);
    setTimeout(() => setAggiunta(false), 1200);
  }

  const pillola = (voce) => {
    const scelta = scelte.includes(voce);
    return (
      <button type="button" aria-pressed={scelta} className={`${stili.pillola} ${scelta ? stili.scelta : ''}`} onClick={() => onAlterna(voce)}>
        {scelta ? '✓ ' : ''}{voce}
      </button>
    );
  };

  return (
    <div className={stili.scelta}>
      <div className={stili.titolo}>
        <button type="button" className={stili.indietro} onClick={onIndietro} aria-label="Indietro">
          <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true">{FRECCIA}</svg>
        </button>
        <h2>Scegli le attività</h2>
      </div>
      <p className={stili.fascia}>{fascia}</p>

      <div className={stili.linguette} role="tablist" aria-label="Categorie">
        {[{ id: LE_MIE, etichetta: 'Le mie' }, ...CATEGORIE_ATTIVITA].map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={categoria === c.id}
            className={`${stili.linguetta} ${categoria === c.id ? stili.attiva : ''}`} onClick={() => setCategoria(c.id)}>
            {c.etichetta}
          </button>
        ))}
      </div>

      <div className={stili.elenco}>
        {categoria === LE_MIE && voci.length === 0 && (
          <p className={stili.nessuna}>Nessuna attività salvata.<br />Aggiungile qui sotto e resteranno sempre disponibili.</p>
        )}
        {voci.map((voce) => (
          <div key={voce} className={stili.voce}>
            {pillola(voce)}
            {categoria === LE_MIE ? (
              <button type="button" className={stili.piccolo} onClick={() => onTogliPersonale(voce)} aria-label={`Rimuovi ${voce}`} title="Rimuovi">×</button>
            ) : (
              <button type="button" className={stili.piccolo} onClick={() => onAlternaPreferita(voce)}
                aria-label={mie.includes(voce) ? `Togli ${voce} dalle mie attività` : `Aggiungi ${voce} alle mie attività`}>
                <Stella piena={mie.includes(voce)} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={stili.personale}>
        <label className={stili.etichetta} htmlFor="attivita-personale">Aggiungi attività personalizzata</label>
        <div className={stili.riga}>
          <input id="attivita-personale" className={stili.campo} type="text" value={testo}
            placeholder={aggiunta ? '✓ Aggiunta!' : 'Es. chiamata con amica...'}
            onChange={(e) => setTesto(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && aggiungi()} />
          <button type="button" className={stili.piu} onClick={aggiungi} aria-label="Aggiungi">+</button>
        </div>
      </div>
    </div>
  );
}
