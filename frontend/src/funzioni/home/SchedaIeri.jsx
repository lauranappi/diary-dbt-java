import stili from './Schede.module.css';

export default function SchedaIeri({ emozioni }) {
  return (
    <div className={`${stili.scheda} ${stili.ieri}`}>
      <span className={stili.titolo}>Ieri</span>
      {emozioni.length === 0 ? (
        <p className={stili.nessuna}>Nessuna diary ieri.</p>
      ) : (
        emozioni.map((e) => (
          <div key={e.id} className={stili.barra}>
            <span className={stili.nomeBarra}>{e.nome}</span>
            <span className={stili.binario}><i style={{ width: `${(e.valore / 5) * 100}%` }} /></span>
            <span className={stili.valore}>{e.valore}</span>
          </div>
        ))
      )}
    </div>
  );
}
