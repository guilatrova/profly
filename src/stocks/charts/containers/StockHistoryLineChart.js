import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Skeleton from '@material-ui/lab/Skeleton'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import { exportChart } from 'utils/downloader'

import ChartOptions from '../components/ChartOptions'
import StockHistoryLineChart from '../components/StockHistoryLineChart'
import queries from '../queries'
import { prepareHistoryLineChartData } from '../utils'

const CHART_DOM_INDEX = 1

const StockHistoryLineChartContainer = ({
  interval = '1d',
  period = 'ytd',
  ticker,
}) => {
  const chartRef = useRef()
  const { data, error, loading } = useQuery(queries.stockLineChart, {
    variables: { interval, period, ticker },
  })

  if (error)
    return <ErrorHandler operation="line chart data">{error}</ErrorHandler>

  const stockHistory = data?.stockHistory
  const chart = prepareHistoryLineChartData(stockHistory)

  return (
    <div ref={chartRef}>
      {loading ? (
        <Skeleton height={300} variant="rect" />
      ) : (
        <>
          <ChartOptions
            onDownloadClick={() =>
              exportChart(chartRef.current.children[CHART_DOM_INDEX])
            }
          />
          <StockHistoryLineChart
            chartData={chart}
            chartRef={chartRef}
            currency={stockHistory?.currency}
          />
        </>
      )}
    </div>
  )
}

StockHistoryLineChartContainer.propTypes = {
  interval: PropTypes.string,
  period: PropTypes.string,
  ticker: PropTypes.string.isRequired,
}

export default StockHistoryLineChartContainer
