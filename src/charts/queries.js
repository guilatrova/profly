import {gql} from '@apollo/client';

const chartStocksValues = gql`
  query chartStocksValues {
    stocks: stocksUnitsCurrentValue {
      name: ticker
      units: totalUnits
      value: totalValue
    }
  }
`

const stockLineChart = gql`
  query stockLineChart($ticker: String!, $period: String!, $interval: String!) {
    stockHistory: stockTransactionsValueHistory(ticker: $ticker, period: $period, interval: $interval) {
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

export default {
  chartStocksValues,
  stockLineChart
}
