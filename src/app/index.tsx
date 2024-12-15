import { ReactElement } from 'react';
import { AppProvider } from './core/state/AppContext';
import { AppRouter } from './routes/routes';
import './ui/styles/global.css';

export const App = (): ReactElement => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};