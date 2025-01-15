
import React, { useState, useEffect } from 'react';

const Speaker = () => {
  // Состояние для обработки клика
  const [handleClick, setHandleClick] = useState(() => () => {});

  // Функция для обработки клика
  const speak = () => {
    alert('Speak button clicked!');
  };

  useEffect(() => {
    setHandleClick(() => speak);
  }, []);

  return (
    <div>
      <input id="input" />
      <button onClick={handleClick}>Speak</button>
    </div>
  );
};

export default Speaker;
