import React from 'react'

import Skeleton from '@material-ui/lab/Skeleton'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'

import ValueSpreadPieChart from '../components/ValueSpreadPieChart'
import queries from '../queries'

const unifyCurrency = (data, rate) => {
  return data.reduce((acc, cur) => {
    let addval = cur
    if (cur.currency == 'USD') {
      addval = { ...cur, value: cur.value * rate }
    }

    acc.push(addval)
    return acc
  }, [])
}

const ValueSpreadPieChartContainer = () => {
  const {
    loading,
    error: errorStocks,
    data = [],
  } = useQuery(queries.chartStocksValues)
  const variables = { from: 'USD', to: 'BRL' }
  const {
    loading: loadingRate,
    error: errorRate,
    data: dataRate = {},
  } = useQuery(queries.currencyRate, { variables })
  const chartData = data?.stocks || []
  const rateValue = dataRate?.currencyRate?.rate || 1
  const error = errorStocks ? errorStocks : errorRate

  if (error)
    return <ErrorHandler operation="pie chart data">{error}</ErrorHandler>

  if (loading || loadingRate) {
    return <Skeleton height={250} variant="circle" width={250} />
  }

  const finalChartData = unifyCurrency(chartData, rateValue)

  return <ValueSpreadPieChart chartData={finalChartData} />
}

export default ValueSpreadPieChartContainer
