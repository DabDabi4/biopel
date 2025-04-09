import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './src/infoProduct.css';
import { UserService } from './userService'; // Імпортуємо сервіс для користувачів
import { UserFuelBracketsService } from './user_fuelbrackets'; // Оновлений імпорт

const InfoProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Отримуємо продукт з localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      navigate('/storePage'); // Якщо продукт не знайдений, переходимо назад на сторінку магазину
    }

    const fetchUserRole = async () => {
      try {
        const currentUser = await UserService.getCurrentUser();
        setUserRole(currentUser.role); // Зберігаємо роль користувача
      } catch (error) {
        console.error('Помилка отримання користувача:', error);
      }
    };
    fetchUserRole();
  }, [navigate]);

  const handleEdit = () => {
    navigate('/menuProduct', { state: { product } }); // Перехід на сторінку редагування продукту
  };

  const handleOrder = async () => {
    try {
      const currentUser = await UserService.getCurrentUser();
      if (product) {
        await UserFuelBracketsService.createOrder(currentUser.id, product.id); // Створюємо замовлення
        alert('Замовлення успішно оформлено!');
        navigate('/basket'); // Переходимо до кошика
      }
    } catch (error) {
      console.error('Помилка замовлення:', error);
    }
  };

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  return (
    <div className="info-product-page">
      <header className="info-product-header">
        <div className="info-product-logo">БІОПЕЛ</div>
        <div className="info-product-nav">
          <button onClick={handleBack} className="info-product-back-button">Назад</button>
        </div>
      </header>

      <div className="info-product-container">
        <div className="info-product-breadcrumbs">
          <span>Головна</span> / <span>Продукція</span> / <span>{product.fuel_type}</span>
        </div>

        <div className="info-product-title-section">
          <h1>{product.fuel_type} - ID {product.id}</h1>
          <div className="info-product-badge">ТОП Пропозиція</div>
        </div>

        {product.image_url && (
          <div className="info-product-image">
            <img src={product.image_url} alt={product.fuel_type} />
          </div>
        )}

        <div className="info-product-content">
          <div className="info-product-description">
            <p>Постачальник: {product.supplier}</p>
            <p>Ціна: {product.price} грн</p>
            <p>Калорійність: {product.calorific_value}</p>

            <div className="info-product-price-section">
              <h3>Ціна: <span className="price-value">{product.price} грн</span></h3>
            </div>

            <div className="info-product-actions">
              {/* <button className="info-product-button">Розрахунок вартості</button> */}
              <button onClick={handleOrder} className="info-product-button">Замовити зараз</button>
            </div>

            {/* Кнопка редагування для адмінів */}
            {userRole === 'admin' && (
              <button onClick={handleEdit} className="info-product-edit-button">
                Редагувати продукт
              </button>
            )}
          </div>

          <div className="info-product-specs">
            <h2>Характеристики</h2>
            <table className="specs-table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td>Тип палива</td>
                  <td>{product.fuel_type}</td>
                </tr>
                <tr>
                  <td>Калорійність</td>
                  <td>{product.calorific_value}</td>
                </tr>
                <tr>
                  <td>Ціна</td>
                  <td>{product.price} грн</td>
                </tr>
                <tr>
                  <td>Постачальник</td>
                  <td>{product.supplier}</td>
                </tr>
                <tr>
                  <td>Наявність</td>
                  <td>{product.availability ? 'Так' : 'Ні'}</td>
                </tr>
                <tr>
                  <td>Дата створення</td>
                  <td>{new Date(product.created_at).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="info-product-footer">
        <p>© {new Date().getFullYear()} БІОПЕЛ. Всі права захищені.</p>
      </footer>
    </div>
  );
};

export default InfoProduct;
