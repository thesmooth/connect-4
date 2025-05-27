import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectFourBoard } from './components/ConnectFourBoard/ConnectFourBoard.tsx';

import './styles.css';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <ConnectFourBoard />
      </QueryClientProvider>
  </StrictMode>,
);
