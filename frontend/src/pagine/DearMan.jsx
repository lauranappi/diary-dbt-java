import { useState } from 'react';
import Intestazione from '../componenti/Intestazione';

const PASSI = [
  { lettera: 'D', titolo: 'Descrivi la situazione (solo fatti)', esempio: 'Es. Mi avevi detto che saresti tornata per cena, ma sei arrivata alle 23.' },
  { lettera: 'E', titolo: 'Esprimi come ti senti', esempio: 'Es. Quando succede, mi preoccupo e mi sento sola.' },
  { lettera: 'A', titolo: 'Afferma ciò che vuoi (chiaro e diretto)', esempio: 'Es. Vorrei che mi avvisassi quando pensi di fare tardi.' },
  { lettera: 'R', titolo: 'Rinforza — spiega i benefici', esempio: 'Es. Sarei molto più tranquilla e potremmo goderci la serata senza tensioni.' },
  { lettera: 'N', titolo: 'Negozia — cosa potresti offrire in cambio?', esempio: 'Es. Potrei anche io avvisarti quando faccio tardi. Cosa ti sembrerebbe giusto?' },
];

const PROMEMORIA = [
  { lettera: 'M', testo: 'Resta Mindful — non farti trascinare se la conversazione devia, torna al punto.' },
  { lettera: 'A', testo: 'Apparenza sicura — tono fermo, contatto visivo, anche se dentro sei tesa.' },
  { lettera: 'N', testo: 'Negoziabile — sii pronta a scendere a compromessi ragionevoli.' },
];

export default function DearMan() {
  const [chi, setChi] = useState('');
  const [valori, setValori] = useState({});
  const [mostraCopione, setMostraCopione] = useState(false);

  function aggiorna(lettera, valore) {
    setValori((v) => ({ ...v, [lettera]: valore }));
  }

  const copione = [
    valori.D, valori.E, valori.A, valori.R, valori.N,
  ].filter(Boolean).join(' ');

  return (
    <>
      <Intestazione titolo="Copione DEAR MAN" sottotitolo="Prepara una conversazione difficile" />
      <div className="dc-corpo">
        <div className="dc-card">
          <label className="dc-riga-scala-etichetta">Con chi devi parlare?</label>
          <input
            className="dc-textarea" style={{ resize: 'none' }} type="text"
            placeholder="Es. il mio ragazzo, la mia amica..."
            value={chi} onChange={(e) => setChi(e.target.value)}
          />
        </div>

        <div className="dc-card">
          <div className="etichetta-sezione">DEAR MAN — passo per passo</div>
          {PASSI.map((p) => (
            <div key={p.lettera} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className="badge-lettera">{p.lettera}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.titolo}</span>
              </div>
              <textarea
                className="dc-textarea" rows={2} placeholder={p.esempio}
                value={valori[p.lettera] || ''} onChange={(e) => aggiorna(p.lettera, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="dc-card">
          <div className="etichetta-sezione">Durante la conversazione, ricorda</div>
          {PROMEMORIA.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 13.5 }}>
              <span className="badge-lettera">{p.lettera}</span>
              <span>{p.testo}</span>
            </div>
          ))}
        </div>

        <button className="dc-btn-primario" onClick={() => setMostraCopione(true)} disabled={!copione}>
          Genera il copione
        </button>

        {mostraCopione && copione && (
          <div className="dc-card">
            <h2>Il tuo copione{chi ? ` per ${chi}` : ''}</h2>
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{copione}</p>
          </div>
        )}
      </div>
    </>
  );
}
