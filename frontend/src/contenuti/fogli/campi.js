// Gli strumenti per descrivere un foglio di lavoro: ogni campo ha una chiave (k), un'etichetta (l)
// e un tipo. 'titolo' è solo un'intestazione di sezione, non si compila.
export const testo = (k, l, segnaposto = '') => ({ k, l, tipo: 'testo', segnaposto });
export const area = (k, l, segnaposto = '') => ({ k, l, tipo: 'area', segnaposto });
export const scala = (k, l) => ({ k, l, tipo: 'scala' });
export const multi = (k, l, opzioni) => ({ k, l, tipo: 'multi', opzioni });
export const scelta = (k, l, opzioni) => ({ k, l, tipo: 'scelta', opzioni });
export const titolo = (t) => ({ titolo: t });
