import React, { useEffect, useState } from 'react';

function StarIcon({ coinId }) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (window.localStorage.coinList) {
      const favList = window.localStorage.coinList.split(",");
      if (favList.includes(coinId)) {
        setLike(true);
      } else {
        setLike(false); // Убедитесь, что обработали случай, когда coinId нет в списке
      }
    }
  }, [coinId]); // Массив зависимостей

  const IdChecker = (Id) => {
    let favList = null;

    if (window.localStorage.coinList) {
        favList = window.localStorage.coinList.split(",");
    }
    if (favList) {
        if (favList.includes(coinId)) {
            window.localStorage.coinList = favList.filter((coin) => coin !== coinId).join(",");
            setLike(false);
        } else {
            window.localStorage.coinList = [...favList, coinId].join(",");
            setLike(true);
        }
    } else {
        window.localStorage.coinList = coinId;
        setLike(true);
    }
};


  return (
    <img 
      onClick={() => IdChecker(coinId)}
      src={like ? "./assets/star-full.svg" : "./assets/star-empty.svg"}
      alt="icon-star"
    />
  );
}

export default StarIcon;
