import stili from './Scheda.module.css';

// Pannello bianco arrotondato. Con "onClick" diventa una riga cliccabile.
export default function Scheda({ titolo, soprattitolo, onClick, children }) {
  const contenuto = (
    <>
      {soprattitolo && <span className={stili.soprattitolo}>{soprattitolo}</span>}
      {titolo && <span className={stili.titolo}>{titolo}</span>}
      {children}
    </>
  );
  if (onClick) {
    return <button type="button" className={`${stili.scheda} ${stili.riga}`} onClick={onClick}>{contenuto}</button>;
  }
  return <div className={stili.scheda}>{contenuto}</div>;
}
