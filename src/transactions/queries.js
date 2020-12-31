import {gql} from '@apollo/client';

const listTransactions = gql`
  query transactions {
    transactions {
      id
      stock {
        id
        ticker
        currency
      }
      strikePrice
      units
      value
      performedAt
    }
  }
`

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

const deleteTransaction = gql`
  mutation deleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      ok
    }
  }
`;

export default {
  addTransaction,
  getStockInfo,
  listTransactions,
  deleteTransaction
}
