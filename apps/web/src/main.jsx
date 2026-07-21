import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSupabase } from '@senevent/shared'   // <-- import du package partagé
import './index.css'
import App from './App.jsx'

// Initialiser Supabase avec les variables d'environnement de Vite
initSupabase(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
