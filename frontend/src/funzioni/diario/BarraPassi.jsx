import stili from './BarraPassi.module.css';

// Una tacca per passo (fatti in giallo, quello attuale in petrolio) e il nome del passo
export default function BarraPassi({ passi, attuale, onScegli }) {
  return (
    <div className={stili.barra}>
      <div className={stili.tacche}>
        {passi.map((passo, i) => (
          <button
            key={passo.id}
            type="button"
            aria-label={`Passo ${i + 1}: ${passo.titolo}`}
            aria-current={i === attuale ? 'step' : undefined}
            className={`${stili.tacca} ${i === attuale ? stili.on : i < attuale ? stili.fatto : ''}`}
            onClick={() => onScegli(i)}
          />
        ))}
      </div>
      <div className={stili.nome}>
        <span className={stili.titolo}>{passi[attuale].titolo}</span>
        <span className={stili.conta}>{attuale + 1} di {passi.length}</span>
      </div>
    </div>
  );
}
