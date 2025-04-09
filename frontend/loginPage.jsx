import React, { useState } from 'react';
import { UserService } from './userService';
import { useNavigate } from 'react-router-dom';
import './src/loginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await UserService.loginUser(formData);
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/store');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = () => {
    navigate('/registrationPage');
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-logo">БІОПЕЛ</div>
        <div className="login-auth-buttons">
          <button onClick={handleRegister} className="login-auth-button">Реєстрація</button>
        </div>
      </header>

      <div className="login-container">
        <h2 className="login-title">Авторизація</h2>
        
        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="login-input"
          />
          <button type="submit" className="login-submit">Увійти</button>
        </form>
      </div>

      <footer className="login-footer">
        <p>© {new Date().getFullYear()} БІОПЕЛ. Всі права захищені.</p>
      </footer>
    </div>
  );
};

export default LoginPage;