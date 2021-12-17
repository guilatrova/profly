import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts'

import { randomColor } from '../../utils/colors'
import ContentValueLabel from './ValueLabel'
import ActiveShape from './ValueSpreadActiveShape'

const ValueSpreadPieChart = ({ chartData }) => {
  const [activeIndex, setActiveIndex] = useState()
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (chartData.length !== colors.length) {
      setColors(chartData.map(() => randomColor()))
    }
  }, [chartData, colors.length])
  const total = chartData.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <ResponsiveContainer height="100%" minHeight={250} width="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={ActiveShape}
          data={chartData}
          dataKey="value"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          onMouseEnter={(data, idx) => setActiveIndex(idx)}
          onMouseLeave={() => setActiveIndex()}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}

          {activeIndex >= 0 || (
            <Label
              content={<ContentValueLabel title={total} />}
              position="center"
              width={30}
            />
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired,
}

export default ValueSpreadPieChart
