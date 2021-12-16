import {gql} from '@apollo/client';

const defaultWallet = gql`
  query defaultWallet {
    wallet {
      value,
      currency
    }
  }
`

export default {
  defaultWallet
}
