import { createRoot } from 'react-dom/client';

import { App } from './App';

import '@/static/styles/global.scss';
import '@/static/styles/reset.scss';
import '@mantine/core/styles.css';
import '@/static/styles/fonts.scss';

createRoot(document.getElementById('root')!).render(<App />);
