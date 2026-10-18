import { useEffect, useRef, useState } from 'react';
import { COLORI_POSTIT, MAX_CARATTERI_POSTIT } from '../../contenuti/postit.js';
import stili from './Postit.module.css';

// Il foglietto a comparsa: un post-it esistente si apre in lettura e "Modifica" abilita la scrittura
export default function EditorPostit({ postit, onSalva, onElimina, onChiudi }) {
  const nuovo = !postit;
  const [testo, setTesto] = useState(postit?.t ?? '');
  const [colore, setColore] = useState(postit ? postit.c || 0 : () => Math.floor(Math.random() * COLORI_POSTIT.length));
  const [modifica, setModifica] = useState(nuovo);
  const [conferma, setConferma] = useState(false);
  const area = useRef(null);

  useEffect(() => {
    const alTasto = (e) => e.key === 'Escape' && onChiudi();
    document.addEventListener('keydown', alTasto);
    return () => document.removeEventListener('keydown', alTasto);
  }, [onChiudi]);

  // il campo cresce col testo: il post-it si legge tutto senza scorrere
  useEffect(() => {
    const t = area.current;
    if (!t) return;
    t.style.height = 'auto';
    t.style.height = `${t.scrollHeight}px`;
  }, [testo, modifica]);

  useEffect(() => { if (nuovo) area.current?.focus(); }, [nuovo]);

  const inserisci = (simbolo) => {
    const t = area.current;
    const a = t.selectionStart;
    const b = t.selectionEnd;
    setTesto((x) => (x.slice(0, a) + simbolo + x.slice(b)).slice(0, MAX_CARATTERI_POSTIT));
    requestAnimationFrame(() => { t.focus(); t.selectionStart = t.selectionEnd = a + simbolo.length; });
  };

  const alternaElenco = () => {
    const t = area.current;
    const pos = t.selectionStart;
    const inizio = testo.lastIndexOf('\n', pos - 1) + 1;
    const puntata = testo.slice(inizio).startsWith('• ');
    setTesto(puntata ? testo.slice(0, inizio) + testo.slice(inizio + 2) : testo.slice(0, inizio) + '• ' + testo.slice(inizio));
    requestAnimationFrame(() => { t.focus(); t.selectionStart = t.selectionEnd = puntata ? Math.max(inizio, pos - 2) : pos + 2; });
  };

  // a capo dentro un elenco continua col pallino; a capo su pallino vuoto esce dall'elenco
  const alTasto = (e) => {
    if (e.key !== 'Enter' || !modifica) return;
    const t = e.currentTarget;
    const pos = t.selectionStart;
    const inizio = testo.lastIndexOf('\n', pos - 1) + 1;
    const riga = testo.slice(inizio, pos);
    if (!riga.startsWith('• ')) return;
    e.preventDefault();
    if (riga === '• ') {
      setTesto(testo.slice(0, inizio) + testo.slice(pos));
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = inizio; });
    } else {
      setTesto(testo.slice(0, pos) + '\n• ' + testo.slice(t.selectionEnd));
      requestAnimationFrame(() => { t.selectionStart = t.selectionEnd = pos + 3; });
    }
  };

  const salva = () => {
    const pulito = testo.trim();
    if (pulito) onSalva(postit?.id, pulito, colore);
    else if (postit) onElimina(postit.id); // svuotato un post-it esistente: equivale a toglierlo
    onChiudi();
  };
  const elimina = () => {
    if (!conferma) { setConferma(true); return; }
    onElimina(postit.id);
    onChiudi();
  };

  return (
    <div className={stili.sfondo} onClick={onChiudi}>
      <div className={`${stili.foglio} ${!modifica ? stili.vista : ''}`} role="dialog" aria-modal="true" aria-label="Post-it" onClick={(e) => e.stopPropagation()}>
        <div className={stili.fogliettoGrande} style={{ background: COLORI_POSTIT[colore].sfondo }}>
          <textarea ref={area} className={stili.scrittura} value={testo} readOnly={!modifica} maxLength={MAX_CARATTERI_POSTIT}
            placeholder="Cosa è emerso nel gruppo?" aria-label="Testo del post-it" onChange={(e) => setTesto(e.target.value)} onKeyDown={alTasto} />
          <div className={stili.conta}>{testo.length} / {MAX_CARATTERI_POSTIT}</div>
        </div>
        {modifica && (
          <div className={stili.strumenti} role="toolbar" aria-label="Inserisci simboli">
            <button type="button" className={stili.strumento} aria-label="Freccia a destra" onPointerDown={(e) => e.preventDefault()} onClick={() => inserisci('→ ')}>→</button>
            <button type="button" className={stili.strumento} aria-label="Freccia in basso" onPointerDown={(e) => e.preventDefault()} onClick={() => inserisci('↓ ')}>↓</button>
            <button type="button" className={stili.strumento} aria-label="Freccia a squadra" onPointerDown={(e) => e.preventDefault()} onClick={() => inserisci('↳ ')}>↳</button>
            <button type="button" className={stili.strumento} aria-label="Elenco puntato" onPointerDown={(e) => e.preventDefault()} onClick={alternaElenco}>• Elenco</button>
          </div>
        )}
        {modifica && (
          <div className={stili.colori} role="radiogroup" aria-label="Colore">
            {COLORI_POSTIT.map((c, i) => (
              <button key={c.nome} type="button" role="radio" aria-checked={i === colore} aria-label={c.nome}
                className={`${stili.pallino} ${i === colore ? stili.acceso : ''}`} style={{ background: c.sfondo }} onClick={() => setColore(i)} />
            ))}
          </div>
        )}
        <div className={stili.azioni}>
          {!nuovo && <button type="button" className={`${stili.tasto} ${stili.elimina} ${conferma ? stili.conferma : ''}`} onClick={elimina}>{conferma ? 'Eliminare davvero?' : 'Elimina'}</button>}
          <span className={stili.spazio} />
          {modifica ? (
            <>
              <button type="button" className={stili.tasto} onClick={onChiudi}>Annulla</button>
              <button type="button" className={`${stili.tasto} ${stili.primario}`} onClick={salva}>Salva</button>
            </>
          ) : (
            <>
              <button type="button" className={stili.tasto} onClick={onChiudi}>Chiudi</button>
              <button type="button" className={`${stili.tasto} ${stili.primario}`} onClick={() => { setModifica(true); requestAnimationFrame(() => area.current?.focus()); }}>Modifica</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
