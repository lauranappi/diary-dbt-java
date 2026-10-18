import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { leggiSessione } from '../../api/sessione.js';
import { trovaModulo } from '../../contenuti/guida/moduli.js';
import Postit from '../postit/Postit.jsx';
import RigaScheda from './RigaScheda.jsx';
import { useGuidaPreferiti } from './useGuidaPreferiti.js';
import stili from './PaginaModulo.module.css';

export default function PaginaModulo() {
  const { modulo: idModulo } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const modulo = trovaModulo(idModulo);
  const richiesta = params.get('scheda');
  const [aperte, setAperte] = useState(() => (richiesta ? [richiesta] : []));
  const { elenco: preferiti, alterna } = useGuidaPreferiti();

  if (!modulo) return <Navigate to="/guida" replace />;

  const alternaApertura = (id) => setAperte((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div className={stili.pagina}>
      <button type="button" className={stili.indietro} onClick={() => navigate('/guida')} aria-label="Indietro">
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none" aria-hidden="true">
          <path d="M8 2.5L2.5 9.5L8 16.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={stili.intestazione}>
        <img className={stili.illustrazione} src={`${import.meta.env.BASE_URL}illustrazioni/miniature/${modulo.icona}.svg`} alt="" />
        <h1 className={stili.titolo}>{modulo.titolo}</h1>
      </div>
      <div className={stili.quando}>
        <strong>Quando usarla:</strong> {modulo.quando}
      </div>
      {modulo.schede.map((scheda) => {
        return (
          <div key={scheda.id}>
            {scheda.sezione && <h2 className={stili.sezione}>{scheda.sezione}</h2>}
            <RigaScheda
              modulo={modulo}
              scheda={scheda}
              aperta={aperte.includes(scheda.id)}
              evidenziata={scheda.id === richiesta}
              preferita={preferiti.includes(scheda.id)}
              onApriChiudi={() => alternaApertura(scheda.id)}
              onPreferita={() => alterna(scheda.id)}
            />
          </div>
        );
      })}
      {leggiSessione()?.utente?.ruolo === 'PAZIENTE' && <Postit chiave={`mod:${modulo.id}`} />}
      <Link to="/guida" className={stili.torna}>Torna alla Guida</Link>
    </div>
  );
}
