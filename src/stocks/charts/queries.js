import { gql } from '@apollo/client'

const stockLineChart = gql`
  query stockLineChart($ticker: String!, $period: String!, $interval: String!) {
    stockHistory: stockTransactionsValueHistory(
      ticker: $ticker
      period: $period
      interval: $interval
    ) {
      currency
      history {
        date
        open
        close
        high
      }
      transactions {
        id
        performedAt
        units
        value
      }
    }
  }
`

const currencyRate = gql`
  query ($from: String!, $to: String!) {
    currencyRate(fromCurrency: $from, toCurrency: $to) {
      fromCurrency
      toCurrency
      rate
    }
  }
`

export default {
  currencyRate,
  stockLineChart,
}
