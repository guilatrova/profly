import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { randomColor } from '../../utils/colors';
import ActiveShape from './ValueSpreadActiveShape';

const ValueSpreadPieChart = ({ chartData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (chartData.length !== colors.length) {
      setColors(chartData.map(() => randomColor()));
    }
  }, [chartData]);

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={250}>
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
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};

export default ValueSpreadPieChart;
