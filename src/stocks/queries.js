import { gql } from '@apollo/client';

const stockSummary = gql`
  query stockSummary($ticker: String!) {
    summary: ownedStockSummary(ticker: $ticker) {
      ticker
      currency
      units
      averageBuyPrice
      averageSellPrice
    }
  }
`

const transactionsFromStock = gql`
  query transactionsFromStock(
    $ticker: String!
    $start: DateTime,
  ) {
    transactionsFilter(
      stock_Ticker: $ticker
      performedAt_Gte: $start
    ) {
      totalCount
      found: edges {
        node {
          stock {
            id
            ticker
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
  stockSummary,
  transactionsFromStock
};
