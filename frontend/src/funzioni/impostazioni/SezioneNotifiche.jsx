import Interruttore from './Interruttore.jsx';
import Riga from './Riga.jsx';
import { usePromemoria } from './usePromemoria.js';
import stili from './Sezione.module.css';

export default function SezioneNotifiche() {
  const p = usePromemoria();

  return (
    <div className={stili.sezione}>
      <h2 className={stili.titolo}>Notifiche</h2>
      {!p.supportato && <p className={stili.avviso}>Questo dispositivo non supporta le notifiche. Su iPhone installa prima l'app dalla schermata Home.</p>}
      <Riga nome="Promemoria giornaliero" descrizione="Notifica se non hai ancora compilato">
        <Interruttore acceso={p.attivo} etichetta="Promemoria giornaliero" disabilitato={!p.supportato || p.occupato} onCambia={p.cambiaAttivo} />
      </Riga>
      <Riga nome="Orario promemoria" htmlFor="impostazioni-ora">
        <input id="impostazioni-ora" className={`${stili.campo} ${stili.ora}`} type="time" value={p.ora}
          onChange={(e) => p.cambiaOra(e.target.value)} />
      </Riga>
      <Riga nome="Prova">
        <button type="button" className={stili.prova} disabled={!p.attivo || p.occupato} onClick={p.prova}>Invia una prova</button>
      </Riga>
      {p.messaggio && <p className={stili.errore} role="alert">{p.messaggio}</p>}
    </div>
  );
}
