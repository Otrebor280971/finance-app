import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <FinanceProvider>
    <App />
  </FinanceProvider>,
)
