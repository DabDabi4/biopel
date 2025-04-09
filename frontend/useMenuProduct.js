import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FuelBracketsService } from './fuelBracketsService';
import { uploadImage } from './supabaseService';
import { UserService } from './userService';

const useMenuProduct = () => {
  const [product, setProduct] = useState({
    id: '',
    fuel_type: '',
    calorific_value: '',
    price: '',
    supplier: '',
    availability: '',
    created_at: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
      if (savedProduct) {
        setProduct({
          ...savedProduct,
          price: savedProduct.price ? savedProduct.price.toString().replace(' грн', '') : ''
        });
      }
      try {
        const currentUser = await UserService.getCurrentUser();
        setUserRole(currentUser.role); // Зберігаємо роль користувача
      } catch (error) {
        console.error('Помилка отримання користувача:', error);
      }
    };

    fetchData();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = ['fuel_type', 'calorific_value', 'price', 'supplier', 'availability'];
    
    requiredFields.forEach(field => {
      if (!product[field]) {
        newErrors[field] = 'Це поле обов\'язкове для заповнення';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProduct(prev => ({ ...prev, image_url: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.replace('product-', '');
    
    setProduct(prev => ({ ...prev, [fieldName]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateFields()) {
      alert('Будь ласка, заповніть всі обов\'язкові поля');
      return;
    }

    try {
      let imageUrl = product.image_url;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, product.id || Date.now().toString());
      }

      const updatedProduct = {
        ...product,
        image_url: imageUrl,
        price: parseFloat(product.price) || 0,
        availability: product.availability === 'true' || product.availability === true
      };

      let result;
      if (product.id) {
        result = await FuelBracketsService.update(product.id, updatedProduct);
        alert('Продукт оновлено успішно!');
      } else {
        updatedProduct.created_at = new Date().toISOString();
        result = await FuelBracketsService.create(updatedProduct);
        alert('Продукт додано успішно!');
      }

      localStorage.setItem('selectedProduct', JSON.stringify(result));
      navigate('/store');
    } catch (error) {
      console.error('Помилка збереження:', error);
      alert('Сталася помилка при збереженні: ' + error.message);
    }
  };

  const handleDelete = async () => {
    if (!product.id) return;

    const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цей продукт?');
    if (!confirmDelete) return;

    try {
      await FuelBracketsService.delete(product.id);
      alert('Продукт видалено успішно!');
      navigate('/store');
    } catch (error) {
      console.error('Помилка видалення:', error);
      alert('Сталася помилка при видаленні: ' + error.message);
    }
  };

  const getImageUrl = () => {
    if (product.image_url) {
      return product.image_url.startsWith('data:image') || product.image_url.startsWith('http') 
        ? product.image_url 
        : `https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/${product.image_url}`;
    }
  };

  return {
    product,
    imageFile,
    errors,
    userRole, // Повертаємо роль користувача
    handleImageChange,
    handleInputChange,
    handleSave,
    handleDelete,
    getImageUrl
  };
};

export default useMenuProduct;
