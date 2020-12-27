import {gql} from '@apollo/client';

const addTransaction = gql`
  mutation addTransaction($entity: TransactionMutationInput!) {
    transactions(input: $entity) {
      id
    }
  }
`

export default {
  addTransaction
}
