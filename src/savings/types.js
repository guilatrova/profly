import { arrayOf, number, shape, string } from 'prop-types'

export const walletPropType = shape({
  currency: string,
  value: number,
})

export const walletTransactionPropType = shape({
  id: string.isRequired,
  notes: string,
  performedAt: string,
  value: number.isRequired,
  wallet: walletPropType,
})

export const walletTransactionsPropType = arrayOf(walletTransactionPropType)
