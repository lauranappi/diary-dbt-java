import Hero from './Hero.jsx';
import Scheda from './Scheda.jsx';
import stili from './InPreparazione.module.css';

// Segnaposto per le sezioni che arrivano nelle fasi successive
export default function InPreparazione({ titolo }) {
  return (
    <>
      <Hero titolo={titolo} />
      <div className={stili.contenuto}>
        <Scheda soprattitolo="In arrivo" titolo="Questa sezione è in preparazione" />
      </div>
    </>
  );
}
