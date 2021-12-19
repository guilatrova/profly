import React from 'react'
import PropTypes from 'prop-types'

import { walletTransactionsPropType } from 'savings/types'

import TransactionCard from './TransactionCard'

// TODO: Use i18n
// TODO: Implement pagination and order by
const TransactionsList = ({ data = [], loading = false }) => {
  return data.map((item) => <TransactionCard key={item.id} item={item} />)
}

TransactionsList.propTypes = {
  data: walletTransactionsPropType,
  loading: PropTypes.bool,
}

export default TransactionsList
