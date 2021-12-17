/* eslint-disable react/prop-types */
import React from 'react';

import { epochToShortDateOutput } from '../../../utils/dates';


const DateAxisTick = ({ payload, x, y }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text dy={16} fill="#666" textAnchor="end" transform="rotate(-35)" x={0} y={0}>{epochToShortDateOutput(payload.value)}</text>
      </g>
    );
  }

export default DateAxisTick;
