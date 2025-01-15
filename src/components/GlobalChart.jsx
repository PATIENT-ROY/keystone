import React, { useEffect, useState } from 'react';
import { Tooltip, Treemap } from 'recharts';
import Colors from '../styles/_settings.scss';

const GlobalChart = ({ coinsData }) => {
  const [dataArray, setDataArray] = useState([]);

  const colorPicker = (number) => {
    if (number >= 20) {
      return Colors.color1;
    } else if (number >= 5) {
      return Colors.green2;  
    } else if (number >= 0) {
      return Colors.green1;
    } else if (number >= -5) {
      return Colors.red1;
    } else if (number >= -20) {
      return Colors.red2;
    } else {
      return Colors.black2;
    }
  };

  const excludeCoin = (coin) => {
    return !(
      coin === "usdt" ||
      coin === "usds" ||
      coin === "busd" ||  // Исправлено с "bust" на "busd"
      coin === "dai" ||
      coin === "ust" ||
      coin === "min"
    );
  };

  useEffect(() => {
    let chartData = [];

    if (coinsData.length > 0) {
      for (let i = 0; i < Math.min(45, coinsData.length); i++) {
        if (excludeCoin(coinsData[i].symbol)) {
          const percentageChange = coinsData[i].market_cap_change_percentage_24h;
          chartData.push({
            name: `${coinsData[i].symbol.toUpperCase()} ${percentageChange.toFixed(1)}%`,
            size: coinsData[i].market_cap,
            fill: colorPicker(coinsData[i].market_cap_change_percentage_24h),
          });
        }
      }
    }
    setDataArray(chartData);
  }, [coinsData]);

  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Treemap
        width={730}
        height={181}
        data={dataArray}
        dataKey="size"
        stroke="rgb(51,51,51)"
        fill="black"
        aspectRatio="1"
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;
