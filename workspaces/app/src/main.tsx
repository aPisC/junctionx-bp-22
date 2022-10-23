import React, { ReactNode } from 'react'
import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppWrapper from './AppWrapper'
import './index.css'
import { initTracer } from './tracer'

export interface MobileWrapperProps {
  children: ReactNode
}

initTracer()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isMobile ? (
      <div className="w-screen h-screen overflow-auto">
        <App />
      </div>
    ) : (
      <AppWrapper>
        <App />
      </AppWrapper>
    )}
  </React.StrictMode>
)
