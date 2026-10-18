import { DESCRIZIONI_ABILITA, idAbilita } from '../../contenuti/abilita.js';
import stili from './GruppoAbilita.module.css';

// Un gruppo di abilita' con la sua miniatura e le voci da spuntare
export default function GruppoAbilita({ gruppo, usate, onAlterna }) {
  return (
    <section className={stili.gruppo}>
      <div className={stili.testata}>
        <img className={stili.icona} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/${gruppo.icona}.svg`} width="34" height="34" alt="" />
        <h2 className={stili.nome}>{gruppo.nome}</h2>
      </div>
      <div className={stili.scheda}>
        {gruppo.voci.map((voce) => {
          const id = idAbilita(gruppo.nome, voce);
          const attiva = !!usate[id];
          return (
            <button key={id} type="button" role="checkbox" aria-label={voce} aria-checked={attiva} className={stili.riga} onClick={() => onAlterna(id)}>
              <span className={`${stili.casella} ${attiva ? stili.spuntata : ''}`}>
                {attiva && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M2 7L5 10L11 3" stroke="#14201F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={`${stili.voce} ${attiva ? stili.voceAttiva : ''}`}>{voce}</span>
              {DESCRIZIONI_ABILITA[voce] && <span className={stili.spiegazione}>{DESCRIZIONI_ABILITA[voce]}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
