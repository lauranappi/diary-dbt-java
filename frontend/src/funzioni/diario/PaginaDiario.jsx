import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import { PASSI } from '../../contenuti/diario.js';
import BarraPassi from './BarraPassi.jsx';
import SchedaPasso from './SchedaPasso.jsx';
import StrisciaGiorni from './StrisciaGiorni.jsx';
import { aggiungiGiorni, chiave, dataLunga, eFuturo, giorniRecenti, titoloGiorno } from './date.js';
import { useGiorniCompilati } from './useGiorniCompilati.js';
import { useGiorno } from './useGiorno.js';
import stili from './PaginaDiario.module.css';

const GIORNI_IN_STRISCIA = 10;
const DURATA_AVVISO_MS = 2200;

const MESSAGGI = {
  salvato: 'Salvato',
  errore: 'Non sono riuscita a salvare: la bozza resta sul dispositivo, riprova.',
};

export default function PaginaDiario() {
  const [oggi] = useState(() => new Date());
  const [giorno, setGiorno] = useState(oggi);
  const [passo, setPasso] = useState(0);
  const [versione, setVersione] = useState(0);
  const [avviso, setAvviso] = useState(null);
  const timerAvviso = useRef(null);

  const giorni = useMemo(() => giorniRecenti(GIORNI_IN_STRISCIA, oggi), [oggi]);
  const compilati = useGiorniCompilati(giorni, versione);
  const { voce, stato, imposta, salva, haModifiche } = useGiorno(
    chiave(giorno),
    useCallback(() => setVersione((v) => v + 1), []),
  );

  useEffect(() => () => clearTimeout(timerAvviso.current), []);

  function mostraAvviso(tipo) {
    setAvviso(tipo);
    clearTimeout(timerAvviso.current);
    timerAvviso.current = setTimeout(() => setAvviso(null), DURATA_AVVISO_MS);
  }

  // Cambiando giorno la bozza non va persa: se c'e' qualcosa da salvare si salva prima
  async function vaiAlGiorno(nuovo) {
    if (chiave(nuovo) === chiave(giorno) || eFuturo(nuovo, oggi)) return;
    if (haModifiche()) await salva();
    setGiorno(nuovo);
    setPasso(0);
    window.scrollTo(0, 0);
  }

  async function salvaGiornata() {
    mostraAvviso((await salva()) ? 'salvato' : 'errore');
  }

  const ultimo = passo === PASSI.length - 1;

  return (
    <>
      <Hero
        titolo={titoloGiorno(giorno, oggi)}
        sottotitolo={dataLunga(giorno)}
        angolo={
          <div className={stili.frecce}>
            <button type="button" className={stili.tondo} onClick={() => vaiAlGiorno(aggiungiGiorni(giorno, -1))} aria-label="Giorno precedente">
              <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true"><path d="M8 2.5L2.5 9.5L8 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className={stili.tondo} disabled={eFuturo(aggiungiGiorni(giorno, 1), oggi)} onClick={() => vaiAlGiorno(aggiungiGiorni(giorno, 1))} aria-label="Giorno successivo">
              <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true"><path d="M2.5 2.5L8 9.5L2.5 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        }
      />

      <StrisciaGiorni giorni={giorni} selezionato={giorno} compilati={compilati} onScegli={vaiAlGiorno} />

      <div className={stili.contenuto}>
        <BarraPassi passi={PASSI} attuale={passo} onScegli={setPasso} />
        {PASSI.map((p, i) => (
          <SchedaPasso key={p.id} passo={p} voce={voce} imposta={imposta} attivo={i === passo} />
        ))}

        <div className={stili.navigazione}>
          <Pulsante variante="secondario" className={stili.indietro} disabled={passo === 0} onClick={() => setPasso(passo - 1)}>
            Indietro
          </Pulsante>
          <Pulsante className={stili.avanti} onClick={ultimo ? salvaGiornata : () => { setPasso(passo + 1); window.scrollTo(0, 0); }}>
            {ultimo ? 'Salva giornata' : 'Avanti'}
          </Pulsante>
          <Pulsante className={stili.salvaSempre} onClick={salvaGiornata}>Salva giornata</Pulsante>
        </div>
        {stato === 'modificato' && <p className={stili.nota}>Modifiche non ancora salvate.</p>}
      </div>

      {avviso && <p className={`${stili.avviso} ${avviso === 'errore' ? stili.avvisoErrore : ''}`} role="status">{MESSAGGI[avviso]}</p>}
    </>
  );
}
