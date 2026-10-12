const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

export function saluto(data) {
  const ora = data.getHours();
  if (ora < 6) return 'Buonanotte';
  if (ora < 13) return 'Buongiorno';
  if (ora < 18) return 'Buon pomeriggio';
  return 'Buonasera';
}

export function dataEstesa(data) {
  const giorno = GIORNI[data.getDay()];
  return `${giorno[0].toUpperCase()}${giorno.slice(1)} ${data.getDate()} ${MESI[data.getMonth()]}`;
}
