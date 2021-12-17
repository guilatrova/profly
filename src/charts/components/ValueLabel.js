import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../utils/money';

const TITLE_SIZE = 18;
const SUBTITLE_SIZE = 14;

export const ContentValueLabel = ({ subtitle = "", title, viewBox }) => {
  const {cx, cy} = viewBox;

  return (
   <text className="recharts-text recharts-label" dominantBaseline="central" fill="#3d405c" textAnchor="middle" x={cx} y={cy}>
      <tspan alignmentBaseline="middle" fontSize={TITLE_SIZE}>{formatCurrency(title)}</tspan>
      <tspan fontSize={SUBTITLE_SIZE}>{subtitle}</tspan>
   </text>
  )
}

ContentValueLabel.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.any.isRequired
}

export default ContentValueLabel;
