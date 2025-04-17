import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStoreLogic from './storeLogic';
import './src/store.css';
import { UserService } from './userService'; // Імпортуємо UserService для перевірки ролі користувача

const StorePage = () => {
  const navigate = useNavigate();
  const {
    filteredData,
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    loading,
    handleAddProduct,
  } = useStoreLogic();

  const [userRole, setUserRole] = useState(null); // Стан для ролі користувача

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const currentUser = await UserService.getCurrentUser();
        setUserRole(currentUser.role); // Зберігаємо роль користувача
      } catch (error) {
        console.error('Помилка отримання користувача:', error);
      }
    };
    fetchUserRole();
  }, []);

  if (loading) return <div className="loading">Завантаження даних...</div>;

  // Сортуємо filteredData за id
  const sortedData = [...filteredData].sort((a, b) => a.id - b.id);

  const handleProfileClick = () => {
    navigate('/profilePage');
  };

  const handleProductClick = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/infoProduct');
  };

  // Обробник для натискання на BIOPEL
  const handleLogoClick = () => {
    navigate('/infoPage');  // Перехід на infoPage
  };

  return (
    <div className="store-container">
      <div className="container">
  
        <div className="header-container">
          <h1 className="logo" onClick={handleLogoClick}>BIOPEL</h1>
  
          <div className="top-buttons">
            <button className="top-button" onClick={handleProfileClick}>
              Профіль
            </button>
            <button className="top-button" onClick={() => navigate('/basket')}>
              🛒 Кошик
            </button>
          </div>
        </div>
  
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Пошук..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="search-filter"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <option value="all">Всі поля</option>
            <option value="id">ID</option>
            <option value="fuel_type">Тип палива</option>
            <option value="supplier">Постачальник</option>
            <option value="price">Ціна</option>
            <option value="calorific_value">Калорійність</option>
            <option value="availability">Наявність</option>
          </select>
        </div>
      </div>
  
      <div className="additional-container">
        {sortedData.map(item => (
          <div key={item.id} className="data-div" onClick={() => handleProductClick(item)}>
            <img
              src={item.image_url}
              alt="Паливний брикет"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className="text-content">
              <p>ID: {item.id}</p>
              <p>Тип палива: {item.fuel_type}</p>
              <p>Ціна: {item.price} грн</p>
              <p>Постачальник: {item.supplier}</p>
              <p>Наявність: {item.availability ? 'Так' : 'Ні'}</p>
            </div>
          </div>
        ))}
  
  {userRole === 'admin' && (
  <div className="data-div empty-block" onClick={handleAddProduct}>
    <p style={{ fontSize: '80px' }}>+</p>
  </div>
)}

      </div>
    </div>
  );
  
};

export default StorePage;
