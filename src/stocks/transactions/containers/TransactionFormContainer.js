import React from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'
import globalStockQueries from 'stocks/queries'

import TransactionForm from '../components/TransactionForm'
import transactionQueries from '../queries'

const Container = ({ onPostSubmit }) => {
  const [addTransaction] = useMutation(transactionQueries.addTransaction)

  const onSubmit = (entity) => {
    addTransaction({
      refetchQueries: [
        {
          query: globalStockQueries.chartStocksValues,
        },
        {
          query: transactionQueries.listTransactions,
        },
      ],
      variables: { entity },
    })
    if (onPostSubmit) {
      onPostSubmit()
    }
  }

  return <TransactionForm onSubmit={onSubmit} />
}

Container.propTypes = {
  onPostSubmit: PropTypes.func,
}

export default Container
