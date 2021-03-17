import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/money';

const TITLE_SIZE = 18;
const SUBTITLE_SIZE = 14;

export const ContentValueLabel = ({ viewBox, title, subtitle = "" }) => {
  const {cx, cy} = viewBox;

  return (
   <text x={cx} y={cy} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
      <tspan alignmentBaseline="middle" fontSize={TITLE_SIZE}>{formatCurrency(title)}</tspan>
      <tspan fontSize={SUBTITLE_SIZE}>{subtitle}</tspan>
   </text>
  )
}

ContentValueLabel.propTypes = {
  title: PropTypes.any.isRequired,
  subtitle: PropTypes.string
}

export default ContentValueLabel;
