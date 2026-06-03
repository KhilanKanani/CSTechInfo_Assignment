import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './Store/Store.jsx'
import { Toaster } from 'sonner'

export const SERVER_URL = import.meta.env.VITE_SERVER_URL

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <App />
    <Toaster position='top-right' richColors />
  </Provider>,
)
