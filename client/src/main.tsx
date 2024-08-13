import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import configAmplify from './utilities/amplifyConfig.ts'

configAmplify();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
