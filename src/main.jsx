import React from 'react';
import { createRoot } from 'react-dom/client';
// Global tokens and base styles must load BEFORE component CSS, so a component
// rule can override a base rule at equal specificity.
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
