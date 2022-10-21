import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { isMobile } from 'react-device-detect'
import AppWrapper from './AppWrapper'

export interface MobileWrapperProps {
  children: ReactNode
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isMobile ? (
      <App />
    ) : (
      <AppWrapper>
        <App />
      </AppWrapper>
    )}
  </React.StrictMode>
)
