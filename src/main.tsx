import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/baloo-2/latin-400.css'
import '@fontsource/baloo-2/latin-700.css'
import '@fontsource/bubblegum-sans/latin-400.css'
import '@fontsource/chewy/latin-400.css'
import '@fontsource/comic-neue/latin-400.css'
import '@fontsource/comic-neue/latin-700.css'
import '@fontsource/dancing-script/latin-400.css'
import '@fontsource/fredoka/latin-400.css'
import '@fontsource/fredoka/latin-700.css'
import '@fontsource/great-vibes/latin-400.css'
import '@fontsource/luckiest-guy/latin-400.css'
import '@fontsource/pacifico/latin-400.css'
import '@fontsource/parisienne/latin-400.css'
import '@fontsource/patrick-hand/latin-400.css'
import '@fontsource/short-stack/latin-400.css'
import '@fontsource/sniglet/latin-400.css'
import { App } from './app/App.tsx'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
