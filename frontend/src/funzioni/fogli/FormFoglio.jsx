import { useId, useState } from 'react';
import Pulsante from '../../componenti/Pulsante.jsx';
import stili from './Fogli.module.css';

const vuoto = (x) => x === '' || x == null || (Array.isArray(x) && !x.length);

function Opzioni({ campo, valore, multiplo, soloLettura, onCambia }) {
  const scelte = Array.isArray(valore) ? valore : valore ? [valore] : [];
  const tocca = (o) => {
    if (soloLettura) return;
    const gia = scelte.includes(o);
    if (multiplo) onCambia(gia ? scelte.filter((x) => x !== o) : [...scelte, o]);
    else onCambia(gia ? '' : o);
  };
  return (
    <div className={stili.opzioni} role="group" aria-label={campo.l}>
      {campo.opzioni.map((o) => (
        <button key={o} type="button" aria-pressed={scelte.includes(o)} disabled={soloLettura}
          className={`${stili.opzione} ${scelte.includes(o) ? stili.scelta : ''}`} onClick={() => tocca(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

function CampoFoglio({ campo, valore, soloLettura, onCambia }) {
  const id = useId();
  if (campo.titolo) return <h3 className={stili.sezione}>{campo.titolo}</h3>;
  const comune = { id, className: stili.campo, disabled: soloLettura, placeholder: campo.segnaposto || undefined };
  return (
    <div className={stili.gruppoCampo}>
      <label htmlFor={id} className={stili.etichetta}>{campo.l}</label>
      {campo.tipo === 'testo' && <input type="text" {...comune} value={valore ?? ''} onChange={(e) => onCambia(e.target.value)} />}
      {campo.tipo === 'area' && <textarea rows={3} {...comune} value={valore ?? ''} onChange={(e) => onCambia(e.target.value)} />}
      {campo.tipo === 'scala' && (
        <input type="number" min={0} max={100} inputMode="numeric" {...comune} value={valore ?? ''} onChange={(e) => onCambia(e.target.value)} />
      )}
      {(campo.tipo === 'scelta' || campo.tipo === 'multi') && (
        <Opzioni campo={campo} valore={valore} multiplo={campo.tipo === 'multi'} soloLettura={soloLettura} onCambia={onCambia} />
      )}
    </div>
  );
}

// Il modulo di un foglio: compila o modifica (voce = foglio già salvato), oppure sola lettura per la terapeuta.
export default function FormFoglio({ foglio, voce, soloLettura = false, onSalva, onElimina, onIndietro }) {
  const [valori, setValori] = useState(voce?.v ?? {});
  const [conferma, setConferma] = useState(false);
  const imposta = (k, x) => setValori((prima) => ({ ...prima, [k]: x }));

  const salva = () => {
    const pulito = {};
    for (const campo of foglio.campi) {
      const x = valori[campo.k];
      if (campo.titolo || vuoto(x)) continue;
      pulito[campo.k] = campo.tipo === 'scala' ? Math.max(0, Math.min(100, Number(x) || 0)) : typeof x === 'string' ? x.trim() : x;
      if (vuoto(pulito[campo.k])) delete pulito[campo.k];
    }
    if (Object.keys(pulito).length) onSalva(pulito, voce?.id);
    onIndietro();
  };

  return (
    <div className={stili.form}>
      {foglio.campi.map((campo, i) => (
        <CampoFoglio key={campo.k ?? `t${i}`} campo={campo} valore={valori[campo.k]} soloLettura={soloLettura} onCambia={(x) => imposta(campo.k, x)} />
      ))}
      <div className={stili.azioni}>
        {voce && !soloLettura && (
          <Pulsante variante="testo" className={stili.elimina} onClick={() => (conferma ? (onElimina(voce.id), onIndietro()) : setConferma(true))}>
            {conferma ? 'Eliminare davvero?' : 'Elimina'}
          </Pulsante>
        )}
        <span className={stili.spazio} />
        <Pulsante variante="secondario" onClick={onIndietro}>{soloLettura ? 'Indietro' : 'Annulla'}</Pulsante>
        {!soloLettura && <Pulsante onClick={salva}>Salva</Pulsante>}
      </div>
    </div>
  );
}
