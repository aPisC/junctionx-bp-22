import React, { useState } from 'react'
import HomePage from './pages/home'
import HubPage from './pages/hub'
import LandingPage from './pages/landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ComparisonSelectorPage from './pages/comparisonSelector'

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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="hub" element={<HubPage />} />
              <Route path="comparison-selector" element={<ComparisonSelectorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ModalPortalContext.Provider>
    </>
  )
}

export default App
