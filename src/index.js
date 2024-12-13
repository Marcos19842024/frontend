import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { SendingProvider } from "./hooks/useSendContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SendingProvider>
      <App />
    </SendingProvider>
  </React.StrictMode>
);