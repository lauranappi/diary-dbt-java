import { Link } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import { giorniEtichetta, nomePaziente, ultimoAggiornamento } from './nomePaziente.js';
import { usePazienti } from './usePazienti.js';
import stili from './PaginaPazienti.module.css';

// L'elenco delle pazienti che hanno indicato questa terapeuta
export default function PaginaPazienti() {
  const { utente } = useAutenticazione();
  const { pazienti, caricamento, errore } = usePazienti();
  const conteggio = `${pazienti.length} ${pazienti.length === 1 ? 'paziente' : 'pazienti'}`;

  return (
    <>
      <Hero soloDesktop semplice titolo="Pazienti" sottotitolo={caricamento || errore ? 'Le persone che segui.' : conteggio} />
      <div className={stili.contenuto}>
        {errore && <p className={stili.errore} role="alert">Non riesco a caricare le pazienti: controlla la connessione e riprova.</p>}
        {!caricamento && !errore && pazienti.length === 0 && (
          <div className={stili.vuoto}>
            <p>Nessuna paziente ti ha ancora aggiunto come terapeuta.</p>
            <p className={stili.codice}>
              Comunica il tuo username alle tue pazienti: <strong>{utente.username}</strong>
            </p>
          </div>
        )}
        {pazienti.map((p) => (
          <Link key={p.id} to={`/pazienti/${p.id}`} className={stili.riga}>
            <span className={stili.testo}>
              <span className={stili.nome}>{nomePaziente(p)}</span>
              <span className={stili.sotto}>
                @{p.username} · {giorniEtichetta(p.giorniCompilati)} · aggiornato {ultimoAggiornamento(p.ultimoGiorno)}
              </span>
            </span>
            <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true">
              <path d="M2.5 2.5L8 9.5L2.5 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  );
}
