import { Link } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { trovaFoglio } from '../../contenuti/fogli/index.js';
import { trovaModulo } from '../../contenuti/guida/moduli.js';
import Postit from './Postit.jsx';
import { usePostit } from './usePostit.js';
import stili from './PaginaAppunti.module.css';

// Come si chiama il posto a cui è legato un gruppo di post-it ('mod:reg', 'fg:t-stop', 'sk:...')
function titoloDi(chiave) {
  const [tipo, id] = [chiave.slice(0, chiave.indexOf(':')), chiave.slice(chiave.indexOf(':') + 1)];
  if (tipo === 'mod') return trovaModulo(id)?.titolo ?? 'Modulo';
  if (tipo === 'fg') return trovaFoglio(id)?.titolo ?? 'Foglio di lavoro';
  return 'Altri appunti';
}

// Tutti i tuoi post-it, per modulo e foglio; qui compaiono anche quelli importati da Marea
export default function PaginaAppunti() {
  const { tutti, lista } = usePostit();
  const chiavi = Object.keys(tutti).filter((k) => lista(k).length > 0).sort((a, b) => titoloDi(a).localeCompare(titoloDi(b), 'it'));

  return (
    <>
      <Hero soloDesktop semplice titolo="I tuoi appunti" sottotitolo="I post-it scritti durante i gruppi." />
      <div className={stili.contenuto}>
        <Link to="/guida" className={stili.indietro}>← Guida</Link>
        {chiavi.length === 0 && <p className={stili.vuoto}>Non hai ancora scritto appunti. Li trovi in fondo a ogni modulo della Guida e di ogni foglio di lavoro.</p>}
        {chiavi.map((k) => <Postit key={k} chiave={k} titolo={titoloDi(k)} />)}
      </div>
    </>
  );
}
