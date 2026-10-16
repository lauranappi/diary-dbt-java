import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import { chiave } from '../diario/date.js';
import { compilata } from '../diario/voce.js';
import { emozioniDiIeri, giorniDiFila, indiceSuggerimento, ruotaSuggerimento, saluto, suggerimentiPer, ultimiSetteGiorni } from './calcoli.js';
import HomeTerapeuta from './HomeTerapeuta.jsx';
import SchedaAbilita from './SchedaAbilita.jsx';
import SchedaIeri from './SchedaIeri.jsx';
import SchedaSerie from './SchedaSerie.jsx';
import SchedaSettimana from './SchedaSettimana.jsx';
import { useVociRecenti } from './useVociRecenti.js';
import stili from './PaginaHome.module.css';

export default function PaginaHome() {
  const { utente } = useAutenticazione();
  if (utente.ruolo !== 'PAZIENTE') return <HomeTerapeuta />;
  return <HomePaziente utente={utente} />;
}

function HomePaziente({ utente }) {
  const navigate = useNavigate();
  const [adesso] = useState(() => new Date());
  const { voci } = useVociRecenti();

  const oggi = chiave(adesso);
  const [indice, setIndice] = useState(() => indiceSuggerimento(chiave(adesso)));
  const voceDiOggi = voci.find((v) => v.data === oggi);
  const fattaOggi = compilata(voceDiOggi);
  const suggerimenti = suggerimentiPer(voceDiOggi);
  const suggerimento = suggerimenti.length ? suggerimenti[indice % suggerimenti.length] : null;

  return (
    <>
      <Hero
        className={stili.hero}
        saluto={saluto(adesso.getHours())}
        titolo={utente.nome || utente.username}
        sottotitolo={fattaOggi
          ? 'La diary di oggi è compilata. Puoi rivederla quando vuoi.'
          : 'La diary di oggi non è ancora compilata. Ci vogliono due minuti.'}
        azione={
          <Pulsante variante="accento" onClick={() => navigate('/diario')} className={stili.azione}>
            {fattaOggi ? 'Rivedi la diary' : 'Compila la diary'}
          </Pulsante>
        }
        angolo={
          <button type="button" className={stili.impostazioni} onClick={() => navigate('/impostazioni')} aria-label="Impostazioni">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="2.6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="9" cy="9" r="6.6" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3.2 3.4" />
            </svg>
          </button>
        }
      />
      <section className={stili.pila}>
        <div className={stili.riga}>
          <SchedaSerie giorni={giorniDiFila(voci, adesso)} />
          <SchedaIeri emozioni={emozioniDiIeri(voci, adesso)} />
        </div>
        <SchedaAbilita
          suggerimento={suggerimento}
          quanti={suggerimenti.length}
          onApri={() => navigate(`/guida/${suggerimento.guida}?scheda=${suggerimento.scheda}`)}
          onAltro={() => { ruotaSuggerimento(oggi, suggerimenti.length); setIndice(indiceSuggerimento(oggi)); }}
        />
        <SchedaSettimana giorni={ultimiSetteGiorni(voci, adesso)} onApri={() => navigate('/storico')} />
      </section>
    </>
  );
}
