import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import 'aos/dist/aos.css'
import './css/style.css'

import AOS from 'aos'

import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Help from './pages/Help'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import PageNotFound from './pages/PageNotFound'

import IndexPage from './components/IndexPage'
// import Pricing2 from './components/Pricing'
import Login from './components/Login'
import Register from './components/Register'
import UpgradePRO from './components/UpgradePRO'
import UpgradeSTANDARD from './components/UpgradeSTANDARD'
import { FailurePage, SuccessPage } from './components/StripePaymentResponse'
import Settings from './components/Settings'
import DirectoryPage from './pages/IndexPage'
import DirectoryPageNamespacePage from './pages/NamespacePage'
import ContentPage from './pages/ContentPage'
import FolderPage from './pages/FolderPage'

function App() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]) // triggered on route change

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/upgradePRO" element={<UpgradePRO />} />
        <Route path="/upgradeSTANDARD" element={<UpgradeSTANDARD />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<FailurePage />} />

        <Route path="settings" element={<Settings />} />
        <Route path="/dashboard" element={<DirectoryPage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route
          path="/dashboard/:folder"
          element={<FolderPage />}
        />
        <Route
          path="/dashboard/:folder/:namespace"
          element={<DirectoryPageNamespacePage />}
        />

        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
