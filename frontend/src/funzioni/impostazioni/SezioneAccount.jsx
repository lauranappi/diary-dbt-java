import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import Riga from './Riga.jsx';
import stili from './Sezione.module.css';

export default function SezioneAccount() {
  const { esci } = useAutenticazione();
  return (
    <div className={stili.sezione}>
      <h2 className={stili.titolo}>Account</h2>
      <button type="button" className={stili.rigaAzione} onClick={esci}>
        <Riga nome="Logout" descrizione="Torna alla schermata di accesso (i dati restano salvati)" />
      </button>
    </div>
  );
}
