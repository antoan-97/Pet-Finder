import AuthContext from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as adoptionApi from '../../../services/adoptionApi';
import CatAdoptionCard from "./CatAdoptionCard";

export default function CatAdoptionList() {
    const { isAuthenticated } = useContext(AuthContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const result = await adoptionApi.getAllCats();
                setPets(result);
            } catch (err) {
                console.error('Error details:', {
                    message: err.message,
                    response: err.response,
                    stack: err.stack
                });
            } 
        };
        fetchCats();
    }, []);

    return (
        <section className="bg-custom-gradient min-h-screen pt-24 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
                    Cats for Adoption
                </h2>
                {isAuthenticated ? (
                    <div className="flex justify-center mb-12">
                        <Link to="/cat-adoption-form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
                            Add Cat for Adoption
                        </Link>
                    </div>
                ) : (
                    <p className="text-center text-green-700 mb-12">
                        You need to <Link to="/login" className="underline">log in</Link> to add a cat for adoption.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets && pets.length > 0 ? (
                        pets.map(pet => (
                            <CatAdoptionCard key={pet._id} {...pet} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-blackL text-xl">
                            No cats available for adoption at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
