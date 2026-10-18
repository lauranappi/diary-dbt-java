// Le risposte di un foglio compilato come righe { etichetta, valore }, saltando i campi vuoti
export function riassunto(foglio, valori = {}) {
  const righe = [];
  for (const campo of foglio.campi) {
    if (campo.titolo) continue;
    const x = valori[campo.k];
    if (x == null || x === '' || (Array.isArray(x) && !x.length)) continue;
    righe.push({ etichetta: campo.l, valore: Array.isArray(x) ? x.join(', ') : campo.tipo === 'scala' ? `${x}/100` : String(x) });
  }
  return righe;
}

// Cosa mostrare come anteprima nell'elenco: la prima risposta scritta
export function anteprima(foglio, valori = {}) {
  const primo = foglio.campi.find((c) => (c.tipo === 'testo' || c.tipo === 'area') && valori[c.k]);
  return primo ? valori[primo.k] : '(vuoto)';
}
