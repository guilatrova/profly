import {gql} from '@apollo/client';

const addTransaction = gql`
  mutation addTransaction($entity: TransactionMutationInput!) {
    transactions(input: $entity) {
      id
    }
  }
`

const getStockInfo = gql`
  query stockInfo($ticker: String!) {
    stockCurrentInfo(ticker: $ticker) {
      name
      ticker
      currency
      currentPrice
      logoUrl
      timestamp
    }
  }
`;

export default {
  addTransaction,
  getStockInfo
}
