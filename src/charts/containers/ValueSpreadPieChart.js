import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ValueSpreadPieChart from '../components/ValueSpreadPieChart';

const ValueSpreadPieChartContainer = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const chartData = data?.stocks || [];

  return <ValueSpreadPieChart chartData={chartData} />;
};

export default ValueSpreadPieChartContainer;
