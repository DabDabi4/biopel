// src/services/fuelBracketsService.js
import { supabase } from './supabaseClient';

export const FuelBracketsService = {
  // Отримати всі записи
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('fuel_brackets')
        .select('*');
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Помилка отримання даних:', error);
      throw error;
    }
  },

  // Оновити запис
  update: async (id, updatedData) => {
    try {
      // Перетворюємо назви полів до правильного формату
      const dataToUpdate = {
        fuel_type: updatedData.fuel_type || updatedData.type,
        calorific_value: updatedData.calorific_value || updatedData.calorific,
        price: updatedData.price,
        supplier: updatedData.supplier,
        availability: updatedData.availability,
        image_url: updatedData.image_url
      };
      
      const { data, error } = await supabase
        .from('fuel_brackets')
        .update(dataToUpdate)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Помилка оновлення:', error);
      throw error;
    }
  },

  // Видалити запис
  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('fuel_brackets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Помилка видалення:', error);
      throw error;
    }
  },

  // Додати новий запис
  create: async (newProduct) => {
    try {
      // Перетворюємо назви полів до правильного формату
      const productToCreate = {
        fuel_type: newProduct.fuel_type || newProduct.type,
        calorific_value: newProduct.calorific_value || newProduct.calorific,
        price: newProduct.price,
        supplier: newProduct.supplier,
        availability: newProduct.availability,
        image_url: newProduct.image_url,
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('fuel_brackets')
        .insert([productToCreate])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Помилка додавання:', error);
      throw error;
    }
  },

  // Завантажити зображення
  uploadImage: async (file, productId) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}.${fileExt}`;
      
      // Завантажуємо файл
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      // Отримуємо публічний URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Помилка завантаження зображення:', error);
      throw error;
    }
  }
};