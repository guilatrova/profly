import React from 'react';
import Grid from '@material-ui/core/Grid';
import ValueSpreadPieChart from '../../charts/containers/ValueSpreadPieChart';
import { useQuery } from '@apollo/client';
import Skeleton from '@material-ui/lab/Skeleton';
import queries from '../../charts/queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import StocksTable from '../../stocks/components/StocksTable';


const StocksSummary = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues);
  const chartData = data?.stocks || [];

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
        <StocksTable data={data?.stocks} loading={loading} />
      </Grid>

      <Grid item xs={12} md={6}>
        {loading ? <Skeleton variant="circle" width={250} height={250}/> : <ValueSpreadPieChart chartData={chartData} />}
      </Grid>

    </Grid>
  );
};

export default StocksSummary;
