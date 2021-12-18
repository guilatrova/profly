import React from 'react'

import { useQuery } from '@apollo/client'
import ValueHeader from 'common/components/ValueHeader'
import queries from 'savings/queries'
import { formatCurrency } from 'utils/money'

const WalletsSummary = () => {
  const { data, error, loading } = useQuery(queries.defaultWallet)

  return (
    <ValueHeader
      data={formatCurrency(data?.wallet?.value, data?.wallet?.currency)}
      error={error}
      loading={loading}
      operationName="wallet summary"
      title="wallet"
    />
  )
}

export default WalletsSummary
