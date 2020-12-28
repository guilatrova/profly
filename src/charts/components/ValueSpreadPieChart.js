import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';
import { useQuery } from '@apollo/client';
import queries from '../queries';

const ValueSpreadPieChart = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const chartData = data?.stocks || [];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={chartData}
        cx={120}
        cy={120}
        innerRadius={40}
        outerRadius={80}
        // fill="#82ca9d"
        label
      />

      <Tooltip />
    </PieChart>
  );
};

export default ValueSpreadPieChart;
