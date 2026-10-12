import Hero from '../../componenti/Hero.jsx';
import Scheda from './SchedaImpostazioni.jsx';
import SezioneAccount from './SezioneAccount.jsx';
import SezioneNotifiche from './SezioneNotifiche.jsx';
import SezioneProfilo from './SezioneProfilo.jsx';
import stili from './PaginaImpostazioni.module.css';

export default function PaginaImpostazioni() {
  return (
    <>
      <Hero soloDesktop semplice inAlto titolo="Impostazioni" sottotitolo="Profilo e preferenze" />
      <div className={stili.contenuto}>
        <Scheda>
          <SezioneProfilo />
          <SezioneNotifiche />
        </Scheda>
        <Scheda>
          <SezioneAccount />
        </Scheda>
      </div>
    </>
  );
}
