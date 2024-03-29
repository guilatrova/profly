import { gql } from '@apollo/client'

const defaultWallet = gql`
  query defaultWallet {
    wallet {
      value
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

const addTransaction = gql`
  mutation addTransaction($entity: SavingTransactionMutationInput!) {
    savingTransactions(input: $entity) {
      id
      errors {
        field
        messages
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
`

const REFETCH_WHEN_CHANGE = [
  { query: defaultWallet },
  { query: listTransactions },
]

export default {
  REFETCH_WHEN_CHANGE,
  addTransaction,
  defaultWallet,
  deleteTransaction,
  listTransactions,
}
