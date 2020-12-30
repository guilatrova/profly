/* eslint-disable react/prop-types */
import React from 'react';
import { epochToShortDateOutput } from '../../../utils/dates';


const DateAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{epochToShortDateOutput(payload.value)}</text>
      </g>
    );
  }

export default DateAxisTick;
