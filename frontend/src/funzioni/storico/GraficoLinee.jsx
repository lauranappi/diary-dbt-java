import stili from './GraficoLinee.module.css';

const LARGHEZZA = 320;
const ALTEZZA = 170;
const MARGINE = { sopra: 8, destra: 16, sotto: 22, sinistra: 22 };
const COLORE_TESTO = 'rgba(120,140,135,.7)';

// Curva morbida che passa per i punti (Catmull-Rom convertita in curve di Bezier)
function percorso(punti) {
  if (punti.length === 1) return `M${punti[0].x} ${punti[0].y}`;
  let d = `M${punti[0].x} ${punti[0].y}`;
  for (let i = 0; i < punti.length - 1; i++) {
    const p0 = punti[i - 1] || punti[i];
    const p1 = punti[i];
    const p2 = punti[i + 1];
    const p3 = punti[i + 2] || p2;
    const y = (v) => Math.min(Math.max(v, MARGINE.sopra), ALTEZZA - MARGINE.sotto);
    d += ` C${p1.x + (p2.x - p0.x) / 6} ${y(p1.y + (p2.y - p0.y) / 6)} ${p2.x - (p3.x - p1.x) / 6} ${y(p2.y - (p3.y - p1.y) / 6)} ${p2.x} ${p2.y}`;
  }
  return d;
}

// Un grafico a linee: una linea per serie, valori da 0 a max, etichette in basso.
//   serie: [{ nome, colore, valori: [n | null, ...] }]
export default function GraficoLinee({ etichette, serie, max = 5 }) {
  const larghezzaUtile = LARGHEZZA - MARGINE.sinistra - MARGINE.destra;
  const altezzaUtile = ALTEZZA - MARGINE.sopra - MARGINE.sotto;
  const x = (i) => MARGINE.sinistra + (etichette.length === 1 ? larghezzaUtile / 2 : (i * larghezzaUtile) / (etichette.length - 1));
  const y = (v) => MARGINE.sopra + altezzaUtile - (v / max) * altezzaUtile;
  const passo = Math.max(1, Math.ceil(etichette.length / 7));
  const righe = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <figure className={stili.grafico}>
      <svg viewBox={`0 0 ${LARGHEZZA} ${ALTEZZA}`} role="img" aria-label={serie.map((s) => s.nome).join(', ')}>
        {righe.map((r) => (
          <g key={r}>
            <line x1={MARGINE.sinistra} x2={LARGHEZZA - MARGINE.destra} y1={y(r)} y2={y(r)} stroke="rgba(120,160,155,.18)" strokeDasharray="3" />
            <text x={MARGINE.sinistra - 6} y={y(r) + 3} textAnchor="end" fontSize="10" fill={COLORE_TESTO}>{r}</text>
          </g>
        ))}
        {etichette.map((e, i) => i % passo === 0 && (
          <text key={e + i} x={x(i)} y={ALTEZZA - 6} textAnchor="middle" fontSize="9" fill={COLORE_TESTO}>{e}</text>
        ))}
        {serie.map((s) => {
          // una linea per ogni tratto di giorni consecutivi con un valore
          const tratti = [];
          let corrente = [];
          s.valori.forEach((v, i) => {
            if (v === null || v === undefined) { if (corrente.length) tratti.push(corrente); corrente = []; } else corrente.push({ x: x(i), y: y(v) });
          });
          if (corrente.length) tratti.push(corrente);
          return (
            <g key={s.nome}>
              {tratti.map((t, i) => (t.length > 1
                ? <path key={i} d={percorso(t)} fill="none" stroke={s.colore} strokeWidth="2.5" strokeLinecap="round" />
                : <circle key={i} cx={t[0].x} cy={t[0].y} r="3.5" fill={s.colore} />))}
            </g>
          );
        })}
      </svg>
      <figcaption className={stili.legenda}>
        {serie.map((s) => (
          <span key={s.nome} className={stili.voce}><i style={{ background: s.colore }} />{s.nome}</span>
        ))}
      </figcaption>
    </figure>
  );
}
