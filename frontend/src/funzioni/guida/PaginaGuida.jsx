import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import { MODULI_GUIDA, trovaScheda } from '../../contenuti/guida/moduli.js';
import { leggiSessione } from '../../api/sessione.js';
import { Freccia, Lente } from './Icone.jsx';
import { cerca } from './ricerca.js';
import { useGuidaPreferiti } from './useGuidaPreferiti.js';
import stili from './PaginaGuida.module.css';

const vai = (moduloId, schedaId) => `/guida/${moduloId}?scheda=${schedaId}`;

export default function PaginaGuida() {
  const [domanda, setDomanda] = useState('');
  const navigate = useNavigate();
  const ruolo = leggiSessione()?.utente?.ruolo;
  const { elenco: preferiti } = useGuidaPreferiti();
  const risultati = useMemo(() => cerca(domanda), [domanda]);
  const cercando = domanda.trim().length >= 2;

  return (
    <>
      <Hero soloDesktop semplice titolo="Guida DBT" sottotitolo="Le schede del manuale, modulo per modulo, con le abilità passo a passo." />
      <div className={stili.contenuto}>
        <label className={stili.campo}>
          <Lente />
          <input
            type="search"
            value={domanda}
            onChange={(e) => setDomanda(e.target.value)}
            placeholder="Cerca: rabbia, crisi, sonno…"
            aria-label="Cerca nella guida"
            autoComplete="off"
            spellCheck="false"
          />
        </label>

        {cercando ? (
          <div className={stili.risultati}>
            {risultati.length === 0 && <p className={stili.vuoto}>Nessuna scheda trovata. Prova con un’altra parola.</p>}
            {risultati.map(({ modulo, scheda }) => (
              <button key={scheda.id} type="button" className={stili.risultato} onClick={() => navigate(vai(modulo.id, scheda.id))}>
                <span className={stili.badge}>{scheda.etichetta || `SCHEDA ${scheda.numero}`}</span>
                <span className={stili.testoRisultato}>
                  <span className={stili.nome}>{scheda.titolo}</span>
                  <span className={stili.sotto}>{modulo.titolo} · Scheda {scheda.numero}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <>
            {preferiti.length > 0 && (
              <div className={stili.preferiti}>
                <h2 className={stili.titoloPreferiti}>I tuoi preferiti</h2>
                <div className={stili.chips}>
                  {preferiti.map((id) => {
                    const trovata = trovaScheda(id);
                    if (!trovata) return null;
                    return (
                      <Link key={id} to={vai(trovata.modulo.id, id)} className={stili.chip}>
                        {trovata.scheda.etichetta || trovata.scheda.titolo}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {MODULI_GUIDA.map((modulo) => (
              <Link key={modulo.id} to={`/guida/${modulo.id}`} className={stili.riga}>
                <img className={stili.illustrazione} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/${modulo.icona}.svg`} alt="" />
                <span className={stili.testoRiga}>
                  <span className={stili.titoloRiga}>{modulo.titolo}</span>
                  <span className={stili.sottoRiga}>{modulo.sottotitolo}</span>
                </span>
                <Freccia />
              </Link>
            ))}
            {ruolo === 'PAZIENTE' && (
              <Link to="/fogli" className={stili.riga}>
                <img className={stili.illustrazione} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/strumenti-generali.svg`} alt="" />
                <span className={stili.testoRiga}>
                  <span className={stili.titoloRiga}>Fogli di lavoro</span>
                  <span className={stili.sottoRiga}>Per esercitarti con le abilità, passo dopo passo</span>
                </span>
                <Freccia />
              </Link>
            )}
            {ruolo === 'PAZIENTE' && (
              <Link to="/appunti" className={stili.riga}>
                <img className={stili.illustrazione} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/strumenti-generali.svg`} alt="" />
                <span className={stili.testoRiga}>
                  <span className={stili.titoloRiga}>I tuoi appunti</span>
                  <span className={stili.sottoRiga}>I post-it scritti durante i gruppi</span>
                </span>
                <Freccia />
              </Link>
            )}
          </>
        )}
      </div>
    </>
  );
}
