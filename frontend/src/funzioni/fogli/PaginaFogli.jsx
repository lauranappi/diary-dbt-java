import { Link } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { GRUPPI_FOGLI } from '../../contenuti/fogli/index.js';
import { useFogli } from './useFogli.js';
import stili from './Fogli.module.css';

// Tutti i fogli di lavoro, per modulo, con quanti ne hai compilati
export default function PaginaFogli() {
  const { compilati } = useFogli();
  return (
    <>
      <Hero soloDesktop semplice titolo="Fogli di lavoro" sottotitolo="Per esercitarti con le abilità, passo dopo passo." />
      <div className={stili.contenuto}>
        <Link to="/guida" className={stili.indietro}>← Guida</Link>
        <Link to="/fogli/piano-crisi" className={stili.riga}>
          <span className={stili.testoRiga}>
            <span className={stili.titoloRiga}>Piano di crisi</span>
            <span className={stili.sottoRiga}>Le mie abilità e contatti per i momenti difficili</span>
          </span>
        </Link>
        {GRUPPI_FOGLI.map((g) => (
          <section key={g.id} className={stili.gruppo} aria-label={g.nome}>
            <h2 className={stili.nomeGruppo}>{g.nome}</h2>
            {g.fogli.map((f) => {
              const n = compilati(f.id).length;
              return (
                <Link key={f.id} to={`/fogli/${f.id}`} className={stili.riga}>
                  <span className={stili.testoRiga}>
                    <span className={stili.titoloRiga}>{f.titolo}</span>
                    {f.riferimento && <span className={stili.sottoRiga}>{f.riferimento}</span>}
                  </span>
                  {n > 0 && <span className={stili.conta} aria-label={`${n} compilati`}>{n}</span>}
                </Link>
              );
            })}
          </section>
        ))}
      </div>
    </>
  );
}
