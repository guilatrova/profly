import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { randomColor } from '../../utils/colors';


const ValueSpreadPieChart = ({ chartData }) => {
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={chartData}
        cx={150}
        cy={120}
        innerRadius={40}
        outerRadius={80}
        // fill="#82ca9d"
        label
      >
        {chartData.map((entry, index) =>
          <Cell key={`cell-${index}`} fill={randomColor()} />)}
      </Pie>

      <Tooltip />
    </PieChart>
  );
};

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default ValueSpreadPieChart;
