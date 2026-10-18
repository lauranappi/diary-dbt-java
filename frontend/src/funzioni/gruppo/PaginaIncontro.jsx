import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import Postit from '../postit/Postit.jsx';
import { usePostit } from '../postit/usePostit.js';
import { useFogli } from '../fogli/useFogli.js';
import { costruisciCatalogo, destinazione, etichettaApertura } from './catalogo.js';
import { dataLunga, nomiAmbiti } from './incontri.js';
import stili from './Gruppo.module.css';

// Un incontro, in lettura: le pagine viste, i collegamenti alle schede e ai fogli, gli appunti presi
export default function PaginaIncontro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incontri, eliminaIncontro, stato } = usePostit();
  const { compilati } = useFogli();
  const [conferma, setConferma] = useState(false);
  const x = incontri.find((i) => i.id === id);

  if (!x) {
    // il documento può non essere ancora arrivato dal server
    return stato === 'caricamento' ? null : <Navigate to="/gruppo" replace />;
  }
  const catalogo = costruisciCatalogo(compilati);
  const nomeDi = (k) => catalogo.find((c) => c.k === k)?.n;

  return (
    <>
      <Hero soloDesktop semplice titolo="Incontro" sottotitolo={dataLunga(x.g)} />
      <div className={stili.contenuto}>
        <Link to="/gruppo" className={stili.indietro}>← Diario del gruppo</Link>
        <h2 className={stili.giorno}>{dataLunga(x.g)}</h2>
        {nomiAmbiti(x.mm) && <p className={stili.ambito}>{nomiAmbiti(x.mm)}</p>}
        {x.pp.map((y, i) => {
          const dest = y.l ? destinazione(y.l) : null;
          const nome = y.l ? nomeDi(y.l) : null;
          return (
            <section key={`${y.p}-${i}`} aria-label={`Pagina ${y.p || i + 1}`}>
              <h3 className={stili.pagina}>{y.p ? `p. ${y.p}` : 'Pagina'}{y.t ? ` · ${y.t}` : ''}</h3>
              {dest && nome && <Link to={dest} className={stili.apri}>{etichettaApertura(y.l)}{nome}</Link>}
            </section>
          );
        })}
        <Postit chiave={`gn:${x.id}`} titolo="Appunti presi in gruppo" />
        <div className={stili.azioni}>
          <Pulsante variante="testo" className={stili.elimina} onClick={() => (conferma ? (eliminaIncontro(x.id), navigate('/gruppo')) : setConferma(true))}>
            {conferma ? 'Eliminare davvero?' : 'Elimina'}
          </Pulsante>
          <span className={stili.spazio} />
          <Pulsante variante="secondario" onClick={() => navigate('/gruppo')}>Indietro</Pulsante>
          <Pulsante onClick={() => navigate(`/gruppo/${x.id}/modifica`)}>Modifica</Pulsante>
        </div>
      </div>
    </>
  );
}
