import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ValueSpreadPieChart from '../components/ValueSpreadPieChart';
import Skeleton from '@material-ui/lab/Skeleton';
import ErrorHandler from '../../core/components/ApolloErrorHandler';


const ValueSpreadPieChartContainer = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues);
  const chartData = data?.stocks || [];

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  if (loading) {
    return <Skeleton variant="circle" width={250} height={250}/>;
  }

  return <ValueSpreadPieChart chartData={chartData} />;
};

export default ValueSpreadPieChartContainer;
