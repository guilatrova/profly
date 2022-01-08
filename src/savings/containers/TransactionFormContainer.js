import React from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'
import TransactionForm from 'savings/components/TransactionForm'
import queries from 'savings/queries'

const Container = ({ onPostSubmit }) => {
  const [addTransaction] = useMutation(queries.addTransaction, {
    refetchQueries: queries.REFETCH_WHEN_CHANGE,
  })

  const onSubmit = (entity) => {
    addTransaction({ variables: { entity } })
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
