import {gql} from '@apollo/client';

const listStocks = gql`
  query listStocks {
    stocks {
      id
      name
      ticker
    }
  }
`

const listTransactions = gql`
  query listTransactions {
    transactions {
      id
      stock {
        id
        name
      }
      strikePrice
      units
      value
      performedAt
    }
  }
`

export default {
  listStocks,
  listTransactions
}
