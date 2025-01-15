import React, { useState } from 'react';
import TableLine from './TableLine';
import ToTop from './ToTop';

const Table = ({ coinsData, isLoading }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState('');
  const [orderDirection, setOrderDirection] = useState(1); // 1 for ascending, -1 for descending

  const tableHeaders = [
    'prix',
    'marketCap',
    'volume',
    '1h',
    '1j',
    '1s',
    '1m',
    '6m',
    '1a',
    'ATH',
  ];

  const handleRangeChange = (e) => {
    const value = Math.max(1, Math.min(250, Number(e.target.value)));
    setRangeNumber(value);
  };

  const handleSort = (header) => {
    if (header === orderBy) {
      setOrderDirection(-orderDirection);
    } else {
      setOrderBy(header);
      setOrderDirection(1);
    }
  };

  const sortedCoins = coinsData
    ? [...coinsData].sort((a, b) => {
        const valueA = a[orderBy.toLowerCase()];
        const valueB = b[orderBy.toLowerCase()];
        return orderDirection * (valueA - valueB);
      })
    : [];

  return (
    <div className="table-container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul className="table-header">
            <div className="range-container">
              <span>
                Top{' '}
                <input
                  type="text"
                  value={rangeNumber}
                  onChange={handleRangeChange}
                />
              </span>
              <input
                type="range"
                min="1"
                max="250"
                value={rangeNumber}
                onChange={handleRangeChange}
                style={{ width: '200px' }}
              />
              <ToTop/>
            </div>
            {tableHeaders.map((header) => (
              <li key={header}>
                <input
                  type="radio"
                  name="header-el"
                  id={header}
                  checked={header === orderBy}
                  onChange={() => handleSort(header)}
                />
                <label htmlFor={header}>{header}</label>
              </li>
            ))}
          </ul>
          {sortedCoins
  .slice(0, rangeNumber)
  .sort((a, b) => {
    if (orderBy === "prix") {
      return orderDirection * (b.current_price - a.current_price);
    } else if (orderBy === "volume") {
      return orderDirection * (b.total_volume - a.total_volume);
    } else if (orderBy === "market_cap") {
      return orderDirection * (b.market_cap - a.market_cap);
    } else if (orderBy === "1h") {
      return orderDirection * (b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency);
    } else if (orderBy === "1j") {
      return orderDirection * (b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h);
    } else if (orderBy === "1s") {
      return orderDirection * (b.price_change_percentage_7d - a.price_change_percentage_7d);
    } else if (orderBy === "1m") {
      return orderDirection * (b.price_change_percentage_30d_in_current - a.price_change_percentage_30d_in_current);
    } else if (orderBy === "6m") {
      return orderDirection * (b.price_change_percentage_200d - a.price_change_percentage_200d_in_current);
    } else if (orderBy === "1a") {
      return orderDirection * (b.price_change_percentage_1y_in_currency - a.price_change_percentage_1y_in_currency);
    } else if (orderBy === "ath") {
      return orderDirection * (b.ath_change_percentage - a.ath_change_percentage);
    } else if (orderBy === "reverse") {
      return orderDirection * (a.market_cap - b.market_cap);
    } else if (orderBy === "prixreverse") {
      return orderDirection * (a.current_price - b.current_price);
    } else if (orderBy === "volumereverse") {
      return orderDirection * (a.total_volume - b.total_volume);
    } else if (orderBy === "marketcapreverse") {
      return orderDirection * (a.market_cap - b.market_cap);
    } else if (orderBy === "1hreverse") {
      return orderDirection * (a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency);
    } else if (orderBy === "1jreverse") {
      return orderDirection * (a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
    } else if (orderBy === "1sreverse") {
      return orderDirection * (a.price_change_percentage_7d - b.price_change_percentage_7d);
    } else if (orderBy === "1mreverse") {
      return orderDirection * (a.price_change_percentage_30d_in_current - b.price_change_percentage_30d_in_current);
    } else if (orderBy === "6mreverse") {
      return orderDirection * (a.price_change_percentage_200d - b.price_change_percentage_200d_in_current);
    } else if (orderBy === "1areverse") {
      return orderDirection * (a.price_change_percentage_1y_in_currency - b.price_change_percentage_1y_in_currency);
    } else if (orderBy === "athreverse") {
      return orderDirection * (a.ath_change_percentage - b.ath_change_percentage);
    }

    return 0;
  })
  
          .map((coin, index) => (
            <TableLine coin={coin} index={index} key={coin.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Table;