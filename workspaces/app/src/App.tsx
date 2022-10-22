import React, { useState } from 'react'
import HomePage from './pages/home'
import HubPage from './pages/hub'
import LandingPage from './pages/landing'

export const ModalPortalContext = React.createContext<any>(null)

function App() {
  const [modalPortalElement, setModalPortalElement] = useState<any>(null)
  return (
    <>
      <div
        id="modalPortal"
        ref={(e) => {
          setModalPortalElement(e)
        }}
      ></div>
      <ModalPortalContext.Provider value={modalPortalElement}>
        <div className="w-full h-full relative">
          <LandingPage />
        </div>
      </ModalPortalContext.Provider>
    </>
  )
}

export default App
