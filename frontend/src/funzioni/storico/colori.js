// Verde e rosso dei contatori in cima allo Storico: rosso se c'e' qualcosa da tenere d'occhio,
// verde se non c'e' niente (o, per le abilita', se ce ne sono).
export const VERDE = '#3D6B45';
export const ROSSO = '#B5473F';

export const peggioraSeAlto = (v) => (typeof v === 'number' ? (v > 0 ? ROSSO : VERDE) : undefined);
export const meglioSeAlto = (v) => (typeof v === 'number' && v > 0 ? VERDE : undefined);
