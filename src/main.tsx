import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './app/router';
import { useTheme } from './shared/theme/theme.store';
import './index.css';

function App() {
  const theme = useTheme(s => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <Router />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
