import { useMemo, useState } from 'react';
import { useSchermoLargo } from '../../app/useSchermoLargo.js';
import Hero from '../../componenti/Hero.jsx';
import { riepilogo, vociDelPeriodo, vociPerGrafici } from './calcoli.js';
import ElencoGiornate from './ElencoGiornate.jsx';
import PannelloGiorno from './PannelloGiorno.jsx';
import Pillole from './Pillole.jsx';
import Riepilogo from './Riepilogo.jsx';
import RiepilogoLargo from './RiepilogoLargo.jsx';
import Trend from './Trend.jsx';
import { useVoci } from './useVoci.js';
import stili from './PaginaStorico.module.css';

const PERIODI = [
  { valore: 7, etichetta: '7gg' },
  { valore: 14, etichetta: '14gg' },
  { valore: 0, etichetta: 'Tutti' },
];
const PERIODI_LARGO = [
  { valore: 7, etichetta: '7 giorni' },
  { valore: 14, etichetta: '14 giorni' },
  { valore: 30, etichetta: '30 giorni' },
  { valore: 0, etichetta: 'Tutti' },
];
const SCHEDE = [
  { valore: 'storico', etichetta: 'Storico' },
  { valore: 'trend', etichetta: 'Trend' },
];

export default function PaginaStorico() {
  const { voci, caricamento, errore } = useVoci();
  const [periodo, setPeriodo] = useState(7);
  const [scheda, setScheda] = useState('storico');
  const [aperta, setAperta] = useState(null);
  const largo = useSchermoLargo();

  const delPeriodo = useMemo(() => vociDelPeriodo(voci, periodo), [voci, periodo]);
  const numeri = useMemo(() => riepilogo(delPeriodo), [delPeriodo]);
  const perGrafici = useMemo(() => vociPerGrafici(voci, periodo), [voci, periodo]);

  return (
    <>
      <Hero soloDesktop titolo="Storico & Trend" sottotitolo="Come si muovono le scale nel periodo scelto." />
      <div className={stili.contenuto}>
        <Pillole nome="Periodo" opzioni={largo ? PERIODI_LARGO : PERIODI} valore={periodo} onScegli={setPeriodo} />
        {!largo && <Pillole nome="Vista" opzioni={SCHEDE} valore={scheda} onScegli={setScheda} />}
        {errore && <p className={stili.errore} role="alert">Non riesco a caricare i dati: controlla la connessione e riprova.</p>}
        {!caricamento && largo && (
          <>
            <RiepilogoLargo numeri={numeri} voci={delPeriodo} />
            <Trend voci={perGrafici} estesi />
            <h2 className={stili.etichetta}>Le giornate</h2>
            <ElencoGiornate voci={delPeriodo} onApri={setAperta} />
          </>
        )}
        {!caricamento && !largo && scheda === 'storico' && (
          <>
            <Riepilogo numeri={numeri} periodo={periodo === 0 ? delPeriodo.length : periodo} />
            <h2 className={stili.etichetta}>Le giornate</h2>
            <ElencoGiornate voci={delPeriodo} onApri={setAperta} />
          </>
        )}
        {!caricamento && !largo && scheda === 'trend' && <Trend voci={perGrafici} />}
      </div>
      {aperta && <PannelloGiorno voce={aperta} onChiudi={() => setAperta(null)} />}
    </>
  );
}
