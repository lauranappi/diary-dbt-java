// Mette in fila i salvataggi: partono uno alla volta, nell'ordine in cui sono stati fatti,
// cosi' un tocco veloce non puo' essere sovrascritto da uno precedente arrivato in ritardo.
export function creaCoda() {
  let ultimo = Promise.resolve();
  return (lavoro) => {
    const questo = ultimo.then(lavoro);
    ultimo = questo.catch(() => {});
    return questo;
  };
}
