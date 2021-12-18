/* eslint-disable react/prop-types */
import React from 'react'

import { Sector } from 'recharts'
import { formatCurrency } from 'utils/money'

const ValueSpreadActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    endAngle,
    fill,
    innerRadius,
    midAngle,
    outerRadius,
    payload,
    percent,
    startAngle,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'
  const { currency } = payload.payload

  return (
    <g>
      <text dy={8} fill={fill} textAnchor="middle" x={cx} y={cy}>
        {payload.name}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        endAngle={endAngle}
        fill={fill}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
      />

      <Sector
        cx={cx}
        cy={cy}
        endAngle={endAngle}
        fill={fill}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        fill="none"
        stroke={fill}
      />
      <circle cx={ex} cy={ey} fill={fill} r={2} stroke="none" />
      <text
        fill="#333"
        textAnchor={textAnchor}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
      >
        {`${formatCurrency(value)} (${currency})`}
      </text>
      <text
        dy={18}
        fill="#999"
        textAnchor={textAnchor}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

export default ValueSpreadActiveShape
