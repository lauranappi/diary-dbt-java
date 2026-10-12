import { useEffect, useState } from 'react';
import Avviso from '../../componenti/Avviso.jsx';
import Hero from '../../componenti/Hero.jsx';
import { FASCE } from '../../contenuti/attivita.js';
import RiepilogoPiano from './RiepilogoPiano.jsx';
import SceltaAttivita from './SceltaAttivita.jsx';
import StatoVuoto from './StatoVuoto.jsx';
import { alternaAttivita, conAttivita, haAttivita, senzaAttivita, usePiano } from './usePiano.js';
import { useMieAttivita } from './useMieAttivita.js';
import { chiave } from '../diario/date.js';
import stili from './PaginaAttivita.module.css';

const DURATA_AVVISO_MS = 1800;

// All'inizio la fascia proposta e' quella del momento della giornata
function fasciaDelMomento(adesso) {
  const ora = adesso.getHours();
  return ora < 12 ? 'mattina' : ora < 18 ? 'pomeriggio' : 'sera';
}

export default function PaginaAttivita() {
  const [adesso] = useState(() => new Date());
  const { piano, modifica, salvataggi, errore } = usePiano(chiave(adesso));
  const mie = useMieAttivita();
  const [fascia, setFascia] = useState(null);
  const [avviso, setAvviso] = useState(false);
  const [viste, setViste] = useState(0);

  // A ogni nuovo salvataggio riuscito l'avviso compare e dopo un attimo sparisce
  if (salvataggi !== viste) {
    setViste(salvataggi);
    setAvviso(true);
  }
  useEffect(() => {
    if (!avviso) return undefined;
    const t = setTimeout(() => setAvviso(false), DURATA_AVVISO_MS);
    return () => clearTimeout(t);
  }, [avviso, viste]);

  const giornata = adesso.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
  const nomeFascia = FASCE.find((f) => f.id === fascia)?.etichetta;

  return (
    <>
      <Hero soloDesktop titolo="Attività" sottotitolo={giornata} />
      <div className={stili.contenuto}>
        {fascia ? (
          <SceltaAttivita
            fascia={nomeFascia}
            scelte={piano[fascia]}
            mie={mie.elenco}
            onAlterna={(voce) => modifica((p) => alternaAttivita(p, fascia, voce))}
            onAggiungiPersonale={(voce) => { mie.aggiungi(voce); modifica((p) => conAttivita(p, fascia, voce)); }}
            onAlternaPreferita={(voce) => (mie.elenco.includes(voce) ? mie.togli(voce) : mie.aggiungi(voce))}
            onTogliPersonale={mie.togli}
            onIndietro={() => setFascia(null)}
          />
        ) : haAttivita(piano) ? (
          <RiepilogoPiano piano={piano} onAggiungi={setFascia} onTogli={(f, voce) => modifica((p) => senzaAttivita(p, f, voce))} />
        ) : (
          <StatoVuoto onAggiungi={() => setFascia(fasciaDelMomento(adesso))} />
        )}
      </div>
      <Avviso testo={errore ? 'Non sono riuscita a salvare, riprova.' : avviso && 'Salvato'} errore={errore} />
    </>
  );
}
