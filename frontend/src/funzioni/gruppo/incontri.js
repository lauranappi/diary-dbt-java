// Il Diario del gruppo: gli incontri di skills training con le pagine del manuale viste.
// Un incontro (stessa forma di Marea): { id, g: 'AAAA-MM-GG', pp: [{ p: pagina, t: titolo, l: collegamento }], mm: [ambiti], ts, d? }
// Collegamenti (l): 'gs:<scheda della Guida>' | 'fg:<foglio>' | 'fe:<foglio>:<compilato>'; quelli di Marea
// (sc:, sk:) restano come testo perché le schede sono state riordinate sul manuale.

export const AMBITI = [
  ['mind', 'Mindfulness'],
  ['tol', 'Tolleranza'],
  ['reg', 'Regolazione emotiva'],
  ['inter', 'Interpersonale'],
  ['gen', 'Generale'],
];
export const nomeAmbito = (m) => AMBITI.find(([id]) => id === m)?.[1] ?? '';
export const nomiAmbiti = (mm) => (mm || []).map(nomeAmbito).filter(Boolean).join(', ');

const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
const p2 = (n) => String(n).padStart(2, '0');
const anno4 = (a) => { const n = parseInt(a, 10); return n < 100 ? 2000 + n : n; };

export const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const oggi = (d = new Date()) => `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;

export function dataLunga(g) {
  const d = new Date(`${g}T12:00:00`);
  return Number.isNaN(d.getTime()) ? g : d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Le forme in cui si può cercare una data: "lunedì 5 ottobre 2026", 5/10/2026, 05/10, 2026-10-05...
export function dateCercabili(g) {
  const [a, m, n] = String(g || '').split('-');
  if (!a || !m || !n) return '';
  const mi = parseInt(m, 10);
  const ni = parseInt(n, 10);
  return ` ${[norm(dataLunga(g)), `${ni}/${mi}/${a}`, `${p2(ni)}/${p2(mi)}/${a}`, `${ni}/${mi}`, `${p2(ni)}/${p2(mi)}`, g].join(' ')} `;
}

// Intervalli scritti nella barra: "dal 5/10 al 12/10", "5/10 - 12/10/2026", "dal 5 al 12 ottobre"
export function intervallo(q, adesso = new Date()) {
  const t = norm(q);
  const anno = adesso.getFullYear();
  let m = t.match(/(?:dal\s+)?(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?\s*(?:-|al|fino al|a)\s*(\d{1,2})[/.](\d{1,2})(?:[/.](\d{2,4}))?/);
  let da;
  let a;
  if (m) {
    const a1 = anno4(m[3] || m[6] || anno);
    const a2 = anno4(m[6] || m[3] || anno);
    da = `${a1}-${p2(+m[2])}-${p2(+m[1])}`;
    a = `${a2}-${p2(+m[5])}-${p2(+m[4])}`;
  } else {
    m = t.match(new RegExp(`(?:dal\\s+)?(\\d{1,2})\\s*(?:-|al|fino al)\\s*(\\d{1,2})\\s+(${MESI.join('|')})(?:\\s+(\\d{4}))?`));
    if (!m) return null;
    const mm = MESI.indexOf(m[3]) + 1;
    const y = m[4] || anno;
    da = `${y}-${p2(mm)}-${p2(+m[1])}`;
    a = `${y}-${p2(mm)}-${p2(+m[2])}`;
  }
  if (da > a) [da, a] = [a, da];
  return { da, a, resto: t.replace(m[0], ' ') };
}

// L'ambito non si sceglie: lo ricava l'app dalle pagine (numeri del manuale) e dalle schede collegate
export function ambitoPerPagina(n) {
  const p = parseInt(n, 10);
  if (!(p > 0)) return '';
  if (p <= 44) return 'gen'; // introduzione, obiettivi, teoria
  if (p <= 112) return 'mind';
  if (p <= 199) return 'inter';
  if (p <= 316) return 'reg';
  if (p <= 420) return 'tol';
  return '';
}

// ambiti ordinati per frequenza; pagine e collegamenti pesano uguale. ambitoDi(l) dice l'ambito di un collegamento.
export function ambiti(pp, ambitoDi = () => '') {
  const conta = {};
  for (const y of pp || []) {
    for (const m of [ambitoPerPagina(y.p), y.l ? ambitoDi(y.l) : '']) if (m) conta[m] = (conta[m] || 0) + 1;
  }
  return Object.keys(conta).sort((a, b) => conta[b] - conta[a]);
}

// I collegamenti di Marea ai fogli speciali diventano collegamenti ai compilati di oggi
const VECCHI = { cf: 'r-controlla-fatti', pc: 'g-pro-contro', de: 'r-diario-emozioni', ca: 'g-catena' };
export function collegamentoNuovo(l) {
  const [tipo, ...resto] = String(l || '').split(':');
  return VECCHI[tipo] ? `fe:${VECCHI[tipo]}:${resto.join(':')}` : l;
}

// Porta un incontro di Marea (con una sola pagina p/t/l, o con "ll") alla forma attuale
export function normalizza(x) {
  const pp = (x.pp ? x.pp : x.p || x.t ? [{ p: x.p || '', t: x.t || '', ...(x.l ? { l: x.l } : {}) }] : []).map((y) => ({ ...y, l: collegamentoNuovo(y.l) }));
  const ll = x.ll?.length ? x.ll : x.l ? [x.l] : [];
  for (const l of ll) if (!pp.some((y) => y.l === collegamentoNuovo(l))) pp.push({ p: '', t: '', l: collegamentoNuovo(l) });
  return { ...x, pp, ll: [], mm: x.mm || (x.m ? [x.m] : []) };
}

export const riepilogoPagine = (x) => {
  const nums = x.pp.map((y) => y.p).filter(Boolean);
  return nums.length ? `${nums.length > 1 ? 'pp.' : 'p.'} ${nums.join(', ')}` : 'incontro';
};
export const titoli = (x) => x.pp.map((y) => y.t).filter(Boolean).join(' · ');

// Cerca negli incontri: pagine, titoli, ambito, testo dei post-it, date ("5/10", "dal 5/10 al 12/10"...)
export function filtra(incontri, domanda, testoPostit = () => '', adesso = new Date()) {
  const iv = intervallo(domanda, adesso);
  const parole = (iv ? iv.resto : norm(domanda)).split(/\s+/).filter(Boolean);
  return incontri
    .filter((x) => {
      if (iv && ((x.g || '') < iv.da || (x.g || '') > iv.a)) return false;
      const fieno = ` ${norm([x.pp.map((y) => `${y.p} ${y.t}`).join(' '), x.n || '', testoPostit(x), nomiAmbiti(x.mm)].join(' '))}${dateCercabili(x.g)}`;
      return parole.every((p) => (/\d\/\d|^\d{4}-/.test(p) ? fieno.includes(` ${p} `) || (/^\d{4}-/.test(p) && fieno.includes(` ${p}`)) : fieno.includes(p)));
    })
    .sort((a, b) => (b.g || '').localeCompare(a.g || '') || (b.ts || 0) - (a.ts || 0));
}
