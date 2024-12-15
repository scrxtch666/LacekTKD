import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import Body from './Components/Body.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Header />

    <main className="pt-20">
    <App />
    
      </main>
    <Footer />
    </>
    
  </StrictMode>,
)
