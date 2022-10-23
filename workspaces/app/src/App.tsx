import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AbroadDashboardPage from './pages/abroadDashboard'
import AbroadHomePage from './pages/abroadHome'
import ComparisonDashboardPage from './pages/comparisonDashboard'
import ComparisonSelectorPage from './pages/comparisonSelector'
import HomePage from './pages/home'
import HubPage from './pages/hub'
import LandingPage from './pages/landing'
import SavingDashboardPage from './pages/savingDashboard'
import { SpinnerOverlay, SpinnerOverlayBackend } from './utils/SipnnerOverlay/SpinnerOverlay'

export const ModalPortalContext = React.createContext<any>(null)

function App() {
  const [modalPortalElement, setModalPortalElement] = useState<any>(null)
  return (
    <SpinnerOverlayBackend>
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
              <Route path="comparison-selector" element={<ComparisonSelectorPage redirect="/comparison-dashboard" />} />
              <Route path="comparison-dashboard" element={<ComparisonDashboardPage />} />
              <Route path="saving-selection" element={<ComparisonSelectorPage redirect="/saving-dashboard" />} />
              <Route path="saving-dashboard" element={<SavingDashboardPage />} />
              <Route path="saving-home" element={<AbroadHomePage reverseTransact={false} />} />
              <Route path="abroad-selection" element={<ComparisonSelectorPage redirect="/abroad-dashboard" />} />
              <Route path="abroad-dashboard" element={<AbroadDashboardPage />} />
              <Route path="abroad-home" element={<AbroadHomePage reverseTransact={true} />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ModalPortalContext.Provider>
      <SpinnerOverlay />
    </SpinnerOverlayBackend>
  )
}

export default App
