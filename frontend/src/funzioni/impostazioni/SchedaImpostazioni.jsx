import stili from './PaginaImpostazioni.module.css';

export default function SchedaImpostazioni({ children }) {
  return <div className={stili.scheda}>{children}</div>;
}
