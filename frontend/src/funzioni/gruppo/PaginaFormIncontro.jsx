import { useId, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Pulsante from '../../componenti/Pulsante.jsx';
import Postit from '../postit/Postit.jsx';
import { usePostit } from '../postit/usePostit.js';
import { useFogli } from '../fogli/useFogli.js';
import { ambitoCollegamento, costruisciCatalogo } from './catalogo.js';
import { ambiti, nomiAmbiti, norm, oggi } from './incontri.js';
import stili from './Gruppo.module.css';

const MAX_SUGGERIMENTI = 6;
const nuovoIdIncontro = () => `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

// Una riga: numero di pagina + titolo; scrivendo il titolo si cercano schede e fogli da collegare
function RigaPagina({ riga, catalogo, usati, onCambia, onTogli }) {
  const [aperti, setAperti] = useState(false);
  const parole = norm(riga.t).split(/\s+/).filter(Boolean);
  const trovati = useMemo(() => {
    if (!aperti || !parole.length) return [];
    return catalogo.filter((c) => !usati.includes(c.k) && parole.every((q) => norm(`${c.n} ${c.tipo} ${c.extra || ''}`).includes(q)));
  }, [aperti, parole, catalogo, usati]);
  const collegata = riga.l ? catalogo.find((c) => c.k === riga.l)?.n || riga.l : '';

  return (
    <div>
      <div className={stili.rigaPagina}>
        <input type="text" inputMode="numeric" className={`${stili.campo} ${stili.numero}`} placeholder="Pag." aria-label="Numero di pagina"
          value={riga.p} onChange={(e) => onCambia({ p: e.target.value })} />
        <input type="search" className={`${stili.campo} ${stili.titolo}`} placeholder="Titolo, o cerca scheda / foglio…" aria-label="Titolo della pagina" autoComplete="off"
          value={riga.t} onChange={(e) => { setAperti(true); onCambia({ t: e.target.value, ...(riga.l && norm(e.target.value).length < 2 ? { l: '' } : {}) }); }} />
        <button type="button" className={stili.togli} aria-label="Togli questa pagina" onClick={onTogli}>×</button>
      </div>
      {riga.l && <button type="button" className={stili.collegata} onClick={() => onCambia({ l: '' })}>Collegata: {collegata}  ×</button>}
      {trovati.length > 0 && (
        <div className={stili.suggerimenti}>
          {trovati.slice(0, MAX_SUGGERIMENTI).map((c) => (
            <button key={c.k} type="button" className={stili.suggerimento} onClick={() => { setAperti(false); onCambia({ l: c.k, t: c.n.split(' · ')[0] }); }}>
              <span className={stili.tipo}>{c.tipo}</span>
              <span className={stili.nome}>{c.n}</span>
            </button>
          ))}
          {trovati.length > MAX_SUGGERIMENTI && <span className={stili.altri}>Altri {trovati.length - MAX_SUGGERIMENTI}… scrivi di più per restringere.</span>}
        </div>
      )}
    </div>
  );
}

// Aggiungere o modificare un incontro
export default function PaginaFormIncontro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { incontri, salvaIncontro, rimuovi, lista, stato } = usePostit();
  const { compilati } = useFogli();
  const esistente = id ? incontri.find((i) => i.id === id) : null;
  const [idNuovo] = useState(nuovoIdIncontro);
  const idIncontro = esistente?.id ?? idNuovo;
  const dataId = useId();

  const [g, setG] = useState(null);
  const [righe, setRighe] = useState(null);
  // finché non si tocca nulla si mostra l'incontro salvato (può arrivare dal server dopo l'apertura)
  const data = g ?? esistente?.g ?? oggi();
  const elenco = righe ?? (esistente?.pp.length ? esistente.pp : [{ p: '', t: '', l: '' }]).map((y) => ({ p: y.p || '', t: y.t || '', l: y.l || '' }));
  const catalogo = useMemo(() => costruisciCatalogo(compilati), [compilati]);
  const usati = elenco.map((r) => r.l).filter(Boolean);
  const ambito = ambiti(elenco, ambitoCollegamento);
  const [errore, setErrore] = useState(false);

  if (id && !esistente && stato !== 'caricamento') {
    return <div className={stili.contenuto}><p role="alert">Questo incontro non esiste.</p></div>;
  }

  const cambia = (i, parte) => setRighe(elenco.map((r, k) => (k === i ? { ...r, ...parte } : r)));
  const togli = (i) => setRighe(elenco.length === 1 ? [{ p: '', t: '', l: '' }] : elenco.filter((_, k) => k !== i));
  const annulla = () => {
    if (!esistente) lista(`gn:${idIncontro}`).forEach((p) => rimuovi(`gn:${idIncontro}`, p.id)); // i post-it di un incontro mai salvato
    navigate(esistente ? `/gruppo/${idIncontro}` : '/gruppo');
  };
  const salva = () => {
    const pp = elenco.map((r) => ({ p: r.p.trim(), t: r.t.trim(), l: r.l })).filter((y) => y.p || y.t || y.l);
    if (!pp.length && !lista(`gn:${idIncontro}`).length) { setErrore(true); return; }
    salvaIncontro({ id: idIncontro, g: data || oggi(), pp, mm: ambiti(pp, ambitoCollegamento), n: '', ll: [] });
    navigate(`/gruppo/${idIncontro}`);
  };

  return (
    <>
      <Hero soloDesktop semplice titolo={esistente ? 'Modifica incontro' : 'Nuovo incontro'} sottotitolo="Data, pagine e appunti" />
      <div className={stili.contenuto}>
        <Link to={esistente ? `/gruppo/${idIncontro}` : '/gruppo'} className={stili.indietro}>← Indietro</Link>
        <div className={stili.form}>
          <div className={stili.gruppoCampo}>
            <label htmlFor={dataId} className={stili.etichetta}>Data dell’incontro</label>
            <input id={dataId} type="date" className={stili.campo} value={data} onChange={(e) => setG(e.target.value)} />
          </div>
          <div className={stili.gruppoCampo}>
            <span className={stili.etichetta}>Pagine del manuale</span>
            {elenco.map((r, i) => (
              <RigaPagina key={i} riga={r} catalogo={catalogo} usati={usati} onCambia={(parte) => cambia(i, parte)} onTogli={() => togli(i)} />
            ))}
            <Pulsante variante="secondario" className={stili.altra} onClick={() => setRighe([...elenco, { p: '', t: '', l: '' }])}>+ Un’altra pagina</Pulsante>
          </div>
          {ambito.length > 0 && <p className={stili.ambito}>Ambito: {nomiAmbiti(ambito)}</p>}
          <Postit chiave={`gn:${idIncontro}`} titolo="Appunti presi in gruppo" />
          {errore && <p role="alert" className={stili.ambito}>Scrivi almeno una pagina o un appunto.</p>}
          <div className={stili.azioni}>
            <span className={stili.spazio} />
            <Pulsante variante="secondario" onClick={annulla}>Annulla</Pulsante>
            <Pulsante onClick={salva}>Salva</Pulsante>
          </div>
        </div>
      </div>
    </>
  );
}
