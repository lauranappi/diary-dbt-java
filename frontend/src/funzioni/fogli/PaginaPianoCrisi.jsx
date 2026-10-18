import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { CHIAVI_PIANO_CRISI, SEZIONI_PIANO_CRISI } from '../../contenuti/pianoCrisi.js';
import { useFogli } from './useFogli.js';
import stili from './PianoCrisi.module.css';

// Il piano di crisi: un documento unico, che si completa quando si sta bene e si rilegge quando serve
export default function PaginaPianoCrisi() {
  const { pianoCrisi, salvaPianoCrisi, stato } = useFogli();
  // finché non si modifica nulla si mostra quello salvato (può arrivare dal server dopo l'apertura)
  const [modifiche, setModifiche] = useState({});
  const [salvato, setSalvato] = useState(false);
  const valore = (k) => modifiche[k] ?? pianoCrisi[k] ?? '';
  const scrivi = (k) => (e) => { setModifiche((m) => ({ ...m, [k]: e.target.value })); setSalvato(false); };

  const salva = () => {
    const piano = {};
    for (const k of CHIAVI_PIANO_CRISI) piano[k] = valore(k);
    salvaPianoCrisi(piano);
    setModifiche({});
    setSalvato(true);
  };

  return (
    <>
      <Hero soloDesktop semplice titolo="Piano di crisi" sottotitolo="Le mie abilità e contatti per i momenti difficili" />
      <div className={stili.contenuto}>
        <Link to="/fogli" className={stili.indietro}>← Fogli di lavoro</Link>
        {SEZIONI_PIANO_CRISI.map((sezione) => (
          <section key={sezione.titolo} className={stili.scheda} aria-label={sezione.titolo}>
            <h2 className={stili.titolo}>{sezione.titolo}</h2>
            {sezione.aiuto && <p className={stili.aiuto}>{sezione.aiuto}</p>}
            {sezione.fissi && (
              <ul className={stili.fissi}>
                {sezione.fissi.map(([nome, numero]) => <li key={nome}><b>{nome}:</b> {numero}</li>)}
              </ul>
            )}
            {sezione.etichetta && <span className={stili.etichetta}>{sezione.etichetta}</span>}
            {sezione.campi.map((c, i) => (
              <div key={c.k} className={stili.riga}>
                {sezione.numerati && <span className={stili.numero}>{i + 1}</span>}
                <label className={stili.gruppo}>
                  {c.l && <span className={stili.etichetta}>{c.l}</span>}
                  {c.multilinea ? (
                    <textarea className={stili.campo} rows={3} value={valore(c.k)} onChange={scrivi(c.k)} placeholder={c.segnaposto} aria-label={c.l || sezione.titolo} />
                  ) : (
                    <input type="text" className={stili.campo} value={valore(c.k)} onChange={scrivi(c.k)} placeholder={c.segnaposto} aria-label={`${sezione.titolo} ${i + 1}`} />
                  )}
                </label>
              </div>
            ))}
          </section>
        ))}
        <Pulsante pieno onClick={salva}>Salva il piano</Pulsante>
        <p className={stili.stato} aria-live="polite">
          {salvato ? (stato === 'offline' ? 'Piano salvato su questo dispositivo, si sincronizza appena c’è rete' : '✓ Piano salvato') : ''}
        </p>
      </div>
    </>
  );
}
