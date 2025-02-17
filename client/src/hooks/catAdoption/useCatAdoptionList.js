import { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import * as adoptionApi from "../../services/adoptionApi";

export default function useCatAdoptionList() {
    const { t } = useTranslation();
    const [state, setState] = useState({
        pets: [],
        isLoading: true,
        error: null
    });

    const fetchCats = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const result = await adoptionApi.getAllCats();
            
            setState(prev => ({
                ...prev,
                pets: result,
                isLoading: false
            }));
        } catch (err) {
            console.error('Error details:', {
                message: err.message,
                response: err.response,
                stack: err.stack
            });
            
            setState(prev => ({
                ...prev,
                error: err.message || 'Failed to fetch cats',
                isLoading: false
            }));
        }
    }, []);

    useEffect(() => {
        fetchCats();

        // Cleanup function
        return () => {
            setState({
                pets: [],
                isLoading: true,
                error: null
            });
        };
    }, [fetchCats]);

    const refreshList = useCallback(() => {
        fetchCats();
    }, [fetchCats]);

    return {
        pets: state.pets,
        isLoading: state.isLoading,
        error: state.error,
        refreshList,
        t
    };
}
