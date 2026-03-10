import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index' // Sé específico con la ruta
import { theme } from './theme' // <-- Importa tu archivo de tema
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)