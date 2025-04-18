import React, { useEffect, useState } from 'react';
import { UserService } from './userService';
import './src/profilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({ username: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Отримуємо збережені локальні дані користувача
        const localUser = JSON.parse(localStorage.getItem("currentUser"));
  
        if (!localUser || !localUser.id) {
          throw new Error('Користувач не знайдений.');
        }
  
        // Запитуємо актуальні дані з бази по ID
        const freshUserData = await UserService.getUserById(localUser.id);
        if (!freshUserData) {
          throw new Error('Користувач не знайдений у базі даних.');
        }
  
        setUserData(freshUserData);
        setEditData({
          username: freshUserData.username,
          email: freshUserData.email,
          password: freshUserData.password
        });
  
        if (freshUserData.role === 'admin') {
          const allUsers = await UserService.getAllUsers();
          const sortedUsers = allUsers.sort((a, b) => a.id - b.id);
          setUsersList(sortedUsers);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await UserService.updateUser(userData.id, editData);
      setUserData(updated);
      setIsEditing(false);
    } catch (err) {
      setError(`Помилка збереження: ${err.message}`);
    }
  };

  const handleDeleteUser = async (userId) => {
    const userToDelete = usersList.find(user => user.id === userId);
  
    if (userToDelete && userToDelete.role === 'admin') {
      alert('Ви не можете видалити іншого адміністратора.');
      return;
    }
  
    const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цього користувача?');
    if (!confirmDelete) return;
  
    try {
      await UserService.deleteUser(userId);
      setUsersList(usersList.filter(user => user.id !== userId));
  
      // Очистити локальне сховище після видалення користувача
      if (userId === userData.id) { // Якщо видаляється поточний авторизований користувач
        localStorage.removeItem("currentUser"); // Очищає все локальне сховище
        setUserData(null); // Очищаємо стан користувача
        window.location.href = "/login"; // Направити на сторінку входу або іншу відповідну сторінку
      }
    } catch (error) {
      setError(`Помилка видалення: ${error.message}`);
    }
  };
  


  const handleRoleChange = async (userId, newRole) => {
    try {
      // Оновлення ролі користувача
      await UserService.updateUser(userId, { role: newRole });

      // Оновлення списку користувачів
      const updatedUsers = usersList.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      );
      setUsersList(updatedUsers);

      // Оновлення даних поточного користувача, якщо це поточний користувач
      if (userData.id === userId) {
        setUserData(prevData => ({ ...prevData, role: newRole }));
      }

      // Можна додатково викликати fetchUserData(), якщо потрібно перезавантажити дані користувача
       const currentUser = await UserService.getCurrentUser();
       setUserData(currentUser);

    } catch (err) {
      setError(`Помилка оновлення ролі: ${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/infoPage"; // або '/' якщо в тебе немає сторінки входу
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev); // Toggle password visibility
  };

  const goBack = () => {
    window.history.back(); // Go back to the previous page
  };

  if (loading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return <div className="error-message">Користувач не знайдений або не авторизований.</div>;

  return (
    <div className="profile-page-container">
      <h2>Профіль користувача</h2>

      <button className="button button-primary button-back" onClick={goBack}>Назад</button>

      <div className="profile-section">
        {isEditing ? (
          <div className="edit-form">
            <input 
              name="username" 
              value={editData.username} 
              onChange={handleEditChange} 
              placeholder="Ім'я користувача"
            />
            <input 
              name="email" 
              value={editData.email} 
              disabled  // Disable the email field
              placeholder="Email"
              type="email"
            />
            <div className="password-container">
              <input 
                name="password" 
                value={editData.password} 
                onChange={handleEditChange} 
                placeholder="Пароль"
                type={showPassword ? "text" : "password"} // Toggle password visibility
              />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password-btn">
                {showPassword ? "Сховати" : "Показати"}
              </button>
            </div>
            <div className="action-buttons">
              <button className="button button-primary" onClick={handleSave}>Зберегти</button>
              <button className="button button-secondary" onClick={() => setIsEditing(false)}>Скасувати</button>
            </div>
          </div>
        ) : (
          <div>
            <table className="profile-info-table">
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
                  <td>••••••••</td>
                </tr>
              </tbody>
            </table>
            
            <button className="button button-primary" onClick={() => setIsEditing(true)}>Редагувати</button>
            <button className="button button-secondary" onClick={handleLogout}>Вийти</button>
          </div>
        )}
      </div>

      {userData.role === 'admin' && (
        <div className="profile-section">
          <h3>Список усіх користувачів</h3>
          <table className="users-table">
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
                  <td>
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="button button-danger" 
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={user.role === 'admin'}
                    >
                      Видалити
                    </button>
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
