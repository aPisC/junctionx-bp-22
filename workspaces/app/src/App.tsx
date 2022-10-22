import React, { useState } from 'react'
import HomePage from './pages/home'

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
        <div className="w-full h-full  relative">
          <HomePage />
        </div>
      </ModalPortalContext.Provider>
    </>
  )
}

export default App
