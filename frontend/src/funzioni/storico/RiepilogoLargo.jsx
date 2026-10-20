import { massimoScala } from './calcoli.js';
import { meglioSeAlto, peggioraSeAlto } from './colori.js';
import stili from './RiepilogoLargo.module.css';

// I dieci contatori della versione desktop, cinque per riga
export default function RiepilogoLargo({ numeri, voci }) {
  const celle = [
    { n: 'Azioni suicidarie', v: numeri.azioniSuicidarie, colore: peggioraSeAlto(numeri.azioniSuicidarie) },
    { n: 'Azioni autolesività', v: numeri.azioniAutolesive, colore: peggioraSeAlto(numeri.azioniAutolesive) },
    { n: 'Intenzione suicidaria (massimo)', v: massimoScala(voci, 'sp') ?? '—', colore: peggioraSeAlto(massimoScala(voci, 'sp')) },
    { n: 'Intenzione autolesività (massimo)', v: massimoScala(voci, 'ai') ?? '—', colore: peggioraSeAlto(massimoScala(voci, 'ai')) },
    { n: 'Giorni con alcol', v: numeri.giorniAlcol, colore: peggioraSeAlto(numeri.giorniAlcol) },
    { n: 'Giorni con CBD', v: numeri.giorniCbd, colore: peggioraSeAlto(numeri.giorniCbd) },
    { n: 'Emotional eating', v: numeri.emotionalEating, colore: peggioraSeAlto(numeri.emotionalEating) },
    { n: 'Abilità DBT usate', v: numeri.abilita, colore: meglioSeAlto(numeri.abilita) },
    { n: 'Farmaci saltati', v: numeri.farmaciSaltati, colore: peggioraSeAlto(numeri.farmaciSaltati) },
    { n: 'Rapporti occasionali', v: numeri.rapporti },
  ];
  return (
    <div className={stili.griglia}>
      {celle.map((c) => (
        <div key={c.n} className={stili.cella}>
          <span className={stili.valore} style={c.colore ? { color: c.colore } : undefined}>{c.v}</span>
          <span className={stili.nome}>{c.n}</span>
        </div>
      ))}
    </div>
  );
}
