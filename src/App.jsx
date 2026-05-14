import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegisterForm from './pages/RegisterForm'
import DonationForm from './pages/DonationForm'
import DonationSuccess from './pages/DonationSuccess'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/donate' element={<DonationForm />} />
        <Route path='/donation-success' element={<DonationSuccess />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
