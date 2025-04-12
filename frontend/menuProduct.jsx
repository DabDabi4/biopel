import React from 'react';
import useMenuProduct from './useMenuProduct';
import './src/menuProduct.css';

const MenuProduct = () => {
  const {
    product,
    handleImageChange,
    handleInputChange,
    handleSave,
    handleDelete,
    getImageUrl,
    imageFile
  } = useMenuProduct();

  const handleNumericInputChange = (event, field) => {
    const value = event.target.value;
    // Дозволити тільки цифри і максимальна кількість символів 8
    if (/^\d{0,8}$/.test(value)) {
      handleInputChange(event, field);
    }
  };

  return (
    <div className="product-editor">
      <div className="editor-header">
        <h1 className="editor-title">Редагування продукту</h1>
        <div className="editor-actions">
          {product.id && (
            <button className="btn btn-danger" onClick={handleDelete}>
              <i className="icon-delete"></i> Видалити
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave}>
            <i className="icon-save"></i> Зберегти
          </button>
        </div>
      </div>

      <div className="editor-content">
        <div className="image-section">
          <div className="image-container">
            <img 
              src={getImageUrl()} 
              alt="Зображення товару" 
              className="product-image" 
            />
            <div className="image-overlay">
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => document.getElementById('image-upload').click()}
              >
                <i className="icon-upload"></i> Змінити фото
              </button>
              <input 
                id="image-upload" 
                type="file" 
                style={{ display: 'none' }} 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="product-id">ID продукту</label>
              <input 
                id="product-id" 
                type="text" 
                value={product.id || ''} // Якщо product.id undefined, встановлюємо порожній рядок
                disabled 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-fuel_type">Тип палива</label>
              <input 
                id="product-fuel_type" 
                type="text" 
                value={product.fuel_type || ''} // Якщо product.fuel_type undefined, встановлюємо порожній рядок
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-calorific_value">Калорійність (ккал)</label>
              <input 
                id="product-calorific_value" 
                type="text" 
                value={product.calorific_value || ''} // Якщо product.calorific_value undefined, встановлюємо порожній рядок
                onChange={(e) => handleNumericInputChange(e, 'calorific_value')} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-price">Ціна (грн)</label>
              <input 
                id="product-price" 
                type="text" 
                value={product.price || ''} // Якщо product.price undefined, встановлюємо порожній рядок
                onChange={(e) => handleNumericInputChange(e, 'price')} 
                className="form-control"
                maxLength={8} // Обмеження на 8 символів
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-supplier">Постачальник</label>
              <input 
                id="product-supplier" 
                type="text" 
                value={product.supplier || ''} // Якщо product.supplier undefined, встановлюємо порожній рядок
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-availability">Наявність</label>
              <select
                id="product-availability"
                value={product.availability || 'false'} // Якщо product.availability undefined, встановлюємо "false"
                onChange={(e) => handleInputChange(e)} 
                className="form-control"
              >
                <option value="true">В наявності</option>
                <option value="false">Немає в наявності</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="product-date">Дата створення</label>
              <input 
                id="product-date" 
                type="text" 
                value={product.created_at || ''} // Якщо product.created_at undefined, встановлюємо порожній рядок
                disabled 
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuProduct;
