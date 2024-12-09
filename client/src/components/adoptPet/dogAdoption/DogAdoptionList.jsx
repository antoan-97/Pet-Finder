import AuthContext from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as adoptionApi from '../../../services/adoptionApi';
import DogAdoptionCard from "./DogAdoptionCard";

export default function FoundPetsList() {
  const { isAuthenticated } = useContext(AuthContext);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    adoptionApi.getAllDogs()
    .then(result => {
        if (Array.isArray(result)) {
          setPets(result); // Set pets only if result is an array
        } else {
          console.error("Unexpected response:", result);
          setPets([]); // Default to empty array if response is invalid
        }
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch dogs for adoption."); // Set error message
      });
  }, [])

  return (
    <section className="bg-custom-gradient min-h-screen py-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
          Dog for Adoption
        </h2>
        {isAuthenticated ? (
          <div className="flex justify-center mb-12">
            <Link to="/dog-adoption-form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              Add Dog for Adoption
            </Link>
          </div>
        ) : (
          <p className="text-center text-green-700 mb-12">
            You need to <Link to="/login" className="underline">log in</Link> to add a dog for adoption.
          </p>
        )}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.length > 0 ? (
              pets.map(pet => (
                <DogAdoptionCard key={pet._id} {...pet} />
              ))
            ) : (
              <h3 className='no-articles'>No dogs found</h3>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}