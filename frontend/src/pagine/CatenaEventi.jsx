import { useState } from 'react';
import { api } from '../api';
import Intestazione from '../componenti/Intestazione';

const CAMPI = [
  { id: 'comportamento', etichetta: 'Comportamento problematico', aiuto: 'Cosa hai fatto esattamente?', esempio: 'Es. Ho bevuto 4 bicchieri di vino da sola.' },
  { id: 'vulnerabilita', etichetta: 'Fattori di vulnerabilità', aiuto: 'Poco sonno, fame, conflitti, stress...', esempio: 'Es. Non avevo dormito bene. Ero stressata per il lavoro.' },
  { id: 'evento', etichetta: 'Evento scatenante', aiuto: 'Cosa ha innescato la catena?', esempio: 'Es. Litigio con il mio ragazzo alle 19.' },
  { id: 'catena', etichetta: 'La catena', aiuto: 'Pensieri → emozioni → azioni, passo per passo', esempio: '' },
  { id: 'conseguenze', etichetta: 'Conseguenze', aiuto: 'Immediate e a lungo termine', esempio: '' },
  { id: 'intervento', etichetta: 'Dove avresti potuto intervenire?', aiuto: 'Quale abilità usare?', esempio: '' },
];

function oggiISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function CatenaEventi() {
  const [valori, setValori] = useState({});
  const [salvataggio, setSalvataggio] = useState('inattivo');

  function aggiorna(campo, valore) {
    setValori((v) => ({ ...v, [campo]: valore }));
  }

  async function salva() {
    setSalvataggio('in-corso');
    try {
      const testoCatena = CAMPI.map((c) => `${c.etichetta}: ${valori[c.id] || '—'}`).join('\n\n');

      // Il salvataggio sovrascrive l'intera voce del giorno: leggo prima
      // quella di oggi (se c'e' gia') per non perdere scale/abilita' che
      // la paziente avesse gia' compilato separatamente.
      const oggi = oggiISO();
      const esistenti = await api.mioStorico(oggi, oggi);
      const vociOggi = esistenti[0] || { scale: {}, toggle: {}, testi: {}, abilitaUsate: {}, planner: {} };

      await api.salvaMioDiario({
        data: oggi,
        scale: vociOggi.scale || {},
        toggle: vociOggi.toggle || {},
        testi: { ...vociOggi.testi, catenaEventi: testoCatena },
        abilitaUsate: vociOggi.abilitaUsate || {},
        planner: vociOggi.planner || {},
      });
      setSalvataggio('fatto');
    } catch {
      setSalvataggio('errore');
    }
  }

  return (
    <>
      <Intestazione titolo="Analisi della catena" sottotitolo="Capire cosa ha scatenato un comportamento" />
      <div className="dc-corpo">
        <div className="dc-card">
          {CAMPI.map((c) => (
            <div key={c.id} style={{ marginBottom: 14 }}>
              <label className="dc-riga-scala-etichetta">{c.etichetta}</label>
              <p className="nota-piccola" style={{ margin: '0 0 6px' }}>{c.aiuto}</p>
              <textarea
                className="dc-textarea" rows={2} placeholder={c.esempio}
                value={valori[c.id] || ''} onChange={(e) => aggiorna(c.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button className="dc-btn-primario" onClick={salva} disabled={salvataggio === 'in-corso'}>
          {salvataggio === 'in-corso' ? 'Salvataggio...' : 'Salva analisi'}
        </button>
        {salvataggio === 'fatto' && <p className="messaggio-successo">Salvata nel diario di oggi.</p>}
        {salvataggio === 'errore' && <p className="messaggio-errore">Errore nel salvataggio, riprova.</p>}
      </div>
    </>
  );
}
