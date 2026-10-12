import CampoDiario from './CampoDiario.jsx';
import stili from './SchedaPasso.module.css';

// Un passo del diary: soprattitolo + scheda con i suoi gruppi di domande
export default function SchedaPasso({ passo, voce, imposta, attivo }) {
  return (
    <section className={`${stili.passo} ${attivo ? stili.attivo : ''}`} aria-label={passo.titolo}>
      <h2 className={stili.soprattitolo}>{passo.soprattitolo}</h2>
      <div className={stili.scheda}>
        {passo.gruppi.map((gruppo, i) => (
          <div key={i} className={`${stili.gruppo} ${gruppo.colonne === 3 ? stili.tre : ''}`}>
            {gruppo.campi.map((campo) => (
              <CampoDiario key={`${campo.tipo}-${campo.id}`} campo={campo} voce={voce} imposta={imposta} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
