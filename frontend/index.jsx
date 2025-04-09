import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import InfoPage from "./infoPage";
import StorePage from "./store"; // Імпортуємо нову сторінку
import MenuProduct from "./menuProduct"; // Імпортуємо нову сторінку
import RegistrationPage from "./registrationPage"; // Імпортуємо сторінку реєстрації
import LoginPage from "./loginPage"; // Імпортуємо сторінку авторизації
import ProfilePage from './ProfilePage';  // Імпортуємо нову сторінку
import InfoProduct from './infoProduct';
import Basket from './Basket';

import "./src/index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<InfoPage />} />

        <Route path="/infoPage" element={<InfoPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/menuProduct" element={<MenuProduct />} />
        <Route path="/registrationPage" element={<RegistrationPage />} /> {/* Маршрут для реєстрації */}
        <Route path="/loginPage" element={<LoginPage />} /> {/* Маршрут для авторизації */}
        <Route path="/profilePage" element={<ProfilePage />} /> {/* Новий маршрут */}
        <Route path="/infoProduct" element={<InfoProduct />} /> {/* Новий маршрут */}
        <Route path="/basket" element={<Basket />} />
  
      </Routes>
    </Router>
  </React.StrictMode>
);
