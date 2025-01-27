import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store.js';

import { LoginProvider } from '@context/LoginContext';
import Preloader from '@components/Preloader/Preloader';

import './global.scss';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </LoginProvider>
  </StrictMode>
);
