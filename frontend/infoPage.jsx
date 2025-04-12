import React from 'react';
import { useNavigate } from 'react-router-dom';
import './src/InfoPage.css';

const InfoPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/registrationPage');
  };

  const handleLogin = () => {
    navigate('/loginPage');
  };

  const handleShop = () => {
    navigate('/store'); // Adjust the path as needed
  };

  return (
    <div className="info-page">
      {/* Header with logo and auth buttons */}
      <header className="header">
        <div className="logo">БІОПЕЛ</div>
        <div className="auth-buttons">
          <button onClick={handleRegister} className="auth-button">Реєстрація</button>
          <button onClick={handleLogin} className="auth-button">Авторизація</button>
          <button onClick={handleShop} className="auth-button">Магазин</button> {/* Shop Button */}
        </div>
      </header>

      {/* Hero section */}
      <section className="hero">
        <h1>Екопаливо від виробника</h1>
        <p>Оптова торгівля в Україні та країнах ЄС</p>
        <p>Завжди в наявності на складі</p>
      </section>

      {/* About section */}
      <section className="section about-section">
  <h2>Про Нас</h2>
  <p>
    ТОВ "БІОПЕЛ" було засновано у 2013 році - лідер у виробництві високоякісних паливних брикетів. 
    Ми спеціалізуємося на створенні екологічно чистого біопалива, використовуючи тільки найкращі природні ресурси. 
    Наші брикети відрізняються стабільною якістю, ефективністю та дбайливим ставленням до навколишнього середовища. 
    Обирайте наш продукт для ефективного опалення та підтримки екологічних стандартів.
  </p>
</section>


      {/* Products section */}
      <section className="section">
        <h2>Брикети RUF</h2>
        <p>
          Паливні брикети RUF є ефективним та екологічно чистим джерелом тепла, яке виробляє наша компанія. 
          Виготовлені з високоякісних подрібнених кускових відходів без додавання хімічних речовин, 
          ці брикети забезпечують ефективне опалення та низькі рівні викидів. 
          Їхнім головним перевагам є стабільні розміри та форма, що дозволяє легко завантажувати їх у опалювачі.
        </p>

        <div className="ruf-images">
    <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/12-1743935953734.png" alt="Брикети RUF 1" className="ruf-image" />
    <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/14-1743936027542.jpg" alt="Брикети RUF 2" className="ruf-image" />
    <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/15-1743936315916.jpg" alt="Брикети RUF 3" className="ruf-image" />
    <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/19-1743936392330.png" alt="Брикети RUF 4" className="ruf-image" />
  </div>
       
        <h3>Подрібнені кускові відходи</h3>
        
        <p>
          Подрібнені кускові відходи – це деревні кускові залишки встановлених або довільних розмірів, 
          що отримується в результаті подрібнення деревної сировини.
        </p>
        <p>
          Наша компанія займається виробництвом та торгівлею технологічної, в тому числі целюлозних 
          та паливних подрібнених кускових відходів по Україні та країнам ЄС. Також ми є виробниками Біомаси.
        </p>
        <div className="ruf-images">
  <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/31-1743936645340.jpg" alt="Кускові відходи 1" className="ruf-image" />
  <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/1-1743936714997.jpg" alt="Кускові відходи 2" className="ruf-image" />
  <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/1743936790483-1743936790483.jpg" alt="Кускові відходи 2" className="ruf-image" />
  <img src="https://ftnwptykhrgxzkmtbgld.supabase.co/storage/v1/object/public/product-images/product-images/1743936878524-1743936878524.jpg" alt="Кускові відходи 2" className="ruf-image" />
</div>

       
      </section>

      {/* Expedition section */}


      {/* Contacts section with your Google Maps iframe */}
      <section className="section contacts-section">
        <h2>Контакти</h2>
        
        {/* Your Google Maps iframe */}
        <div className="contact-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3157.7275592263404!2d22.2951005!3d48.5929122!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473919a5dca66eab%3A0x986a0bc778ee1e06!2zQmlvcGVsIFRPViDQn9C10LvQtdGC0Ys!5e1!3m2!1sru!2sua!4v1743854153315!5m2!1sru!2sua" 
            width="100%" 
            height="450" 
            style={{border:0}}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="БІОПЕЛ на карті"
          ></iframe>
        </div>
        
        <div className="contact-info">
          <div className="contact-block">
            <h3>Адреса</h3>
            <p>88000 Ужгород, вул. Болгарська 5</p>
            <p>Пн-Пт 9:00 - 17:00</p>
          </div>
          
          <div className="contact-block">
            <h3>Телефон</h3>
            <p>+38 (066) 204 01 47</p>
          </div>
          
          <div className="contact-block">
            <h3>E-mail</h3>
            <p>pavlo.popovych@biopel.org</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} БІОПЕЛ. Всі права захищені.</p>
      </footer>
    </div>
  );
};

export default InfoPage;