import '../css/app.css';

import { createRoot } from 'react-dom/client';

import App from './BacApp';

const root = document.getElementById('bac-root');

if (!root) {
    throw new Error('Impossible de trouver #bac-root dans le DOM');
}

createRoot(root).render(<App />);
