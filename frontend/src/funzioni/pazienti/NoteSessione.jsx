import { useState } from 'react';
import { useDocumento } from '../../api/useDocumento.js';
import AreaTesto from '../../componenti/AreaTesto.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { dataLunga, oggi } from '../gruppo/incontri.js';
import stili from './NoteSessione.module.css';

const PREDEFINITO = { pazienti: {} };
const nuovoId = () => `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

// Se due dispositivi hanno aggiunto note, per ogni paziente si tengono tutte (per id)
function unisci(locale, remoto) {
  const pazienti = {};
  for (const username of new Set([...Object.keys(remoto?.pazienti || {}), ...Object.keys(locale?.pazienti || {})])) {
    const per = new Map();
    for (const nota of [...(remoto?.pazienti?.[username] || []), ...(locale?.pazienti?.[username] || [])]) per.set(nota.id, nota);
    pazienti[username] = [...per.values()];
  }
  return { pazienti };
}

const VUOTO = { temi: '', abilita: '', note: '' };

// Le note delle sedute con una paziente (private, nel documento "sessioni" della terapeuta)
export default function NoteSessione({ username }) {
  const { valore, imposta, stato } = useDocumento('sessioni', { predefinito: PREDEFINITO, unisci });
  const [data, setData] = useState(oggi);
  const [campi, setCampi] = useState(VUOTO);
  const [daEliminare, setDaEliminare] = useState(null);
  const lista = [...(valore?.pazienti?.[username] || [])].sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  const cambia = (k) => (e) => setCampi((c) => ({ ...c, [k]: e.target.value }));

  const aggiungi = () => {
    const nota = { id: nuovoId(), data: data || oggi(), temi: campi.temi.trim(), abilita: campi.abilita.trim(), note: campi.note.trim() };
    if (!nota.temi && !nota.abilita && !nota.note) return;
    imposta((prima) => ({ pazienti: { ...(prima?.pazienti || {}), [username]: [...(prima?.pazienti?.[username] || []), nota] } }));
    setCampi(VUOTO);
  };
  const elimina = (id) => {
    imposta((prima) => ({ pazienti: { ...(prima?.pazienti || {}), [username]: (prima?.pazienti?.[username] || []).filter((n) => n.id !== id) } }));
    setDaEliminare(null);
  };

  return (
    <section className={stili.sessioni}>
      <label className={stili.data}>
        <span className={stili.etichetta}>Data della seduta</span>
        <input type="date" className={stili.campoData} value={data} onChange={(e) => setData(e.target.value)} />
      </label>
      <AreaTesto etichetta="Temi" value={campi.temi} onChange={cambia('temi')} placeholder="Di cosa avete parlato" />
      <AreaTesto etichetta="Abilità" value={campi.abilita} onChange={cambia('abilita')} placeholder="Abilità lavorate o consigliate" />
      <AreaTesto multilinea etichetta="Note" value={campi.note} onChange={cambia('note')} placeholder="Appunti sulla seduta" />
      <Pulsante pieno onClick={aggiungi}>Aggiungi nota</Pulsante>
      <p className={stili.stato} aria-live="polite">{stato === 'offline' ? 'Salvato su questo dispositivo, si sincronizza appena c’è rete' : ''}</p>

      {lista.length === 0 ? (
        <p className={stili.vuoto}>Nessuna nota ancora.</p>
      ) : (
        lista.map((n) => (
          <article key={n.id} className={stili.nota}>
            <span className={stili.dataNota}>{dataLunga(n.data)}</span>
            {n.temi && <p className={stili.riga}><strong>Temi:</strong> {n.temi}</p>}
            {n.abilita && <p className={stili.riga}><strong>Abilità:</strong> {n.abilita}</p>}
            {n.note && <p className={stili.riga}>{n.note}</p>}
            <Pulsante variante="testo" className={stili.elimina} onClick={() => (daEliminare === n.id ? elimina(n.id) : setDaEliminare(n.id))}>
              {daEliminare === n.id ? 'Eliminare davvero?' : 'Elimina'}
            </Pulsante>
          </article>
        ))
      )}
    </section>
  );
}
