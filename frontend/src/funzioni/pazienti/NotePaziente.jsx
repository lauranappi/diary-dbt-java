import { useDocumento } from '../../api/useDocumento.js';
import AreaTesto from '../../componenti/AreaTesto.jsx';
import stili from './PaginaPaziente.module.css';

const PREDEFINITO = { note: {} };

// Se due dispositivi hanno scritto note diverse, per ogni paziente vince la copia di questo dispositivo
const unisci = (locale, remoto) => ({ note: { ...(remoto?.note || {}), ...(locale?.note || {}) } });

// Le note della terapeuta su una paziente: private, nel documento "note-paziente" della terapeuta
export default function NotePaziente({ username }) {
  const { valore, imposta, stato } = useDocumento('note-paziente', { predefinito: PREDEFINITO, unisci });
  const testo = valore?.note?.[username] ?? '';
  const scrivi = (e) =>
    imposta((prima) => ({ note: { ...(prima?.note || {}), [username]: e.target.value } }));

  return (
    <section className={stili.note}>
      <AreaTesto
        multilinea
        etichetta="Le tue note (private)"
        placeholder="Scrivi qui le tue note su questa paziente. Sono visibili solo a te."
        value={testo}
        onChange={scrivi}
      />
      <p className={stili.stato} aria-live="polite">
        {stato === 'sincronizzato' ? 'Salvato' : stato === 'offline' ? 'Salvato su questo dispositivo, si sincronizza appena c’è rete' : ''}
      </p>
    </section>
  );
}
