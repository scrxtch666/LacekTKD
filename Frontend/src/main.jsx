import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Body from './Components/Body.jsx';
import Fighter from './Components/Fighter.jsx';
import Showcase from './Components/Showcase.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Header />
      
      <main className="pt-20">
      
        <Body>
        <Showcase />
          <App />
          <Fighter />
          <Fighter />
          <Fighter /><Fighter />
          <App />
        </Body>
      </main>
      <Footer />
    </>
  </StrictMode>,
);
