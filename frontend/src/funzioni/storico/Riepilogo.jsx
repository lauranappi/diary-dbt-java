import stili from './Riepilogo.module.css';

import { meglioSeAlto, peggioraSeAlto } from './colori.js';

// Il numero grande dei giorni compilati e la griglia dei contatori
export default function Riepilogo({ numeri, periodo }) {
  const celle = [
    { n: 'Az. suicidarie', v: numeri.azioniSuicidarie, colore: peggioraSeAlto(numeri.azioniSuicidarie) },
    { n: 'Az. autolesività', v: numeri.azioniAutolesive, colore: peggioraSeAlto(numeri.azioniAutolesive) },
    { n: 'Giorni alcol', v: numeri.giorniAlcol, colore: peggioraSeAlto(numeri.giorniAlcol) },
    { n: 'Giorni CBD', v: numeri.giorniCbd, colore: peggioraSeAlto(numeri.giorniCbd) },
    { n: 'Emotional eating', v: numeri.emotionalEating, colore: peggioraSeAlto(numeri.emotionalEating) },
    { n: 'Farmaci saltati', v: numeri.farmaciSaltati, colore: peggioraSeAlto(numeri.farmaciSaltati) },
    { n: 'Rapporti occ.', v: numeri.rapporti, colore: numeri.rapporti ? 'var(--inchiostro)' : null },
    { n: 'Abilità DBT', v: numeri.abilita, colore: meglioSeAlto(numeri.abilita) },
  ];
  return (
    <div className={stili.griglia}>
      <div className={stili.grande}>
        <img className={stili.cerchi} src={`${import.meta.env.BASE_URL}illustrazioni/decorative/deco-cerchi-chiaro.svg`} alt="" />
        <span className={stili.numero}>{numeri.giorniCompilati}</span>
        <span className={stili.testo}>giorni compilati<br />su {periodo}</span>
      </div>
      {celle.map((c) => (
        <div key={c.n} className={stili.cella}>
          <div className={stili.valore} style={c.colore ? { color: c.colore } : undefined}>{c.v}</div>
          <div className={stili.nome}>{c.n}</div>
        </div>
      ))}
    </div>
  );
}
