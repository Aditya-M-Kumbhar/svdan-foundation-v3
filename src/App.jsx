import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegisterForm from './pages/RegisterForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}