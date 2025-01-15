import React, { useState } from 'react';
import PercentChange from './PercentChange';
import StarIcon from './StarIcon';
import CoinChart from './CoinChart';

const TableLine = ({ coin, index }) => {
  const [showChart, setShowChart] = useState (false);
  const formatCoinName = (name) => {
    return name.toUpperCase().replace(/\s+/g, '-');
  };

  const priceFormatter = (num) => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat('us-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(num);
    } else {
      return num;
    }
  };

  const mktCapFormatter = (num) => {
    const newNum = Number(String(num).slice(0, -6));
    return newNum;
  };

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.Id}/>
        <p>{index + 1}</p>
        <div className="img">
          <img src={coin.image} height={20} alt="logo" />
        </div>
        <div className="infos">
          <div className="chart-img" onMouseEnter={() => setShowChart(true)

          } onMouseLeave={() => setShowChart(false)}>
            <img src="./assets/chart-icon.svg" alt="chart-icon" />
            <div>
              {showChart && <CoinChart/>}
            </div>
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.coingecko.com/fr/pi%C3%A8ces/${formatCoinName(coin.name)}`}
          >
            <img src="./assets/info-icon.svg" alt="info-icon" />
          </a>
        </div>
      </div>
      <p>{priceFormatter(coin.current_price)} $</p>
      <p className="mktcap">{mktCapFormatter(coin.market_cap)} M$</p>
      <p className='volume'>{coin.total_volume} $</p>
      <PercentChange percent={coin.price_change_percentage_1h_in_currency}/>
      <PercentChange percent={coin.market_cap_change_percentage_24h}/>
      <PercentChange percent={coin.price_change_percentage_7d_in_currency}/>
      <PercentChange percent={coin.price_change_percentage_30d_in_currency}/>
      <PercentChange percent={coin.price_change_percentage_200d_in_currency}/>
      <PercentChange percent={coin.price_change_percentage_1y_in_currency}/>
      {coin.ath_change_percentage > -3 ?(
        <p>ATH !</p>
      ) : (
        <PercentChange percent={coin.ath_change_percentage}/>
      )}
    </div>
  );
};

export default TableLine;