import { Link } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { EMOZIONI } from '../../contenuti/emozioni.js';
import stili from './Emozioni.module.css';

export const Miniatura = ({ emozione, className }) => (
  <img className={className} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/${emozione.miniatura}.svg`} alt="" />
);

// Le sette emozioni: per ognuna cosa la scatena e qual è la sua azione opposta
export default function PaginaEmozioni() {
  return (
    <>
      <Hero soloDesktop semplice titolo="Le emozioni" sottotitolo="Cosa le scatena e cosa fare, una per una." />
      <div className={stili.contenuto}>
        <Link to="/guida" className={stili.indietro}>← Guida</Link>
        <p className={stili.intro}>Quando un’emozione corrisponde ai fatti, e cosa fare quando invece non aiuta: l’azione opposta.</p>
        {EMOZIONI.map((e) => (
          <Link key={e.id} to={`/emozioni/${e.id}`} className={stili.riga}>
            <Miniatura emozione={e} className={stili.miniatura} />
            <span className={stili.testoRiga}>
              <span className={stili.titoloRiga}>{e.nome}</span>
              <span className={stili.sottoRiga}>{e.sottotitolo}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
