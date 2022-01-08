import { gql } from '@apollo/client'

const chartStocksValues = gql`
  query chartStocksValues {
    stocks: stocksUnitsCurrentValue {
      ticker
      name
      currency
      units: totalUnits
      value: totalValue
      logoUrl
    }
  }
`

const stockSummary = gql`
  query stockSummary($ticker: String!) {
    summary: ownedStockSummary(ticker: $ticker) {
      ticker
      currency
      units
      averageBuyPrice
      averageSellPrice
      currentValue
    }
  }
`

const transactionsFromStock = gql`
  query transactionsFromStock($ticker: String!, $start: DateTime) {
    transactionsFilter(stock_Ticker: $ticker, performedAt_Gte: $start) {
      totalCount
      found: edges {
        node {
          stock {
            id
            name
            logoUrl
            ticker
            currency
          }
          id
          units
          value
          strikePrice
          performedAt
          emotion
        }
      }
    }
  }
`

export default {
  chartStocksValues,
  stockSummary,
  transactionsFromStock,
}
