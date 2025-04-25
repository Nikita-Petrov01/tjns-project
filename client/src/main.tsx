import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import 'flowbite/dist/flowbite.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
