import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip } from 'recharts';

const ValueSpreadPieChart = ({ chartData }) => {
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={chartData}
        cx={120}
        cy={120}
        innerRadius={40}
        outerRadius={80}
        // fill="#82ca9d"
        label
      />

      <Tooltip />
    </PieChart>
  );
};

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired
};

export default ValueSpreadPieChart;
