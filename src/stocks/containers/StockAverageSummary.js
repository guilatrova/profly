import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import Grid from '@material-ui/core/Grid';
import ValueCard from '../components/ValueCard';
import { tickerType } from '../../core/types';
import ErrorHandler from '../../core/components/ApolloErrorHandler';


const StockAverageSummary = ({ ticker }) => {
  const { loading, error, data } = useQuery(queries.stockSummary, { variables: { ticker }});

  if (error) return <ErrorHandler>{error}</ErrorHandler>;

  const summary = data?.summary;

  return (
      <Grid container spacing={3}>
        <Grid item xs={4} md={3}>
          <ValueCard title="Units" loading={loading}>
            {summary?.units}
          </ValueCard>
        </Grid>

        <Grid item xs={4} md={3}>
          <ValueCard title="Avg Buy" loading={loading} isMoney>
            {summary?.averageBuyPrice}
          </ValueCard>
        </Grid>

        <Grid item xs={4} md={3}>
          <ValueCard title="Avg Sell" loading={loading} isMoney>
            {summary?.averageSellPrice}
          </ValueCard>
        </Grid>
      </Grid>
  );
}

StockAverageSummary.propTypes = {
  ticker: tickerType.isRequired
}

export default StockAverageSummary;
