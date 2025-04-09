// supabaseService.js
import { supabase } from './supabaseClient';  // Імпортуємо вже ініціалізований екземпляр

// Функція для завантаження зображень в Supabase Storage
export const uploadImage = async (file, imageName) => {
  const fileExt = file.name.split('.').pop();
  const uniqueFileName = `${imageName}-${Date.now()}.${fileExt}`;
  const filePath = `product-images/${uniqueFileName}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (error) {
      throw new Error('Помилка завантаження зображення: ' + error.message);
  }

  // Отримуємо публічний URL
  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

  
