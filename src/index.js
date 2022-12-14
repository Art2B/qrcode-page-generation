import React from 'react';
import { createRoot } from 'react-dom/client';

import './i18n';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './css/app.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);