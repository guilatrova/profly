import React from 'react';
import { Link } from 'react-router-dom';
import { tickerType } from '../types';

const TickerLink = ({ children: ticker }) => {
  return (
    <span>
      <Link to={`/stocks/${ticker}`}>{ticker}</Link>
    </span>
  )
}

TickerLink.propTypes = {
  children: tickerType.isRequired
};

export default TickerLink;
