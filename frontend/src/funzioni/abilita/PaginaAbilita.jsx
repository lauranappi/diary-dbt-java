import { useState } from 'react';
import Hero from '../../componenti/Hero.jsx';
import { GRUPPI_ABILITA, TOTALE_ABILITA } from '../../contenuti/abilita.js';
import { chiave } from '../diario/date.js';
import GruppoAbilita from './GruppoAbilita.jsx';
import { useAbilitaOggi } from './useAbilitaOggi.js';
import stili from './PaginaAbilita.module.css';

export default function PaginaAbilita() {
  const [oggi] = useState(() => chiave(new Date()));
  const { usate, alterna, errore } = useAbilitaOggi(oggi);
  const spuntate = Object.keys(usate).length;

  return (
    <>
      <Hero soloDesktop titolo="Abilità di oggi" sottotitolo={`${spuntate} su ${TOTALE_ABILITA} spuntate oggi`} />
      <div className={stili.contenuto}>
        {errore && <p className={stili.errore} role="alert">Non sono riuscita a salvare l'ultima spunta, riprova.</p>}
        {GRUPPI_ABILITA.map((gruppo) => (
          <GruppoAbilita key={gruppo.nome} gruppo={gruppo} usate={usate} onAlterna={alterna} />
        ))}
      </div>
    </>
  );
}
