import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="0" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default Chart;