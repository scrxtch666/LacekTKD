import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import Body from './layout/Body.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
     
      
      <main className="pt-20">
      
        <Body>
        
          <App />
          
          
        </Body>
      </main>
      
    </>
  </StrictMode>,
);
