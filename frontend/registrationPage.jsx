import React, { useState } from 'react';
import { UserService } from './userService';
import { useNavigate } from 'react-router-dom';
import './src/registrationPage.css';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await UserService.registerUser(formData);
      navigate('/loginPage');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = () => {
    navigate('/loginPage');
  };

  return (
    <div className="registration-page">
      <header className="registration-header">
        <div className="registration-logo">БІОПЕЛ</div>
        <div className="registration-auth-buttons">
          <button onClick={handleLogin} className="registration-auth-button">Авторизація</button>
        </div>
      </header>

      <div className="registration-container">
        <h2 className="registration-title">Реєстрація</h2>
        
        {error && <div className="registration-error">{error}</div>}

        <form onSubmit={handleRegister} className="registration-form">
          <input
            type="text"
            placeholder="Ім'я користувача"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
            className="registration-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="registration-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="registration-input"
          />
          <button type="submit" className="registration-submit">Зареєструвати</button>
        </form>
      </div>

      <footer className="registration-footer">
        <p>© {new Date().getFullYear()} БІОПЕЛ. Всі права захищені.</p>
      </footer>
    </div>
  );
};

export default RegistrationPage;