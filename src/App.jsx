import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegisterForm from './pages/RegisterForm'
import DonationForm from './pages/DonationForm'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/donate' element={<DonationForm />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
