import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import AboutUs from './components/aboutUs/AboutUs'
import PetAdoptionStarterGuide from './components/guides/AdoptionGuide'
import Register from './components/register/Register'
import Login from './components/Login/Login'
import Logout from './components/logout/Logout'
import TermsOfCondition from '../src/components/terms/Terms'
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
import LostFoundPets from './components/lost&foundPets/Lost&FoundPets'
import FoundPetForm from './components/lost&foundPets/foundPet/FoundPetForm'
import FoundPetsList from './components/lost&foundPets/foundPet/FoundPetsList'
import FoundPetDetails from './components/lost&foundPets/foundPet/details/FoundPetDetails'


function App() {

  return (
    <div className='bg-blue-300' >
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about-us' element={<AboutUs />}></Route>
          <Route path='/guide' element={<PetAdoptionStarterGuide />}></Route>
          <Route path='/terms' element={<TermsOfCondition />}></Route>
          <Route path='/lost-found' element={<LostFoundPets />}></Route>
          <Route path='/found-pets' element={<FoundPetsList />}></Route>
          <Route path='/form' element={<FoundPetForm />}></Route>
          <Route path="/pet/:id" element={<FoundPetDetails />} />


          <Route element={<GuestGuard />}>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>

          <Route element={<AuthGuard />}>
            <Route path='/logout' element={<Logout />}></Route>
          </Route>

        </Routes>
      </AuthProvider>
      <Footer />
    </div>
  )
}

export default App
