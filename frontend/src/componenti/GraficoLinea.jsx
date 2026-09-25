// Grafico a linea semplice, disegnato a mano in SVG - niente libreria
// esterna, dato che serve solo mostrare un andamento su poche decine di
// punti, non un sistema di grafici completo.
export default function GraficoLinea({ punti, colore = 'var(--dc-terracotta)', altezza = 100 }) {
  if (!punti || punti.length < 2) {
    return <p className="nota-piccola">Servono almeno due giorni per un grafico.</p>;
  }

  const larghezza = 300;
  const margine = 10;
  const valori = punti.map((p) => p.valore);
  const min = 0;
  const max = Math.max(5, ...valori); // le scale vanno 0-5, ma resto flessibile

  const coordinata = (i, valore) => {
    const x = margine + (i / (punti.length - 1)) * (larghezza - margine * 2);
    const y = altezza - margine - ((valore - min) / (max - min || 1)) * (altezza - margine * 2);
    return [x, y];
  };

  const percorso = punti
    .map((p, i) => coordinata(i, p.valore))
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');

  return (
    <svg viewBox={`0 0 ${larghezza} ${altezza}`} className="dc-grafico-linea">
      <path d={percorso} fill="none" stroke={colore} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {punti.map((p, i) => {
        const [x, y] = coordinata(i, p.valore);
        return <circle key={i} cx={x} cy={y} r="3" fill={colore} />;
      })}
    </svg>
  );
}
