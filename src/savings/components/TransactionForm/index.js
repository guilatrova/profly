import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TransactionBody from './TransactionBody'
import { isSubmitEnabled, prepareEntity } from './utils'

const emptyEntity = {
  notes: '',
  performedAt: new Date(),
  value: '',
}

const TransactionForm = ({ onSubmit }) => {
  const [entity, setEntity] = useState({ ...emptyEntity })
  const isEntityValid = isSubmitEnabled(entity)

  const handlePropChange = (modified) => setEntity({ ...entity, ...modified })
  const handleSubmit = () => {
    if (isEntityValid) {
      onSubmit(prepareEntity(entity))
      setEntity({ ...emptyEntity })
    }
  }
  const preventFormSubmit = (e) => e.preventDefault()

  return (
    <form noValidate autoComplete="off" onSubmit={preventFormSubmit}>
      <TransactionBody
        enableSubmit={isEntityValid}
        entity={entity}
        onPropChange={handlePropChange}
        onSubmit={handleSubmit}
      />
    </form>
  )
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default TransactionForm
