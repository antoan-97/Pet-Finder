import AuthContext from "../../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import * as petApi from '../../../services/petApi';
import FoundPetCard from "./FoundPetCard";
import Pagination from "../../common/Pagination";

export default function FoundPetsList() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext(AuthContext);
  const [pets, setPets] = useState([]);
  const [totalPets, setTotalPets] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [fetchCount, setFetchCount] = useState(0);
  const fetchPets = async (page) => {
    const currentFetchCount = fetchCount + 1;
    setFetchCount(currentFetchCount);
    
    
    setLoading(true);
    try {
      const result = await petApi.getAllFound(page, itemsPerPage);
      setPets(result.pets || result);
      setTotalPets(result.total || result.length);
    } catch (err) {
      console.error('❌ [DEBUG] FoundPets Error in fetchPets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets(currentPage);
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalPets / itemsPerPage));

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section className="bg-custom-gradient min-h-screen pt-24  px-4 overflow-y-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
        {t('foundPets.title')}
      </h2>
      {isAuthenticated ? (
        <div className="flex justify-center mb-12">
          <Link to="/found-form" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            {t('foundPets.button')}
          </Link>
        </div>
      ) : (
        <p className="text-center text-green-700 mb-12">
          {t('foundPets.description')} <Link to="/login" className="underline">
            {t('foundPets.loginLink')}
          </Link>
          {t('foundPets.secondDescription')}
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
                <FoundPetCard key={pet._id} {...pet} />
              ))
            ) : (
              <h3 className='no-articles'>{t('foundPets.noPetsFound')}</h3>
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

