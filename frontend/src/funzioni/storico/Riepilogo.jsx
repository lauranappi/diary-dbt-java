import stili from './Riepilogo.module.css';

const VERDE = '#3D6B45';
const ROSSO = '#B5473F';

// Il numero grande dei giorni compilati e la griglia dei contatori
export default function Riepilogo({ numeri, periodo }) {
  const celle = [
    { n: 'Az. suicidarie', v: numeri.azioniSuicidarie, colore: numeri.azioniSuicidarie ? ROSSO : null },
    { n: 'Az. autolesività', v: numeri.azioniAutolesive, colore: numeri.azioniAutolesive ? ROSSO : null },
    { n: 'Giorni alcol', v: numeri.giorniAlcol, colore: numeri.giorniAlcol ? ROSSO : null },
    { n: 'Giorni CBD', v: numeri.giorniCbd, colore: numeri.giorniCbd ? ROSSO : null },
    { n: 'Emotional eating', v: numeri.emotionalEating, colore: numeri.emotionalEating ? ROSSO : null },
    { n: 'Farmaci saltati', v: numeri.farmaciSaltati, colore: numeri.farmaciSaltati ? ROSSO : null },
    { n: 'Rapporti occ.', v: numeri.rapporti, colore: numeri.rapporti ? 'var(--inchiostro)' : null },
    { n: 'Abilità DBT', v: numeri.abilita, colore: numeri.abilita ? VERDE : null },
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
