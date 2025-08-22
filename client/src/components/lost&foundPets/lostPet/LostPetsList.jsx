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
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add debug counter to track how many times fetchPets is called
  const [fetchCount, setFetchCount] = useState(0);

  // Fetch pets for current page
  const fetchPets = async (page) => {
    const currentFetchCount = fetchCount + 1;
    setFetchCount(currentFetchCount);
    

    
    setLoading(true);
    try {
      const result = await petApi.getAllLost(page, itemsPerPage);
      setPets(result.pets || result);
      setTotalPets(result.total || result.length);
    } catch (err) {
      console.error('❌ [DEBUG] Error in fetchPets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]); // Only depend on currentPage

 
  // Calculate pagination values
  const totalPages = Math.max(1, Math.ceil(totalPets / itemsPerPage));

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
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.length > 0 ? (
                pets.map(pet => (
                  <LostPetsCard key={pet._id} {...pet} />
                ))
              ) : (
                <h3 className='no-articles'>{t('lostPets.noPetsFound')}</h3>
              )}
            </div>
          )}
          
          {/* Only show pagination if there are multiple pages */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </section>
  )
}
