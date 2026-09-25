import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import Intestazione from '../componenti/Intestazione';

const SCALE = [
  { id: 'ai', nome: 'Ideazione autolesiva' },
  { id: 'is', nome: 'Ideazione suicidaria' },
  { id: 'vg', nome: 'Vergogna' },
  { id: 'ra', nome: 'Rabbia' },
];

function oggiISO() {
  return new Date().toISOString().slice(0, 10);
}

function dataOggiFormattata() {
  return new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
}

const NUMERO_PASSI = 3;

export default function Diario() {
  const [passo, setPasso] = useState(0);
  const [abilita, setAbilita] = useState([]);
  const [scale, setScale] = useState({});
  const [abilitaUsate, setAbilitaUsate] = useState({});
  const [note, setNote] = useState('');
  const [salvataggio, setSalvataggio] = useState('inattivo');
  const [erroreCaricamento, setErroreCaricamento] = useState(null);

  useEffect(() => {
    api.abilita().then(setAbilita).catch((err) => setErroreCaricamento(err.message));
  }, []);

  const abilitaPerModulo = abilita.reduce((acc, a) => {
    (acc[a.modulo] ||= []).push(a);
    return acc;
  }, {});

  const cambiaScala = useCallback((id, valore) => {
    setScale((s) => ({ ...s, [id]: valore }));
  }, []);

  const cambiaAbilita = useCallback((id) => {
    setAbilitaUsate((a) => ({ ...a, [id]: !a[id] }));
  }, []);

  async function salva() {
    setSalvataggio('in-corso');
    try {
      await api.salvaMioDiario({
        data: oggiISO(), scale, toggle: {}, testi: { note }, abilitaUsate, planner: {},
      });
      setSalvataggio('fatto');
    } catch {
      setSalvataggio('errore');
    }
  }

  return (
    <>
      <Intestazione sopraTitolo={dataOggiFormattata()} titolo="Oggi" />
      <div className="dc-corpo">
        <div className="dc-passi-barra">
          {Array.from({ length: NUMERO_PASSI }).map((_, i) => (
            <div key={i} className={
              'dc-passo-pallino' + (i < passo ? ' fatto' : i === passo ? ' attivo' : '')
            } />
          ))}
        </div>

        {passo === 0 && (
          <div className="dc-card">
            <h2>Come ti senti</h2>
            {SCALE.map((s) => (
              <div key={s.id} className="dc-riga-scala">
                <span className="dc-riga-scala-etichetta">{s.nome}</span>
                <div className="dc-celle-scala">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n} type="button"
                      className={scale[s.id] === n ? 'dc-cella-scala attiva' : 'dc-cella-scala'}
                      onClick={() => cambiaScala(s.id, n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {passo === 1 && (
          <div className="dc-card">
            <h2>Abilità usate</h2>
            {erroreCaricamento && <p className="messaggio-errore">{erroreCaricamento}</p>}
            {Object.entries(abilitaPerModulo).map(([modulo, elenco]) => (
              <div key={modulo} className="dc-gruppo-modulo">
                <h3>{modulo.replace(/-/g, ' ')}</h3>
                {elenco.map((a) => (
                  <label key={a.id} className="dc-riga-abilita">
                    <input type="checkbox" checked={!!abilitaUsate[a.id]} onChange={() => cambiaAbilita(a.id)} />
                    {a.nome}
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}

        {passo === 2 && (
          <div className="dc-card">
            <h2>Note libere</h2>
            <textarea
              className="dc-textarea" value={note} onChange={(e) => setNote(e.target.value)}
              rows={5} placeholder="Qualcosa che vuoi annotare sulla giornata..."
            />
          </div>
        )}

        <div className="dc-passi-nav">
          {passo > 0 && (
            <button className="dc-btn-secondario" onClick={() => setPasso((p) => p - 1)}>
              Indietro
            </button>
          )}
          {passo < NUMERO_PASSI - 1 ? (
            <button className="dc-btn-primario" onClick={() => setPasso((p) => p + 1)}>
              Avanti
            </button>
          ) : (
            <button className="dc-btn-primario" onClick={salva} disabled={salvataggio === 'in-corso'}>
              {salvataggio === 'in-corso' ? 'Salvataggio...' : '⤓ Salva giornata'}
            </button>
          )}
        </div>
        {salvataggio === 'fatto' && <p className="messaggio-successo">Salvato.</p>}
        {salvataggio === 'errore' && <p className="messaggio-errore">Errore nel salvataggio, riprova.</p>}
      </div>
    </>
  );
}
