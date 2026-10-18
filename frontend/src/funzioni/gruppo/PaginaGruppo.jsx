import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { usePostit } from '../postit/usePostit.js';
import { dataLunga, filtra, nomiAmbiti, riepilogoPagine, titoli } from './incontri.js';
import stili from './Gruppo.module.css';
import stiliFogli from '../fogli/Fogli.module.css';

// Il Diario del gruppo: le pagine del manuale viste negli incontri, da ripassare
export default function PaginaGruppo() {
  const navigate = useNavigate();
  const { incontri, testoPostit } = usePostit();
  const [domanda, setDomanda] = useState('');
  const risultati = useMemo(() => filtra(incontri, domanda, testoPostit), [incontri, domanda, testoPostit]);

  return (
    <>
      <Hero soloDesktop semplice titolo="Diario del gruppo" sottotitolo="Le pagine viste in gruppo, da ripassare." />
      <div className={stili.contenuto}>
        <Link to="/guida" className={stili.indietro}>← Guida</Link>
        <p className={stili.intro}>Le pagine che avete visto in gruppo, da ripassare quando vuoi. Aggiungile tu: scrivendo il titolo puoi anche cercare e collegare una scheda o un foglio.</p>
        <Pulsante pieno onClick={() => navigate('/gruppo/nuovo')}>+ Aggiungi un incontro</Pulsante>
        {incontri.length === 0 ? (
          <p className={stili.vuoto}>Ancora nessun incontro. Dopo il prossimo gruppo, aggiungi le pagine che avete visto.</p>
        ) : (
          <>
            <input type="search" className={stili.cerca} value={domanda} onChange={(e) => setDomanda(e.target.value)}
              placeholder="Cerca per pagina, titolo, appunto o data…" aria-label="Cerca negli incontri" autoComplete="off" />
            {risultati.length === 0 && <p className={stili.vuoto}>Nessun incontro trovato.</p>}
            {risultati.map((x, i) => {
              const intestazione = x.g !== risultati[i - 1]?.g ? <h2 className={stili.giorno}>{dataLunga(x.g)}</h2> : null;
              return (
                <div key={x.id}>
                  {intestazione}
                  <Link to={`/gruppo/${x.id}`} className={stiliFogli.riga}>
                    <span className={stiliFogli.testoRiga}>
                      <span className={stiliFogli.data}>{riepilogoPagine(x)}{nomiAmbiti(x.mm) ? ` · ${nomiAmbiti(x.mm)}` : ''}</span>
                      <span className={stiliFogli.anteprima}>{titoli(x) || '(senza titolo)'}</span>
                    </span>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
