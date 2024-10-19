import AuthContext from "../../../contexts/AuthContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
export default function FoundPets() {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <section className="bg-custom-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
            Found Pets
          </h2>
          {/* Show "Add Found Pet" button only for registered users */}
          {isAuthenticated ? (
            <div className="flex justify-center mb-12">
              <Link to="/form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                Add Found Pet
              </Link>
            </div>
          ) : (
            <p className="text-center text-green-700 mb-12">
              You need to <Link to="/login" className="underline">log in</Link> to add a found pet.
            </p>
          )}
  
          {/* Display all found pets */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Browse Found Pets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This will map over found pets */}
              {/* Example found pet */}
              <div className="bg-white rounded-lg shadow-lg p-4">
                <img
                  src="path-to-pet-image"
                  alt="Found Pet"
                  className="w-full h-48 object-cover mb-4"
                />
                <h4 className="text-xl font-semibold text-green-700 mb-2">Pet Name</h4>
                <p className="text-gray-600 mb-2">Location: City, State</p>
                <p className="text-gray-600 mb-4">Description of the pet...</p>
                <p className="text-gray-700 font-semibold">Contact: info@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}