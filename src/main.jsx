// packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// css
import './index.css';
import './globals.css';
// components
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);