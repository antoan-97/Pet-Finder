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
import LostAndFoundPets from './components/lost&foundPets/Lost&FoundPets'
import FoundPetForm from './components/lost&foundPets/foundPet/FoundPetForm'
import FoundPetsList from './components/lost&foundPets/foundPet/FoundPetsList'
import FoundPetDetails from './components/lost&foundPets/foundPet/FoundPetDetails'
import LostPetsList from './components/lost&foundPets/lostPet/LostPetsList'
import LostPetForm from './components/lost&foundPets/lostPet/LostPetsForm'
import LostPetsDetails from './components/lost&foundPets/lostPet/LostPetsDetails'
import AdoptAPet from './components/adoptPet/AdoptAPet'
import DogAdoptionList from './components/adoptPet/dogAdoption/DogAdoptionList'
import DogAdoptionForm from './components/adoptPet/dogAdoption/DogAdoptionForm'
import DogAdoptionDetails from './components/adoptPet/dogAdoption/DogAdoptionDetails'
function App() {

  return (
    <div className='min-h-screen flex flex-col'>
      <AuthProvider>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about-us' element={<AboutUs />}></Route>
            <Route path='/guide' element={<PetAdoptionStarterGuide />}></Route>
            <Route path='/terms' element={<TermsOfCondition />}></Route>
            <Route path='/lost-found' element={<LostAndFoundPets />}></Route>
            <Route path='/adopt-pet' element={<AdoptAPet />} />

            <Route path='/found-pets' element={<FoundPetsList />}></Route>
            <Route path='/found-form' element={<FoundPetForm />}></Route>
            <Route path="/found-pet/:id" element={<FoundPetDetails />} />

            <Route path='/lost-pets' element={<LostPetsList />}></Route>
            <Route path='/lost-form' element={<LostPetForm />}></Route>
            <Route path="/lost-pet/:id" element={<LostPetsDetails />} />

            <Route path='/dog-adoption' element={<DogAdoptionList />} />
            <Route path='/dog-adoption-form' element={<DogAdoptionForm />} />
            <Route path='/adopt-dog/:id' element={<DogAdoptionDetails />} />

            <Route element={<GuestGuard />}>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/login' element={<Login />}></Route>
            </Route>

            <Route element={<AuthGuard />}>
              <Route path='/logout' element={<Logout />}></Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default App
