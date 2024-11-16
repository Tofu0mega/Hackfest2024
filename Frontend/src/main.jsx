import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';

import './index.css'
import App from './App.jsx'
import TryContextProvider from './Components/Context/TryContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TryContextProvider>
    <App />
  </TryContextProvider>
    
);
