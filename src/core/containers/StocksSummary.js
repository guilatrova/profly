import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/client';
import queries from '../../charts/queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import StocksTable from '../../stocks/components/StocksTable';
import Typography from '@material-ui/core/Typography';


const StocksSummary = () => {
  const { loading, error, data = [] } = useQuery(queries.chartStocksValues);

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
        <Typography component="h2" variant="h6">Stocks</Typography>

        <StocksTable data={data?.stocks} loading={loading} />
      </Grid>

    </Grid>
  );
};

export default StocksSummary;
