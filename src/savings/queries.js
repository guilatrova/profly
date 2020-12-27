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

export default {
  listStocks
}
