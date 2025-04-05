import LostPetsCard from "./LostPetsCard";
import AuthContext from "../../../contexts/AuthContext";
import Pagination from "../../common/Pagination";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as petApi from '../../../services/petApi';

export default function LostPetsList() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to show per page

  useEffect(() => {
    petApi.getAllLost()
      .then(result => {
        setPets(result);
        console.log('Total pets:', result.length); // Debug log
      })
      .catch(err => {
        console.error('Error details:', {
          message: err.message,
          response: err.response,
          stack: err.stack
        });
      })
  }, [])

  // Calculate pagination values
  const totalPages = Math.max(1, Math.ceil(pets.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPets = pets.slice(startIndex, endIndex);

  // Debug logs
  console.log('Total pets:', pets.length);
  console.log('Items per page:', itemsPerPage);
  console.log('Total pages:', totalPages);
  console.log('Current page:', currentPage);
  console.log('Current pets shown:', currentPets.length);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="bg-custom-gradient min-h-screen pt-24 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
          {t('lostPets.title')}
        </h2>
        {isAuthenticated ? (
          <div className="flex justify-center mb-12">
            <Link to="/lost-form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              {t('lostPets.button')}
            </Link>
          </div>
        ) : (
          <p className="text-center text-green-700 mb-12">
            {t('lostPets.description')} <Link to="/login" className="underline">
              {t('lostPets.loginLink')}
            </Link>
            {t('lostPets.secondDescription')}
          </p>
        )}

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPets.length > 0 ? (
              currentPets.map(pet => (
                <LostPetsCard key={pet._id} {...pet} />
              ))
            ) : (
              <h3 className='no-articles'>{t('lostPets.noPetsFound')}</h3>
            )}
          </div>
          
          {/* Show pagination regardless of pages count for testing */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}
