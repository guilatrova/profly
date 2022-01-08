import React from 'react'

import { useQuery } from '@apollo/client'
import ValueHeader from 'common/components/ValueHeader'
import queries from 'stocks/queries'
import { formatCurrency } from 'utils/money'

const PortfolioSummary = () => {
  const { data, error, loading } = useQuery(queries.chartStocksValues)
  const chartData = data?.stocks || []
  // TODO: Consider different currencies
  const total = chartData.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <ValueHeader
      data={formatCurrency(total)}
      error={error}
      loading={loading}
      operationName="portfolio summary"
      title="Portfolio"
    />
  )
}

export default PortfolioSummary
