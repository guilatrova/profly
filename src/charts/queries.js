import {gql} from '@apollo/client';

const chartStocksValues = gql`
  query chartStocksValues {
    stocks: stocksUnitsCurrentValue {
      name: ticker
      value: totalValue
    }
  }
`

const stockLineChart = gql`
  query stockLineChart($ticker: String!, $period: String!, $interval: String!) {
    history: stockValueHistory(ticker: $ticker, period: $period, interval: $interval) {
      date
      open
      close
      high
    }
  }
`

export default {
  chartStocksValues,
  stockLineChart
}
