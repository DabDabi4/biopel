import { supabase } from './supabaseClient';

export const UserService = {

  // Оновлення користувача
  updateUser: async (id, updates) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
  
    if (error) throw error;
  
    // Оновлюємо localStorage, якщо це поточний користувач
    const current = JSON.parse(localStorage.getItem('currentUser'));
    if (current && current.id === id) {
      localStorage.setItem('currentUser', JSON.stringify(data));
    }
  
    return data;
  },
  

  // Отримання всіх користувачів
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  // Видалення користувача
  deleteUser: async (id) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Реєстрація нового користувача
  registerUser: async ({ username, email, password }) => {
    // Перевірка на унікальність email
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      throw new Error('Цей email вже зареєстрований');
    }

    // Додавання користувача
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ username, email, password }])
      .select()
      .single();
    
    if (insertError) throw insertError;
    return newUser;
  },

 // Логін користувача
 async loginUser({ email, password }) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !user) {
    throw new Error('Невірний email або пароль');
  }

  // Логіка для збереження даних користувача в сесії
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
},

// Отримання поточного користувача
async getCurrentUser() {
  // Перевіряємо, чи є користувач в localStorage
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    throw new Error('Користувач не авторизований');
  }
  return user;
}

};