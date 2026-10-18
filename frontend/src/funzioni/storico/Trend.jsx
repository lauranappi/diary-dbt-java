import { serieScala, serieSino } from './calcoli.js';
import GraficoLinee from './GraficoLinee.jsx';
import stili from './Trend.module.css';

const scala = (id, nome, colore) => (voci) => ({ nome, colore, valori: serieScala(voci, id) });
const sino = (id, nome, colore) => (voci) => ({ nome, colore, valori: serieSino(voci, id) });

// I sette grafici del trend: titolo, colori e serie sono dati, il disegno e' sempre lo stesso
const GRAFICI = [
  { titolo: 'Pensieri suicidari & azione', serie: [scala('sp', 'Pensieri suicidari', '#C1714A'), sino('sa', 'Azione suicidaria', '#123534')] },
  { titolo: 'Intenzione autolesività & azione', serie: [scala('ai', 'Intenzione autolesività', '#C1714A'), sino('aa', 'Azione autolesività', '#123534')] },
  { titolo: 'Intenzione alcol & CBD', serie: [scala('alci', 'Intenzione alcol', '#F5CE47'), scala('cbdi', 'Intenzione CBD', '#1B4B4A')] },
  { titolo: 'Emotional eating', max: 1, serie: [sino('ee', 'Emotional eating', '#F5CE47')] },
  { titolo: 'Emozioni positive', serie: [scala('ser', 'Serenità', '#1B4B4A'), scala('gio', 'Gioia', '#F5CE47')] },
  { titolo: 'Tristezza, Paura, Rabbia', serie: [scala('tri', 'Tristezza', '#1B4B4A'), scala('pau', 'Paura', '#C1714A'), scala('rab', 'Rabbia', '#8A4A30')] },
  { titolo: 'Vergogna, Colpa, Vuoto, Sof. emotiva', serie: [scala('ver', 'Vergogna', '#8FB5B0'), scala('col', 'Colpa', '#2A6866'), scala('vuo', 'Vuoto', '#123534'), scala('se', 'Sof. emotiva', '#C1714A')] },
];

// Altri tre grafici che la versione desktop di Marea mostra in piu'
const GRAFICI_ESTESI = [
  { titolo: 'Sofferenza fisica & emotiva', serie: [scala('sf', 'Sofferenza fisica', '#C1714A'), scala('se', 'Sofferenza emotiva', '#8A4A30')] },
  { titolo: 'Intenzione suicidio', serie: [scala('sp', 'Intenzione suicidio', '#C1714A')] },
  { titolo: 'Intenzione autolesività', serie: [scala('ai', 'Intenzione autolesività', '#123534')] },
];

export default function Trend({ voci, estesi = false }) {
  if (!voci.length) return <p className={stili.vuoto}>Nessun giorno compilato ancora.</p>;
  const etichette = voci.map((v) => new Date(`${v.data}T12:00:00`).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' }));
  return (
    <div className={stili.griglia}>
      {(estesi ? [...GRAFICI, ...GRAFICI_ESTESI] : GRAFICI).map((g) => (
        <section key={g.titolo} className={stili.scheda}>
          <h2 className={stili.titolo}>{g.titolo}</h2>
          <GraficoLinee etichette={etichette} max={g.max} serie={g.serie.map((s) => s(voci))} />
        </section>
      ))}
    </div>
  );
}
