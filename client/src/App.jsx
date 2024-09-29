import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import AboutUs from './components/aboutUs/AboutUs'
import PetAdoptionStarterGuide from './components/guides/AdoptionGuide'
import Register from './components/register/Register'
import Login from './components/Login/Login'
import TermsOfCondition from '../../server/controllers/terms/Terms'

function App() {

  return (
    <div className='bg-blue-300' >
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about-us' element={<AboutUs />}></Route>
        <Route path='/guide' element={<PetAdoptionStarterGuide />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/terms' element={<TermsOfCondition />}></Route>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
