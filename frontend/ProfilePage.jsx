import React, { useEffect, useState } from 'react';
import { UserService } from './userService';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [usersList, setUsersList] = useState([]); // Стан для збереження списку всіх користувачів
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Завантаження даних поточного користувача та всіх користувачів, якщо роль admin
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await UserService.getCurrentUser(); // Отримуємо дані поточного користувача
        setUserData(currentUser); // Зберігаємо дані користувача в стан

        // Якщо поточний користувач - admin, завантажуємо список усіх користувачів
        if (currentUser.role === 'admin') {
          const allUsers = await UserService.getAllUsers(); // Отримуємо всіх користувачів
          setUsersList(allUsers); // Зберігаємо список користувачів
        }
      } catch (error) {
        setError(error.message); // Виводимо помилку, якщо є
      } finally {
        setLoading(false); // Завершуємо завантаження
      }
    };

    fetchUserData();
  }, []);

  // Функція для видалення користувача
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цього користувача?');
    if (!confirmDelete) return;

    try {
      await UserService.deleteUser(userId); // Викликаємо сервіс для видалення користувача
      setUsersList(usersList.filter(user => user.id !== userId)); // Оновлюємо список після видалення
    } catch (error) {
      setError(`Помилка видалення: ${error.message}`);
    }
  };

  if (loading) return <div>Завантаження...</div>;

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  if (!userData) {
    return <div>Користувач не знайдений або не авторизований.</div>;
  }

  return (
    <div className="profile-page-container">
      <h2>Профіль користувача</h2>

      {/* Профіль поточного користувача */}
      <table border="1">
        <thead>
          <tr>
            <th>Інформація</th>
            <th>Дані</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Ім'я:</strong></td>
            <td>{userData.username}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <td><strong>Роль:</strong></td>
            <td>{userData.role}</td>
          </tr>
          <tr>
            <td><strong>Пароль:</strong></td>
            <td>{userData.password}</td>
          </tr>
        </tbody>
      </table>

      {/* Якщо роль користувача admin, показуємо список усіх користувачів */}
      {userData.role === 'admin' && (
        <div>
          <h3>Список усіх користувачів:</h3>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>Видалити</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
