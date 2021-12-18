import React from 'react'

import Grid from '@material-ui/core/Grid'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import BuyIcon from 'core/components/BuyIcon'
import SellIcon from 'core/components/SellIcon'
import { tickerType } from 'core/types'

import ValueCard from '../components/ValueCard'
import queries from '../queries'

const StockStatusSummary = ({ ticker }) => {
  const { data, error, loading } = useQuery(queries.stockSummary, {
    variables: { ticker },
  })

  if (error)
    return <ErrorHandler operation="stock status summary">{error}</ErrorHandler>

  const summary = data?.summary

  return (
    <Grid container spacing={3}>
      <Grid item md={3} xs={4}>
        <ValueCard
          icon={
            <ShoppingBasketIcon fontSize="large" style={{ color: '#4988e9' }} />
          }
          loading={loading}
          title="Units"
        >
          {summary?.units}
        </ValueCard>
      </Grid>

      <Grid item md={3} xs={4}>
        <ValueCard
          isMoney
          currency={summary?.currency}
          icon={<BuyIcon />}
          loading={loading}
          title="Avg Buy"
        >
          {summary?.averageBuyPrice}
        </ValueCard>
      </Grid>

      <Grid item md={3} xs={4}>
        <ValueCard
          isMoney
          currency={summary?.currency}
          icon={<SellIcon />}
          loading={loading}
          title="Avg Sell"
        >
          {summary?.averageSellPrice}
        </ValueCard>
      </Grid>
    </Grid>
  )
}

StockStatusSummary.propTypes = {
  ticker: tickerType.isRequired,
}

export default StockStatusSummary
