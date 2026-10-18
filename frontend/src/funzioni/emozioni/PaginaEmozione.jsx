import { Link, Navigate, useParams } from 'react-router-dom';
import { leggiSessione } from '../../api/sessione.js';
import { trovaEmozione } from '../../contenuti/emozioni.js';
import Postit from '../postit/Postit.jsx';
import { Miniatura } from './PaginaEmozioni.jsx';
import stili from './Emozioni.module.css';

// Una emozione: scatenanti, interpretazioni, sensazioni, azioni e azione opposta, più i tuoi appunti
export default function PaginaEmozione() {
  const { id } = useParams();
  const emozione = trovaEmozione(id);
  if (!emozione) return <Navigate to="/emozioni" replace />;
  return (
    <div className={stili.contenuto}>
      <Link to="/emozioni" className={stili.indietro}>← Le emozioni</Link>
      <div className={stili.testata}>
        <Miniatura emozione={emozione} className={stili.miniatura} />
        <h1 className={stili.titolo}>{emozione.nome}</h1>
      </div>
      {emozione.sezioni.map((s) => (
        <section key={s.titolo} className={`${stili.sezione} ${s.evidenza ? stili.evidenza : ''}`} aria-label={s.titolo}>
          <h2 className={stili.etichetta}>{s.titolo}</h2>
          <p className={stili.testo}>{s.testo}</p>
        </section>
      ))}
      {leggiSessione()?.utente?.ruolo === 'PAZIENTE' && <Postit chiave={`emo:${emozione.id}`} titolo="Appunti sull’emozione" />}
      <Link to="/emozioni" className={stili.torna}>Torna alle emozioni</Link>
    </div>
  );
}
