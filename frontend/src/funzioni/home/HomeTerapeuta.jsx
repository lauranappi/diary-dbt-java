import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import Scheda from '../../componenti/Scheda.jsx';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import { dataLunga } from '../gruppo/incontri.js';
import { nomePaziente } from '../pazienti/nomePaziente.js';
import { saluto } from './calcoli.js';
import { useRiepilogoTerapeuta } from './useRiepilogoTerapeuta.js';
import stili from './PaginaHome.module.css';
import stiliTerapeuta from './HomeTerapeuta.module.css';

// Home della terapeuta: quante pazienti, chi ha compilato oggi, segnalazioni recenti e il suo username
export default function HomeTerapeuta() {
  const { utente, esci } = useAutenticazione();
  const navigate = useNavigate();
  const { pazienti, compilateOggi, segnalazioni, caricamento, errore } = useRiepilogoTerapeuta();

  const sottotitolo = caricamento ? 'Un momento…' : `${pazienti.length} ${pazienti.length === 1 ? 'paziente' : 'pazienti'} · ${compilateOggi} ${compilateOggi === 1 ? 'ha compilato' : 'hanno compilato'} oggi`;

  return (
    <>
      <Hero className={stili.hero} saluto={saluto(new Date().getHours())} titolo={utente.cognome ? `Dott.ssa ${utente.cognome}` : utente.nome || utente.username} sottotitolo={sottotitolo}
        angolo={
          <button type="button" className={stili.impostazioni} onClick={() => navigate('/impostazioni')} aria-label="Impostazioni">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="2.6" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="9" cy="9" r="6.6" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3.2 3.4" />
            </svg>
          </button>
        } />
      <section className={stili.pila}>
        <Scheda>
          <span className={stiliTerapeuta.etichetta}>Il tuo username</span>
          <span className={stiliTerapeuta.username}>{utente.username}</span>
          <span className={stiliTerapeuta.nota}>Comunicalo alle pazienti in prima seduta.</span>
        </Scheda>

        <div className={stiliTerapeuta.titoloSezione}>
          <span className={stiliTerapeuta.etichetta}>Segnalazioni · 7 giorni</span>
          {!caricamento && !errore && <span className={stiliTerapeuta.conta}>{segnalazioni.length} {segnalazioni.length === 1 ? 'riga' : 'righe'}</span>}
        </div>
        {errore && <p className={stiliTerapeuta.errore} role="alert">Dati non disponibili: controlla la connessione e riprova.</p>}
        {!caricamento && !errore && segnalazioni.length === 0 && <p className={stiliTerapeuta.nota}>Nessuna segnalazione negli ultimi sette giorni.</p>}
        {segnalazioni.slice(0, 8).map((s) => (
          <Link key={`${s.pazienteId}-${s.giorno}-${s.tipo}`} to={`/pazienti/${s.pazienteId}`} className={stiliTerapeuta.segnalazione}>
            <span className={stiliTerapeuta.punto} aria-hidden="true" />
            <span className={stiliTerapeuta.testo}>
              <span className={stiliTerapeuta.nome}>{nomePaziente(s.paziente)}</span>
              <span className={stiliTerapeuta.cosa}>{s.tipo} · {dataLunga(s.giorno)}</span>
            </span>
          </Link>
        ))}

        <Pulsante pieno onClick={() => navigate('/pazienti')}>Tutte le pazienti</Pulsante>
        <Scheda onClick={() => navigate('/guida')} soprattitolo="Guida DBT" titolo="Le abilità spiegate passo per passo" />
        <button type="button" className={stili.esci} onClick={esci}>Esci</button>
      </section>
    </>
  );
}
