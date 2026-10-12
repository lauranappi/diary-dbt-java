import { useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import Scheda from '../../componenti/Scheda.jsx';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import { dataEstesa, saluto } from './saluto.js';
import stili from './PaginaHome.module.css';

export default function PaginaHome() {
  const { utente, esci } = useAutenticazione();
  const navigate = useNavigate();
  const adesso = new Date();
  const nome = utente.nome || utente.username;
  const eUnaPaziente = utente.ruolo === 'PAZIENTE';

  return (
    <>
      <Hero
        saluto={dataEstesa(adesso)}
        titolo={`${saluto(adesso)}, ${nome}`}
        sottotitolo={eUnaPaziente ? 'Come è andata oggi?' : 'Le tue pazienti ti aspettano.'}
        azione={
          eUnaPaziente && (
            <Pulsante variante="accento" onClick={() => navigate('/diario')} className={stili.azione}>
              Compila la diary
            </Pulsante>
          )
        }
        angolo={
          <button type="button" className={stili.impostazioni} onClick={() => navigate('/impostazioni')} aria-label="Impostazioni">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="2.6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="9" cy="9" r="6.6" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3.2 3.4" />
            </svg>
          </button>
        }
      />
      <section className={stili.pila}>
        {eUnaPaziente && <Scheda soprattitolo="Il tuo codice" titolo={utente.codicePaziente}>
          <span className={stili.nota}>Comunicalo a voce alla tua terapeuta se vuole collegarti a sé.</span>
        </Scheda>}
        <Scheda onClick={() => navigate('/guida')} soprattitolo="Guida DBT" titolo="Le abilità spiegate passo per passo" />
        <button type="button" className={stili.esci} onClick={esci}>Esci</button>
      </section>
    </>
  );
}
