import { useState, useEffect } from 'react';
import Intestazione from '../componenti/Intestazione';

// Il piano di crisi resta sul dispositivo (localStorage), non passa dal
// backend: e' pensato per essere consultato in un momento difficile,
// quando avere anche solo un ritardo di rete e' un problema. Va scritto
// insieme alla propria terapeuta, non da sola.
const CHIAVE_LOCALE = 'piano-crisi';

function vuoto() {
  return { segnaliAllarme: '', strategie: '', contatti: '', motiviPerVivere: '' };
}

export default function PianoCrisi() {
  const [piano, setPiano] = useState(vuoto);
  const [salvato, setSalvato] = useState(false);

  useEffect(() => {
    const grezzo = localStorage.getItem(CHIAVE_LOCALE);
    if (grezzo) {
      try { setPiano(JSON.parse(grezzo)); } catch { /* ignoro, resta vuoto */ }
    }
  }, []);

  function aggiorna(campo, valore) {
    setPiano((p) => ({ ...p, [campo]: valore }));
    setSalvato(false);
  }

  function salva() {
    localStorage.setItem(CHIAVE_LOCALE, JSON.stringify(piano));
    setSalvato(true);
  }

  return (
    <>
      <Intestazione titolo="Piano di crisi" sottotitolo="Da scrivere insieme alla tua terapeuta" />
      <div className="dc-corpo">
        <div className="dc-card avviso-crisi">
          <p>
            Se sei in pericolo immediato, chiama il <strong>112</strong> o vai al pronto soccorso più vicino.
            Questo piano è un supporto, non sostituisce l'aiuto di emergenza.
          </p>
        </div>

        <div className="dc-card">
          <h2>I miei segnali d'allarme</h2>
          <p className="nota-piccola">Cosa noto in me quando la crisi si avvicina.</p>
          <textarea
            className="dc-textarea" rows={4} value={piano.segnaliAllarme}
            onChange={(e) => aggiorna('segnaliAllarme', e.target.value)}
          />
        </div>

        <div className="dc-card">
          <h2>Cosa posso fare</h2>
          <p className="nota-piccola">Le strategie e le abilità che funzionano per me.</p>
          <textarea
            className="dc-textarea" rows={4} value={piano.strategie}
            onChange={(e) => aggiorna('strategie', e.target.value)}
          />
        </div>

        <div className="dc-card">
          <h2>Chi posso contattare</h2>
          <p className="nota-piccola">Persone, numeri, la mia terapeuta.</p>
          <textarea
            className="dc-textarea" rows={3} value={piano.contatti}
            onChange={(e) => aggiorna('contatti', e.target.value)}
          />
        </div>

        <div className="dc-card">
          <h2>Perché vale la pena restare</h2>
          <textarea
            className="dc-textarea" rows={3} value={piano.motiviPerVivere}
            onChange={(e) => aggiorna('motiviPerVivere', e.target.value)}
          />
        </div>

        <button className="dc-btn-primario" onClick={salva}>Salva</button>
        {salvato && <p className="messaggio-successo">Salvato su questo dispositivo.</p>}
      </div>
    </>
  );
}
