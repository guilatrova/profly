import { gql } from '@apollo/client';

const stockSummary = gql`
  query stockSummary($ticker: String!) {
    summary: ownedStockSummary(ticker: $ticker) {
      ticker
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
        }
      }
    }
  }
`

export default {
  stockSummary,
  transactionsFromStock
};
