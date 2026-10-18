import { useState } from 'react';
import { COLORI_POSTIT } from '../../contenuti/postit.js';
import EditorPostit from './EditorPostit.jsx';
import { usePostit } from './usePostit.js';
import stili from './Postit.module.css';

const data = (ts) => new Date(ts).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });

// Gli appunti personali legati a un modulo ('mod:reg') o a un foglio ('fg:t-stop')
export default function Postit({ chiave, titolo = 'Appunti dal gruppo' }) {
  const { lista, salva, rimuovi } = usePostit();
  // undefined = chiuso; null = nuovo; altrimenti il post-it aperto
  const [aperto, setAperto] = useState(undefined);
  const note = lista(chiave);

  return (
    <section className={stili.blocco} aria-label={titolo}>
      <div className={stili.testata}>
        <h2 className={stili.titolo}>{titolo}</h2>
        <button type="button" className={stili.aggiungi} aria-label="Aggiungi un post-it" onClick={() => setAperto(null)}>+ Post-it</button>
      </div>
      {note.length === 0 ? (
        <p className={stili.vuoto}>Nessun appunto. Tocca "+ Post-it" per scriverne uno durante il gruppo.</p>
      ) : (
        <div className={stili.griglia}>
          {note.map((p, i) => (
            <button key={p.id} type="button" className={`${stili.nota} ${stili[`rot${i % 4}`]}`} style={{ background: (COLORI_POSTIT[p.c] || COLORI_POSTIT[0]).sfondo }}
              aria-label={`Apri post-it ${(COLORI_POSTIT[p.c] || COLORI_POSTIT[0]).nome.toLowerCase()}`} onClick={() => setAperto(p)}>
              <span className={stili.testo}>{p.t}</span>
              <span className={stili.data}>{data(p.ts)}</span>
            </button>
          ))}
        </div>
      )}
      {aperto !== undefined && (
        <EditorPostit key={aperto?.id ?? 'nuovo'} postit={aperto}
          onSalva={(id, testo, colore) => salva(chiave, id, testo, colore)}
          onElimina={(id) => rimuovi(chiave, id)}
          onChiudi={() => setAperto(undefined)} />
      )}
    </section>
  );
}
