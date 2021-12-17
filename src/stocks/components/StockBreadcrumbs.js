import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  anchor: {
    '&:hover': {
      textDecoration: 'underline'
    },
    color: theme.palette.secondary.main,
    textDecoration: 'none'
  },
}));


const StockBreadcrumbs = ({ location }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <RouterLink className={classes.anchor} to="/">
        Profly
      </RouterLink>

      <RouterLink className={classes.anchor} to="/stocks">
        Stocks
      </RouterLink>

      <RouterLink className={classes.anchor} to="#">
        {location}
      </RouterLink>

    </Breadcrumbs>
  );
};

StockBreadcrumbs.propTypes = {
  location: PropTypes.string.isRequired
};

export default StockBreadcrumbs;
