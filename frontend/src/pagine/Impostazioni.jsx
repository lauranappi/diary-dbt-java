import { useAutenticazione } from '../AuthContext';
import { Link } from 'react-router-dom';
import Intestazione from '../componenti/Intestazione';

export default function Impostazioni() {
  const { utente, esci } = useAutenticazione();

  return (
    <>
      <Intestazione titolo="Impostazioni" sottotitolo="Profilo e preferenze" />
      <div className="dc-corpo">
        <div className="dc-card">
          <h2>Il tuo profilo</h2>
          <p><strong>Username:</strong> {utente.username}</p>
          {utente.codicePaziente && (
            <>
              <p className="nota-piccola">Il tuo codice, da comunicare alla tua terapeuta:</p>
              <p className="codice-grande">{utente.codicePaziente}</p>
            </>
          )}
        </div>

        <Link to="/piano-crisi" className="dc-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ margin: 0 }}>Piano di crisi →</h2>
          <p className="nota-piccola" style={{ margin: '6px 0 0' }}>Segnali d'allarme, strategie, contatti</p>
        </Link>

        <Link to="/catena-eventi" className="dc-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <h2 style={{ margin: 0 }}>Analisi della catena →</h2>
          <p className="nota-piccola" style={{ margin: '6px 0 0' }}>Capire cosa ha scatenato un comportamento</p>
        </Link>

        <button className="dc-btn-secondario dc-btn-pericolo" onClick={esci}>
          Esci dall'account
        </button>
      </div>
    </>
  );
}
