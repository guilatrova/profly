import {gql} from '@apollo/client';

const listTransactions = gql`
  query transactions {
    transactions {
      id
      stock {
        id
        name
        ticker
        currency
        logoUrl
      }
      emotion
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
      errors {
        field
        messages
      }
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
  deleteTransaction,
  getStockInfo,
  listTransactions
}
