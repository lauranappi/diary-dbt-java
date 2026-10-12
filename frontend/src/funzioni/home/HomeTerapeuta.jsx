import { useNavigate } from 'react-router-dom';
import Hero from '../../componenti/Hero.jsx';
import Scheda from '../../componenti/Scheda.jsx';
import { useAutenticazione } from '../autenticazione/useAutenticazione.js';
import { saluto } from './calcoli.js';
import stili from './PaginaHome.module.css';

// Home provvisoria della terapeuta: arriva completa con la fase delle pazienti
export default function HomeTerapeuta() {
  const { utente, esci } = useAutenticazione();
  const navigate = useNavigate();
  return (
    <>
      <Hero className={stili.hero} saluto={saluto(new Date().getHours())} titolo={utente.nome || utente.username} sottotitolo="Le tue pazienti ti aspettano." />
      <section className={stili.pila}>
        <Scheda onClick={() => navigate('/guida')} soprattitolo="Guida DBT" titolo="Le abilità spiegate passo per passo" />
        <button type="button" className={stili.esci} onClick={esci}>Esci</button>
      </section>
    </>
  );
}
