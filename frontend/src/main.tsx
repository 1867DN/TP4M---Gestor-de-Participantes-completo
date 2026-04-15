import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import { ParticipantesProvider } from './context/ParticipantesContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ParticipantesProvider>
      <Home />
    </ParticipantesProvider>
  </React.StrictMode>,
)
