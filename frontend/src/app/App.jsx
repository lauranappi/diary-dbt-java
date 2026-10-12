import { BrowserRouter } from 'react-router-dom';
import { ProviderAutenticazione } from '../funzioni/autenticazione/ProviderAutenticazione.jsx';
import Percorsi from './Percorsi.jsx';

export default function App() {
  return (
    <ProviderAutenticazione>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Percorsi />
      </BrowserRouter>
    </ProviderAutenticazione>
  );
}
