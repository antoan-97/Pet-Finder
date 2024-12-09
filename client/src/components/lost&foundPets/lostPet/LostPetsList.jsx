import LostPetsCard from "./LostPetsCard";
import AuthContext from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as petApi from '../../../services/petApi';

export default function LostPetsList(){
    const { isAuthenticated } = useContext(AuthContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        petApi.getAllLost()
            .then(result => setPets(result))
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
    <section className="bg-custom-gradient min-h-screen py-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
          Lost Pets
        </h2>
        {isAuthenticated ? (
          <div className="flex justify-center mb-12">
            <Link to="/lost-form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              Add Lost Pet
            </Link>
          </div>
        ) : (
          <p className="text-center text-green-700 mb-12">
            You need to <Link to="/login" className="underline">log in</Link> to add a lost pet.
          </p>
        )}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.length > 0 ? (
              pets.map(pet => (
                <LostPetsCard key={pet._id} {...pet} />
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
