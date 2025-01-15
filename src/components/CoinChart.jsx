import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Chart from './Chart';


const CoinChart = ({ coinId, coinName }) => {
  const [duration, setDuration] = useState(30);
  const [chartData, setChartData] = useState(null);

  const headerData = [
    [1, "1 jour"],
    [3, "3 jours"],
    [7, "7 jours"],
    [30, "1 mois"],
    [91, "3 mois"],
    [181, "6 mois"],
    [365, "1 an"],
    [3000, "Max"],
  ];

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
            duration > 32 ? "&interval=daily" : ""
          }`
        );
        setChartData(response.data.prices);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [coinId, duration]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div className='coin-chart'>
      <p>{coinName}</p>
      <div className='btn-container'>
        {headerData.map(([value, label]) => {
          return (
            <div
              key={value}
              onClick={() => setDuration(value)}
              className={duration === value ? 'active-btn' : ''}
            >
              {label}
            </div>
          );
        })}
      </div>
      {/* Render your chart component with chartData as prop */}
      <Chart data={chartData} />
    </div>
  );
};

export default CoinChart;