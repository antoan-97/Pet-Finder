import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LoadingProvider } from './contexts/LoadingContext'
import './App.css'

import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import AboutUs from './components/aboutUs/AboutUs'
import Login from './components/Login/Login'
import Logout from './components/logout/Logout'
import Register from './components/register/Register'
import TermsOfCondition from '../src/components/terms/Terms'
import PetAdoptionStarterGuide from './components/guides/AdoptionGuide'
import ScrollToTop from './components/scrollToTop/ScrollToTop'
//guards
import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'
//lost&found pet
import LostAndFoundPets from './components/lost&foundPets/Lost&FoundPets'
//found pet
import FoundPetForm from './components/lost&foundPets/foundPet/FoundPetForm'
import FoundPetsList from './components/lost&foundPets/foundPet/FoundPetsList'
import FoundPetDetails from './components/lost&foundPets/foundPet/FoundPetDetails'
import FoundPetUpdate from './components/lost&foundPets/foundPet/FoundPetUpdate'
//adopt pet
import AdoptAPet from './components/adoptPet/AdoptAPet'
//lost pet
import LostPetsList from './components/lost&foundPets/lostPet/LostPetsList'
import LostPetForm from './components/lost&foundPets/lostPet/LostPetsForm'
import LostPetsDetails from './components/lost&foundPets/lostPet/LostPetsDetails'
import LostPetsUpdate from './components/lost&foundPets/lostPet/LostPetsUpdate'
//dog adoption
import DogAdoptionList from './components/adoptPet/dogAdoption/DogAdoptionList'
import DogAdoptionForm from './components/adoptPet/dogAdoption/DogAdoptionForm'
import DogAdoptionDetails from './components/adoptPet/dogAdoption/DogAdoptionDetails'
//cat adoption
import CatAdoptionList from './components/adoptPet/catAdoption/CatAdoptionList'
import CatAdoptionForm from './components/adoptPet/catAdoption/CatAdoptionForm'
import CatAdoptionDetails from './components/adoptPet/catAdoption/CatAdoptionDetails'

function App() {

  return (
    <LoadingProvider>
      <AuthProvider>
        <Navbar />
        <ScrollToTop />
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
            <Route path="/found-pets/:id" element={<FoundPetDetails />} />
            <Route path="/found-pets/:id/edit" element={<FoundPetUpdate />} />

            <Route path='/lost-pets' element={<LostPetsList />}></Route>
            <Route path='/lost-form' element={<LostPetForm />}></Route>
            <Route path="/lost-pet/:id" element={<LostPetsDetails />} />
            <Route path="/lost-pet/:id/edit" element={<LostPetsUpdate />} />

            <Route path='/dog-adoption' element={<DogAdoptionList />} />
            <Route path='/dog-adoption-form' element={<DogAdoptionForm />} />
            <Route path='/adopt-dog/:id' element={<DogAdoptionDetails />} />

            <Route path='/cat-adoption' element={<CatAdoptionList />} />
            <Route path='/cat-adoption-form' element={<CatAdoptionForm />} />
            <Route path='/adopt-cat/:id' element={<CatAdoptionDetails />} />

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
    </LoadingProvider>
  )
}

export default App
