import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import { useAutenticazione } from '../AuthContext';

const SCALE = [
  { id: 'ai', nome: 'Ideazione autolesiva' },
  { id: 'is', nome: 'Ideazione suicidaria' },
  { id: 'vg', nome: 'Vergogna' },
  { id: 'ra', nome: 'Rabbia' },
];

function oggiISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function Diario() {
  const { utente } = useAutenticazione();
  const [abilita, setAbilita] = useState([]);
  const [scale, setScale] = useState({});
  const [abilitaUsate, setAbilitaUsate] = useState({});
  const [note, setNote] = useState('');
  const [salvataggio, setSalvataggio] = useState('inattivo'); // inattivo | in-corso | fatto | errore
  const [erroreCaricamento, setErroreCaricamento] = useState(null);

  useEffect(() => {
    api.abilita()
      .then(setAbilita)
      .catch((err) => setErroreCaricamento(err.message));
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
        data: oggiISO(),
        scale,
        toggle: {},
        testi: { note },
        abilitaUsate,
        planner: {},
      });
      setSalvataggio('fatto');
    } catch {
      setSalvataggio('errore');
    }
  }

  return (
    <div className="pagina">
      <h1>Diary di oggi</h1>
      <p className="nota-piccola">Ciao {utente.username}</p>

      <section>
        <h2>Come ti senti</h2>
        {SCALE.map((s) => (
          <div key={s.id} className="riga-scala">
            <span>{s.nome}</span>
            <div className="cifre-scala">
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={scale[s.id] === n ? 'cifra-scala attiva' : 'cifra-scala'}
                  onClick={() => cambiaScala(s.id, n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Abilità usate oggi</h2>
        {erroreCaricamento && <p className="messaggio-errore">{erroreCaricamento}</p>}
        {Object.entries(abilitaPerModulo).map(([modulo, elenco]) => (
          <div key={modulo} className="gruppo-abilita">
            <h3>{modulo.replace('-', ' ')}</h3>
            {elenco.map((a) => (
              <label key={a.id} className="riga-abilita">
                <input
                  type="checkbox"
                  checked={!!abilitaUsate[a.id]}
                  onChange={() => cambiaAbilita(a.id)}
                />
                {a.nome}
              </label>
            ))}
          </div>
        ))}
      </section>

      <section>
        <h2>Note libere</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Qualcosa che vuoi annotare sulla giornata..."
        />
      </section>

      <button onClick={salva} disabled={salvataggio === 'in-corso'}>
        {salvataggio === 'in-corso' ? 'Salvataggio...' : '⤓ Salva giornata'}
      </button>
      {salvataggio === 'fatto' && <p className="messaggio-successo">Salvato.</p>}
      {salvataggio === 'errore' && <p className="messaggio-errore">Errore nel salvataggio, riprova.</p>}
    </div>
  );
}
