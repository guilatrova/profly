import {gql} from '@apollo/client';

const chartStocksValues = gql`
  query chartStocksValues {
    stocks: stocksUnitsCurrentValue {
      name: ticker
      value: totalValue
    }
  }
`

export default {
  chartStocksValues
}
