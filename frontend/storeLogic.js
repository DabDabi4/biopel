import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const useStoreLogic = () => {
  const [fuelBrackets, setFuelBrackets] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuelBrackets = async () => {
      try {
        const { data, error } = await supabase.from('fuel_brackets').select('*');
        if (error) throw error;
        setFuelBrackets(data || []);
        setFilteredData(data || []);
      } catch (error) {
        console.error('Помилка завантаження:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFuelBrackets();
  }, []);

  useEffect(() => {
    const filtered = fuelBrackets.filter(item => {
      if (searchFilter === 'all') {
        return Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return item[searchFilter]?.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredData(filtered);
  }, [searchQuery, searchFilter, fuelBrackets]);

  const handleProductClick = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/menuProduct');
  };

  const handleAddProduct = () => {
    localStorage.setItem('selectedProduct', JSON.stringify({}));
    navigate('/menuProduct');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return {
    filteredData,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    loading,
    handleProductClick,
    handleAddProduct,
    handleProfileClick
  };
};

export default useStoreLogic;
