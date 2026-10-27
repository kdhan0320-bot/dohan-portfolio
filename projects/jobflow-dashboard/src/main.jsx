import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import theme from './theme.js'
import './index.css'

const mountApplication = () => ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)

// No React form can accept input until the one-time release check has finished.
if (window.__galpirokStartup) window.__galpirokStartup.then(mountApplication)
else mountApplication()
