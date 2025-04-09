import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/infoPage"); // Тепер перехід на /info
  };

  return (
    <div>
      <h1 onClick={handleClick}>Натисніть, щоб перейти на InfoPage</h1>
    </div>
  );
};

export default HomePage;