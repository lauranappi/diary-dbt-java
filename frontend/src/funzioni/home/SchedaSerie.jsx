import stili from './Schede.module.css';

export default function SchedaSerie({ giorni }) {
  return (
    <div className={`${stili.scheda} ${stili.serie}`}>
      <span className={stili.numeroSerie}>{giorni}</span>
      <span className={stili.etichettaSerie}>giorni<br />di fila</span>
    </div>
  );
}
