import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  anchor: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
}));


const StockBreadcrumbs = ({ location }) => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <RouterLink className={classes.anchor} to="/">
        Profly
      </RouterLink>

      <Typography color="textPrimary">Stocks</Typography>

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
