import { mediaScala } from './calcoli.js';
import stili from './RiepilogoLargo.module.css';

const formato = (v) => (v == null ? '—' : v.toFixed(1).replace('.', ','));

// I dieci contatori della versione desktop, cinque per riga
export default function RiepilogoLargo({ numeri, voci }) {
  const celle = [
    { n: 'Azioni suicidarie', v: numeri.azioniSuicidarie, allarme: numeri.azioniSuicidarie > 0 },
    { n: 'Azioni autolesività', v: numeri.azioniAutolesive, allarme: numeri.azioniAutolesive > 0 },
    { n: 'Intenzione suicidaria', v: formato(mediaScala(voci, 'sp')) },
    { n: 'Intenzione autolesività', v: formato(mediaScala(voci, 'ai')) },
    { n: 'Giorni con alcol', v: numeri.giorniAlcol },
    { n: 'Giorni con CBD', v: numeri.giorniCbd },
    { n: 'Emotional eating', v: numeri.emotionalEating },
    { n: 'Abilità DBT usate', v: numeri.abilita },
    { n: 'Farmaci saltati', v: numeri.farmaciSaltati, allarme: numeri.farmaciSaltati > 0 },
    { n: 'Rapporti occasionali', v: numeri.rapporti },
  ];
  return (
    <div className={stili.griglia}>
      {celle.map((c) => (
        <div key={c.n} className={stili.cella}>
          <span className={`${stili.valore} ${c.allarme ? stili.allarme : ''}`}>{c.v}</span>
          <span className={stili.nome}>{c.n}</span>
        </div>
      ))}
    </div>
  );
}
