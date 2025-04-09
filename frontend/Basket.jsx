import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { UserService } from './userService';
import './src/store.css';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await UserService.getCurrentUser();
        const isAdminUser = currentUser.role === 'admin';
        setIsAdmin(isAdminUser);
  
        let query = supabase
          .from('user_fuelbrackets')
          .select(`
            id,
            approved,
            user_id,
            fuel_brackets (
              id,
              fuel_type,
              price,
              image_url,
              supplier,
              availability
            ),
            users (
              username,
              email
            )
          `);
  
        if (!isAdminUser) {
          query = query.eq('user_id', currentUser.id);
        }
  
        const { data, error } = await query;
  
        if (error) throw error;
        setBasketItems(data || []);
      } catch (err) {
        console.error('Помилка завантаження кошика:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleApprove = async (itemId) => {
    try {
      const { error } = await supabase
        .from('user_fuelbrackets')
        .update({ approved: true })
        .eq('id', itemId);

      if (error) throw error;

      setBasketItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, approved: true } : item
        )
      );
    } catch (err) {
      console.error('Помилка при прийнятті замовлення:', err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const { error } = await supabase
        .from('user_fuelbrackets')
        .delete()
        .eq('id', itemId);

      if (error) throw error;

      setBasketItems(basketItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error('Помилка видалення товару з кошика:', err);
    }
  };

  const handleBack = () => {
    window.history.back(); // Повернення на попередню сторінку
  };

  if (loading) return <div className="loading">Завантаження кошика...</div>;

  return (
    <div className="store-container">
      <button className="back-button" onClick={handleBack}>Назад</button>
      <h1 className="logo">{isAdmin ? 'Замовлення користувачів' : 'Ваш кошик'}</h1>
      {basketItems.length === 0 ? (
        <p>Кошик порожній.</p>
      ) : (
        <div className="additional-container">
          {basketItems.map((item) => (
            <div key={item.id} className={`data-div ${item.approved ? 'disabled' : ''}`}>
              <img
                src={item.fuel_brackets.image_url}
                alt="Товар"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
              />
              <div className="text-content">
                <p>ID: {item.fuel_brackets.id}</p>
                <p>Тип палива: {item.fuel_brackets.fuel_type}</p>
                <p>Ціна: {item.fuel_brackets.price} грн</p>
                <p>Постачальник: {item.fuel_brackets.supplier}</p>
                <p>Наявність: {item.fuel_brackets.availability ? 'Так' : 'Ні'}</p>

                {isAdmin && item.users && (
                  <>
                    <p><strong>Користувач:</strong> {item.users.username}</p>
                    <p><strong>Email:</strong> {item.users.email}</p>
                  </>
                )}

                {item.approved && <p className="approved-label">Замовлення прийнято</p>}
              </div>

              {!item.approved && (
                <div className="button-group">
                  <button onClick={() => handleRemove(item.id)} className="remove-button">Видалити</button>
                  {isAdmin && (
                    <button onClick={() => handleApprove(item.id)} className="approve-button">
                      Прийняти
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Basket;
