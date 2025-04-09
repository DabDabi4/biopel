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
                value={product.id} 
                disabled 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-fuel_type">Тип палива</label>
              <input 
                id="product-fuel_type" 
                type="text" 
                value={product.fuel_type} 
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-calorific_value">Калорійність (ккал)</label>
              <input 
                id="product-calorific_value" 
                type="text" 
                value={product.calorific_value} 
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-price">Ціна (грн)</label>
              <input 
                id="product-price" 
                type="text" 
                value={product.price} 
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-supplier">Постачальник</label>
              <input 
                id="product-supplier" 
                type="text" 
                value={product.supplier} 
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-availability">Наявність</label>
              <input 
                id="product-availability" 
                type="text" 
                value={product.availability} 
                onChange={handleInputChange} 
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-date">Дата створення</label>
              <input 
                id="product-date" 
                type="text" 
                value={product.created_at} 
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