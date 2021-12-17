import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import { tickerType } from '../types';

const useStyles = makeStyles((theme) => ({
  tickerAnchor: {
    borderBottom: `1px dotted ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
}));

const TickerLink = ({ children: ticker }) => {
  const classes = useStyles();

  return (
    <span>
      <Link className={classes.tickerAnchor} to={`/stocks/${ticker}`}>{ticker}</Link>
    </span>
  )
}

TickerLink.propTypes = {
  children: tickerType.isRequired
};

export default TickerLink;
