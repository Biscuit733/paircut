import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/dancing-script/latin-400.css'
import '@fontsource/great-vibes/latin-400.css'
import '@fontsource/parisienne/latin-400.css'
import { App } from './app/App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
