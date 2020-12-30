import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import Grid from '@material-ui/core/Grid';
import ValueCard from '../components/ValueCard';
import { tickerType, periodType } from '../../core/types';


const StockAverageSummary = ({ ticker }) => {
  const { loading, error, data } = useQuery(queries.stockSummary, { variables: { ticker }});

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{JSON.stringify(error)}</pre>;

  const summary = data?.summary;

  return (
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <ValueCard title="Units">
            {summary.units}
          </ValueCard>
        </Grid>

        <Grid item xs={4}>
          <ValueCard title="Avg Buy" isMoney>
            {summary.averageBuyPrice}
          </ValueCard>
        </Grid>

        <Grid item xs={4}>
          <ValueCard title="Avg Sell" isMoney>
            {summary.averageSellPrice}
          </ValueCard>
        </Grid>
      </Grid>
  );
}

StockAverageSummary.propTypes = {
  ticker: tickerType.isRequired,
  period: periodType.isRequired
}

export default StockAverageSummary;
