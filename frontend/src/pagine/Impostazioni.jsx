import { useAutenticazione } from '../AuthContext';
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

        <button className="dc-btn-secondario dc-btn-pericolo" onClick={esci}>
          Esci dall'account
        </button>
      </div>
    </>
  );
}
