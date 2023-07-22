import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import 'aos/dist/aos.css'
import './css/style.css'

import AOS from 'aos'
import { FailurePage, SuccessPage } from './components/StripePaymentResponse'
import Home from './pages/Home'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import PageNotFound from './pages/PageNotFound'
import Settings from './components/Settings'
import DirectoryPage from './pages/IndexPage'
import CompletedTask from './pages/CompletedTask'
import AssignedTask from './pages/AssignedTask'
import PendingTask from './pages/PendingTask'
import TaskRecap from './pages/TaskRecap'
import Rewards from './pages/Rewards'
import BuyReward from './pages/BuyReward'
import SearchDOM from './pages/SearchDOM'
import CurrentTask from './pages/CurrentTask'
import FailedTask from './pages/FailedTask'
import AcceptedTask from './pages/AcceptedTask'
import AllTask from './pages/AllTasks'
import Verify from './pages/Verify'
import TaskPage from './pages/TaskPage'
import DomPage from './pages/DomPage'
import AllSubmittedTasks from './pages/AllSubmittedTasks'
import CreateTask from './pages/CreateTask'
import CreateReward from './pages/CreateReward'
import ManageTask from './pages/ManageTask'
import SubRequests from './pages/SubRequests'
import PendingSubmissions from './pages/PendingSubmissions'
import ConnectedSub from './pages/ConnectedSub'
import ManageRewards from './pages/ManageRewards'
import SubPage from './pages/SubPage'
import PendingRewards from './pages/PendingRewards'
import SubmitTask from './pages/SubmitTask'
import AllRewardsBought from './pages/AllRewardsBought'
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
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/BuyReward" element={<BuyReward />} />
        <Route path="/Rewards" element={<Rewards />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/dashboard" element={<DirectoryPage />} />
        <Route path="/CurrentTask" element={<CurrentTask />} />
        <Route path="/AllTask" element={<AllTask />} />
        <Route path="/AllRewardsBought" element={<AllRewardsBought />} />
        <Route path="/SubmitTask" element={<SubmitTask />} />
        <Route path="/CreateTask" element={<CreateTask />} />
        <Route path="/CreateReward" element={<CreateReward />} />
        <Route path="/ManageTask" element={<ManageTask />} />
        <Route path="/ManageRewards" element={<ManageRewards />} />
        <Route path="/PendingSubmissions" element={<PendingSubmissions />} />
        <Route path="/SubRequests" element={<SubRequests />} />
        <Route path="/ConnectedSub" element={<ConnectedSub />} />
        <Route path="/CompletedTask" element={<CompletedTask />} />
        <Route path="/AllSubmittedTasks" element={<AllSubmittedTasks />} />
        <Route path="/FailedTask" element={<FailedTask />} />
        <Route path="/AcceptedTask" element={<AcceptedTask />} />
        <Route path="/AssignedTask" element={<AssignedTask />} />
        <Route path="/PendingTask" element={<PendingTask />} />
        <Route path="/PendingRewards" element={<PendingRewards />} />
        <Route path="/SearchDOM" element={<SearchDOM />} />
        <Route path="/TaskRecap" element={<TaskRecap />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify/:email/:otp" element={<Verify />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/sub/:id" element={<SubPage />} />
        <Route path="/dom/:id" element={<DomPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<FailurePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
