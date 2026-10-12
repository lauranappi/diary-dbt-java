import stili from './Pulsante.module.css';

// variante: 'primario' (petrolio), 'secondario' (chiaro), 'accento' (senape), 'testo' (solo scritta)
export default function Pulsante({ variante = 'primario', pieno = false, className = '', ...resto }) {
  const classi = [stili.pulsante, stili[variante], pieno ? stili.pieno : '', className].filter(Boolean).join(' ');
  return <button type="button" className={classi} {...resto} />;
}
