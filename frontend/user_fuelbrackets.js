import { supabase } from './supabaseClient'; // Імпортуємо конфігурацію для підключення до Supabase

export const UserFuelBracketsService = {
  // Додати новий запис замовлення
  createOrder: async (userId, productId) => {
    try {
      const { data, error } = await supabase
        .from('user_fuelbrackets') // Тут використовуємо правильну назву таблиці
        .insert([{ user_id: userId, fuel_id: productId }]) // Тут використовуємо правильні назви колонок
        .select();

      if (error) {
        console.error('Помилка при додаванні замовлення:', error);
        throw new Error(`Error: ${error.message}`);
      }
      return data[0];
    } catch (error) {
      console.error('Помилка додавання замовлення:', error);
      throw error;
    }
  },

  // Отримати всі замовлення користувача
  getUserOrders: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_fuelbrackets')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Помилка отримання замовлень користувача:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Помилка отримання замовлень користувача:', error);
      throw error;
    }
  },

  // Видалити замовлення
  deleteOrder: async (orderId) => {
    try {
      const { error } = await supabase
        .from('user_fuelbrackets')
        .delete()
        .eq('id', orderId);

      if (error) {
        console.error('Помилка видалення замовлення:', error);
        throw error;
      }
      return true;
    } catch (error) {
      console.error('Помилка видалення замовлення:', error);
      throw error;
    }
  },
};
