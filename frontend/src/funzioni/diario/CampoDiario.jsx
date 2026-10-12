import AreaTesto from '../../componenti/AreaTesto.jsx';
import ScalaNumerica from '../../componenti/ScalaNumerica.jsx';
import SceltaSiNo from '../../componenti/SceltaSiNo.jsx';
import stili from './CampoDiario.module.css';

// Una domanda del diary, disegnata secondo il suo tipo (vedi contenuti/diario.js)
export default function CampoDiario({ campo, voce, imposta }) {
  const { tipo, id, etichetta } = campo;

  if (tipo === 'scala') {
    return (
      <div className={stili.campo}>
        <span className={stili.etichetta}>{etichetta}</span>
        <ScalaNumerica
          etichetta={etichetta}
          valore={voce.scale[id] ?? null}
          onChange={(v) => imposta('scale', id, v)}
          ultimaEtichetta={campo.ultimaEtichetta}
        />
        {campo.testoAbbinato && (
          <AreaTesto
            aria-label={`${etichetta} — dettagli`}
            placeholder={campo.testoAbbinato.segnaposto}
            value={voce.testi[campo.testoAbbinato.id] ?? ''}
            onChange={(e) => imposta('testi', campo.testoAbbinato.id, e.target.value)}
          />
        )}
      </div>
    );
  }

  if (tipo === 'sino') {
    return (
      <div className={stili.campo}>
        <span className={stili.etichetta}>{etichetta}</span>
        <SceltaSiNo etichetta={etichetta} valore={voce.toggle[id] ?? null} onChange={(v) => imposta('toggle', id, v)} />
      </div>
    );
  }

  return (
    <AreaTesto
      etichetta={etichetta}
      multilinea={tipo === 'area'}
      placeholder={campo.segnaposto}
      value={voce.testi[id] ?? ''}
      onChange={(e) => imposta('testi', id, e.target.value)}
    />
  );
}
