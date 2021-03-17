import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { randomColor } from '../../utils/colors';
import ActiveShape from './ValueSpreadActiveShape';
import ContentValueLabel from './ValueLabel';



const ValueSpreadPieChart = ({ chartData }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (chartData.length !== colors.length) {
      setColors(chartData.map(() => randomColor()));
    }
  }, [chartData]);
  const total = chartData.reduce((acc, cur) => acc + cur.value, 0);

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
          onMouseLeave={() => setActiveIndex()}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}

          {activeIndex >= 0 || (
            <Label
              width={30}
              position="center"
              content={<ContentValueLabel title={total} />}
            />
          )}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

ValueSpreadPieChart.propTypes = {
  chartData: PropTypes.array.isRequired,
};

export default ValueSpreadPieChart;
