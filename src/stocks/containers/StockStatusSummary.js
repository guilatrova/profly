import React from 'react';
import { useQuery } from '@apollo/client';
import queries from '../queries';
import Grid from '@material-ui/core/Grid';
import ValueCard from '../components/ValueCard';
import { tickerType } from '../../core/types';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BuyIcon from '../../core/components/BuyIcon';
import SellIcon from '../../core/components/SellIcon';


const StockStatusSummary = ({ ticker }) => {
  const { loading, error, data } = useQuery(queries.stockSummary, { variables: { ticker }});

  if (error) return <ErrorHandler operation="stock status summary">{error}</ErrorHandler>;

  const summary = data?.summary;

  return (
      <Grid container spacing={3}>
        <Grid item xs={4} md={3}>
          <ValueCard
            title="Units"
            loading={loading}
            icon={<ShoppingBasketIcon style={{color: '#4988e9'}} fontSize="large" />}
          >
            {summary?.units}
          </ValueCard>
        </Grid>

        <Grid item xs={4} md={3}>
          <ValueCard
            title="Avg Buy"
            loading={loading}
            currency={summary?.currency}
            icon={<BuyIcon />}
            isMoney
          >
            {summary?.averageBuyPrice}
          </ValueCard>
        </Grid>

        <Grid item xs={4} md={3}>
          <ValueCard
            title="Avg Sell"
            loading={loading}
            currency={summary?.currency}
            icon={<SellIcon />}
            isMoney
          >
            {summary?.averageSellPrice}
          </ValueCard>
        </Grid>
      </Grid>
  );
}

StockStatusSummary.propTypes = {
  ticker: tickerType.isRequired
}

export default StockStatusSummary;
