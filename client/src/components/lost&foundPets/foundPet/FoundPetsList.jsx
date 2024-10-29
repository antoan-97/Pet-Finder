import AuthContext from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as petApi from '../../../services/petApi';
import FoundPetCard from "./FoundPetCard";

export default function FoundPetsList() {
  const { isAuthenticated } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    petApi.getAll()
      .then(result => setPets(result))
      .catch(err => {
        console.log(err);

      })
  }, [])
  return (
    <section className="bg-custom-gradient h-screen py-12">
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
          {pets.length > 0 ? (
          pets.map(pet => (
            <FoundPetCard key={pet._id} {...pet} />
          ))
        ) : (
          <h3 className='no-articles'>No pets found</h3>
        )}
          </div>
        </div>
      </div>

    </section>
  )
}

