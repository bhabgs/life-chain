import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

async function bootstrap() {
  // 开发环境启动 MSW
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

bootstrap()
