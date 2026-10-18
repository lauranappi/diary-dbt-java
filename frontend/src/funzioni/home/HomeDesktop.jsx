import { useMemo } from 'react';
import ScalaNumerica from '../../componenti/ScalaNumerica.jsx';
import { GRUPPI_ABILITA, TOTALE_ABILITA, idAbilita } from '../../contenuti/abilita.js';
import { ETICHETTE_SCALE } from '../../contenuti/etichette.js';
import { compilata } from '../diario/voce.js';
import { useAbilitaOggi } from '../abilita/useAbilitaOggi.js';
import { useGiorno } from '../diario/useGiorno.js';
import { chiave } from '../diario/date.js';
import { giorniDiFila, recordDiFila, sofferenzaMedia, vociCompilate } from './calcoli.js';
import stili from './HomeDesktop.module.css';

const RAPIDE = ['ser', 'gio', 'pau', 'rab', 'tri', 'ver'];
const TOTALE_VOCI = 22; // 18 scale + 4 sì/no

// La parte centrale della home da schermo largo: la diary di oggi compilabile al volo,
// costanza, sofferenza media e le abilita' usate oggi (come la home di Marea su desktop).
// Le schede "Abilita' di oggi" la mette la pagina sotto.
export default function HomeDesktop({ voci, adesso, onApriDiary, children }) {
  const oggi = chiave(adesso);
  const { voce, imposta, salva } = useGiorno(oggi);
  const { usate, alterna } = useAbilitaOggi(oggi);

  // Le voci del server con quella di oggi com'e' adesso sullo schermo
  const vociOra = useMemo(() => {
    const altre = voci.filter((v) => v.data !== oggi);
    const locale = { data: oggi, scale: voce.scale, toggle: voce.toggle, testi: voce.testi, abilitaUsate: usate };
    return compilata(locale) ? [...altre, locale] : altre;
  }, [voci, voce, usate, oggi]);

  const serie = giorniDiFila(vociOra, adesso);
  const record = Math.max(recordDiFila(vociOra), serie);
  const media = sofferenzaMedia(vociOra);
  const fatte = vociCompilate(voce);

  const scegli = (id) => (valore) => {
    imposta('scale', id, valore);
    salva();
  };

  return (
    <div className={stili.pagina}>
      <div className={stili.riga}>
        <section className={`${stili.scheda} ${stili.oggi}`} aria-label="Diary di oggi">
          <div className={stili.testata}>
            <h2 className={stili.titolo}>Diary di oggi</h2>
            <span className={stili.conta}>{fatte === 0 ? 'non iniziata' : `${fatte} ${fatte === 1 ? 'voce' : 'voci'} su ${TOTALE_VOCI}`}</span>
          </div>
          <div className={stili.binario}><i style={{ width: `${Math.max(2, (fatte / TOTALE_VOCI) * 100)}%` }} /></div>
          <div className={stili.rapide}>
            {RAPIDE.map((id) => (
              <div key={id} className={stili.rapida}>
                <span className={stili.nomeRapida}>{ETICHETTE_SCALE[id]}</span>
                <ScalaNumerica etichetta={ETICHETTE_SCALE[id]} valore={voce.scale[id]} onChange={scegli(id)} classeFila={stili.celle} classeCella={stili.cella} />
              </div>
            ))}
          </div>
          <button type="button" className={stili.secondario} onClick={onApriDiary}>Apri la diary completa</button>
        </section>

        <div className={stili.laterali}>
          <section className={stili.scheda}>
            <span className={stili.kicker}>Costanza</span>
            <div className={stili.serie}>
              <span className={stili.numero}>{serie}</span>
              <span className={stili.etichettaSerie}>giorni<br />di fila</span>
            </div>
            <div className={stili.pallini} aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => <span key={i} className={i < Math.min(serie, 14) ? stili.pieno : ''} />)}
            </div>
            <span className={stili.nota}>{record > serie ? `Il tuo record è ${record} giorni.` : 'Questo è il tuo record.'}</span>
          </section>
          <section className={stili.scheda}>
            <span className={stili.kicker}>Sofferenza emotiva media</span>
            <div className={stili.serie}>
              <span className={stili.numero}>{media == null ? '—' : media.toFixed(1).replace('.', ',')}</span>
              <span className={stili.etichettaSerie}>su 5</span>
            </div>
            <span className={stili.nota}>Ultimi 14 giorni compilati.</span>
          </section>
        </div>
      </div>

      {children}

      <section className={stili.scheda} aria-label="Abilità usate oggi">
        <div className={stili.testata}>
          <h2 className={stili.titolo}>Abilità usate oggi</h2>
          <span className={stili.conta}>{Object.keys(usate).length} su {TOTALE_ABILITA}</span>
        </div>
        <div className={stili.gruppi}>
          {GRUPPI_ABILITA.map((gruppo) => (
            <div key={gruppo.nome} className={stili.gruppo}>
              <span className={stili.kicker}>{gruppo.nome}</span>
              {gruppo.voci.map((nome) => {
                const id = idAbilita(gruppo.nome, nome);
                const attiva = !!usate[id];
                return (
                  <button key={id} type="button" role="checkbox" aria-checked={attiva} className={stili.abilita} onClick={() => alterna(id)}>
                    <span className={`${stili.casella} ${attiva ? stili.spuntata : ''}`}>
                      {attiva && (
                        <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 7L5 10L11 3" stroke="#14201F" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      )}
                    </span>
                    <span className={`${stili.nomeAbilita} ${attiva ? stili.nomeAttiva : ''}`}>{nome}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
