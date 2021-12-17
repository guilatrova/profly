import {gql} from '@apollo/client';

const defaultWallet = gql`
  query defaultWallet {
    wallet {
      value,
      currency
    }
  }
`

const listTransactions = gql`
  query listSavingsTransactions {
    savingTransactions {
      id
      value
      performedAt
      notes
      wallet {
        currency
      }
    }
  }
`

const deleteTransaction = gql`
mutation deleteSavingTransaction($id: ID!) {
    deleteSavingTransaction(id: $id) {
      ok
    }
  }
`;

export default {
  defaultWallet,
  listTransactions,
  deleteTransaction
}
