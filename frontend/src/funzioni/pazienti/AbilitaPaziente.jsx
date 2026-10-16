import { conteggioAbilita } from './calcoliPaziente.js';
import stili from './VistePaziente.module.css';

// Le abilità che la paziente ha spuntato nel periodo, con quante giornate su quelle compilate
export default function AbilitaPaziente({ voci }) {
  const conti = conteggioAbilita(voci);
  const giorni = voci.length || 1;
  if (!conti.length) return <p className={stili.vuoto}>Nessuna abilità registrata.</p>;
  return (
    <ul className={stili.abilita}>
      {conti.map(({ nome, volte }) => (
        <li key={nome} className={stili.riga}>
          <span className={stili.nomeAbilita}>{nome}</span>
          <span className={stili.barra} aria-hidden="true"><i style={{ width: `${Math.min(100, (volte / giorni) * 100)}%` }} /></span>
          <span className={stili.volte}>{volte}/{giorni}</span>
        </li>
      ))}
    </ul>
  );
}
