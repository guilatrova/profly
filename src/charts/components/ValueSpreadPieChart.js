import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Cell, Sector } from 'recharts';
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
    <PieChart width={500} height={250}>
      <Pie
        activeIndex={activeIndex}
        activeShape={ActiveShape}
        data={chartData}
        cx={150}
        cy={120}
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        onMouseEnter={(data, idx) => setActiveIndex(idx)}
        onMouseLeave={() => setActiveIndex()}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  );
};

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};

export default ValueSpreadPieChart;
