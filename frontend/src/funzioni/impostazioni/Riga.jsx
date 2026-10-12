import stili from './Riga.module.css';

// Una riga delle impostazioni: a sinistra nome e spiegazione, a destra il controllo
export default function Riga({ nome, descrizione, children, htmlFor }) {
  return (
    <div className={stili.riga}>
      <div>
        <label className={stili.nome} htmlFor={htmlFor}>{nome}</label>
        {descrizione && <div className={stili.descrizione}>{descrizione}</div>}
      </div>
      {children}
    </div>
  );
}
