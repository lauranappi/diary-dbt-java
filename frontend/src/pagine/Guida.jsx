import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { DESCRIZIONI_ABILITA } from '../descrizioniAbilita';
import Intestazione from '../componenti/Intestazione';

const NOMI_MODULO = {
  'mindfulness': 'Mindfulness',
  'tolleranza-sofferenza': 'Tolleranza della sofferenza',
  'regolazione-emozioni': 'Regolazione delle emozioni',
  'efficacia-interpersonale': 'Efficacia interpersonale',
};

export default function Guida() {
  const [abilita, setAbilita] = useState([]);
  const [aperta, setAperta] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    api.abilita().then(setAbilita).catch((err) => setErrore(err.message));
  }, []);

  const perModulo = abilita.reduce((acc, a) => {
    (acc[a.modulo] ||= []).push(a);
    return acc;
  }, {});

  return (
    <>
      <Intestazione titolo="Guida DBT" sottotitolo="Le abilità, in breve" />
      <div className="dc-corpo">
        {errore && <p className="messaggio-errore">{errore}</p>}

        {Object.entries(perModulo).map(([modulo, elenco]) => (
          <div key={modulo} className="dc-card">
            <h2>{NOMI_MODULO[modulo] || modulo}</h2>
            {elenco.map((a) => (
              <div key={a.id} className="riga-guida-skill">
                <button
                  className="titolo-guida-skill"
                  onClick={() => setAperta(aperta === a.id ? null : a.id)}
                >
                  {a.nome}
                  <span className="freccia-guida">{aperta === a.id ? '−' : '+'}</span>
                </button>
                {aperta === a.id && (
                  <>
                    <p className="descrizione-guida-skill">
                      {DESCRIZIONI_ABILITA[a.id] || 'Descrizione non ancora disponibile.'}
                    </p>
                    {a.id === 'ei-dearman' && (
                      <Link to="/dear-man" className="link-strumento">
                        Apri il generatore di copione →
                      </Link>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
