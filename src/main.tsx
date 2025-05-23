import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConnectFourBoard } from './components/ConnectFourBoard.tsx';

import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConnectFourBoard />
  </StrictMode>,
);
