import stili from './SchermataAccesso.module.css';

// Cornice comune di accesso e registrazione: fondo petrolio, ramo decorativo,
// titolo e scheda bianca con il modulo.
export default function SchermataAccesso({ titolo, sottotitolo, children }) {
  return (
    <main className={stili.schermata}>
      <img
        className={stili.ramo}
        src={`${import.meta.env.BASE_URL}illustrazioni/decorative/deco-ramo-chiaro.svg`}
        alt=""
      />
      <div className={stili.contenitore}>
        <h1 className={stili.titolo}>{titolo}</h1>
        <p className={stili.sottotitolo}>{sottotitolo}</p>
        <div className={stili.scheda}>{children}</div>
      </div>
    </main>
  );
}
