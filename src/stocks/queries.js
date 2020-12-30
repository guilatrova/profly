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

export default {
  stockSummary
};
