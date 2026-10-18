import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { riepilogo, vociDelPeriodo, vociPerGrafici } from '../storico/calcoli.js';
import ElencoGiornate from '../storico/ElencoGiornate.jsx';
import PannelloGiorno from '../storico/PannelloGiorno.jsx';
import Pillole from '../storico/Pillole.jsx';
import Riepilogo from '../storico/Riepilogo.jsx';
import Trend from '../storico/Trend.jsx';
import { useVoci } from '../storico/useVoci.js';
import AbilitaPaziente from './AbilitaPaziente.jsx';
import FogliPaziente from './FogliPaziente.jsx';
import GiornatePaziente from './GiornatePaziente.jsx';
import NoteSessione from './NoteSessione.jsx';
import NotePaziente from './NotePaziente.jsx';
import { giorniEtichetta, nomePaziente } from './nomePaziente.js';
import { usePazienti } from './usePazienti.js';
import stili from './PaginaPaziente.module.css';

const PERIODI = [
  { valore: 7, etichetta: '7gg' },
  { valore: 14, etichetta: '14gg' },
  { valore: 0, etichetta: 'Tutti' },
];
const VISTE = [
  { valore: 'panoramica', etichetta: 'Panoramica' },
  { valore: 'storico', etichetta: 'Storico' },
  { valore: 'trend', etichetta: 'Trend' },
  { valore: 'abilita', etichetta: 'Abilità' },
  { valore: 'giornata', etichetta: 'Giornata' },
  { valore: 'fogli', etichetta: 'Fogli' },
  { valore: 'sessioni', etichetta: 'Sessioni' },
  { valore: 'note', etichetta: 'Note' },
];

// La scheda di una paziente: gli stessi numeri, giornate e andamenti che vede lei, e le note private
export default function PaginaPaziente() {
  const { id } = useParams();
  const { pazienti, caricamento: caricaElenco } = usePazienti();
  const { voci, caricamento, errore } = useVoci(id);
  const [periodo, setPeriodo] = useState(7);
  const [vista, setVista] = useState('panoramica');
  const [aperta, setAperta] = useState(null);

  const paziente = pazienti.find((p) => p.id === id);
  const delPeriodo = useMemo(() => vociDelPeriodo(voci, periodo), [voci, periodo]);
  const numeri = useMemo(() => riepilogo(delPeriodo), [delPeriodo]);
  const perGrafici = useMemo(() => vociPerGrafici(voci, periodo), [voci, periodo]);

  const titolo = paziente ? nomePaziente(paziente) : 'Paziente';
  const sotto = paziente ? `@${paziente.username} · ${giorniEtichetta(paziente.giorniCompilati)} compilati` : '';

  return (
    <>
      <Hero soloDesktop semplice titolo={titolo} sottotitolo={sotto} />
      <div className={stili.contenuto}>
        <Link to="/pazienti" className={stili.indietro}>← Tutte le pazienti</Link>
        {!caricaElenco && !paziente && (
          <p className={stili.errore} role="alert">Questa paziente non risulta collegata a te.</p>
        )}
        {paziente && (
          <>
            <h2 className={stili.nome}>{titolo}</h2>
            <p className={stili.meta}>{sotto}</p>
            <Pillole nome="Vista" opzioni={VISTE} valore={vista} onScegli={setVista} />
            {vista !== 'note' && vista !== 'fogli' && vista !== 'sessioni' && <Pillole nome="Periodo" opzioni={PERIODI} valore={periodo} onScegli={setPeriodo} />}
            {errore && <p className={stili.errore} role="alert">Non riesco a caricare i dati: controlla la connessione e riprova.</p>}
            {!caricamento && vista === 'panoramica' && (
              <Riepilogo numeri={numeri} periodo={periodo === 0 ? delPeriodo.length : periodo} />
            )}
            {!caricamento && vista === 'storico' && <ElencoGiornate voci={delPeriodo} onApri={setAperta} />}
            {!caricamento && vista === 'trend' && <Trend voci={perGrafici} />}
            {!caricamento && vista === 'abilita' && <AbilitaPaziente voci={delPeriodo} />}
            {!caricamento && vista === 'giornata' && <GiornatePaziente voci={delPeriodo} />}
            {vista === 'fogli' && <FogliPaziente pazienteId={id} />}
            {vista === 'sessioni' && <NoteSessione username={paziente.username} />}
            {vista === 'note' && <NotePaziente username={paziente.username} />}
          </>
        )}
      </div>
      {aperta && <PannelloGiorno voce={aperta} onChiudi={() => setAperta(null)} />}
    </>
  );
}
