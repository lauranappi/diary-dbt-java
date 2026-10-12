import Pulsante from '../../componenti/Pulsante.jsx';
import stili from './StatoVuoto.module.css';

// Quando la giornata non ha ancora attivita'
export default function StatoVuoto({ onAggiungi }) {
  return (
    <div className={stili.vuoto}>
      <img src={`${import.meta.env.BASE_URL}illustrazioni/vuoti/vuoto-attivita.svg`} width="150" height="150" alt="" />
      <div className={stili.testo}>
        <p className={stili.titolo}>Nessuna attività pianificata</p>
        <p className={stili.sotto}>Aggiungine una: anche piccola va bene.</p>
      </div>
      <Pulsante variante="passo" className={stili.pulsante} onClick={onAggiungi}>Aggiungi attività</Pulsante>
    </div>
  );
}
