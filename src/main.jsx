import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';

import { UIProvider } from '@context/UIContext';

import './global.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UIProvider>
  </StrictMode>
);
