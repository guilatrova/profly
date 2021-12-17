import React from "react";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
});


const StockLink = ({ children, ticker }) => {
  const classes = useStyles();

  return (
    <Link className={classes.link} to={`/stocks/${ticker}`}>
      {children}
    </Link>
  );
};

StockLink.propTypes = {
  children: PropTypes.node.isRequired,
  ticker: PropTypes.string.isRequired
}

export default StockLink;
