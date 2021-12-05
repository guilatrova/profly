import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../utils/money';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(() => ({
  root: {
  },
  value: {
    color: 'black'
  },
}));

const ValueCard = ({ title, loading = false, currency = 'BRL', isMoney = false, icon, children = null}) => {
  const classes = useStyles();
  const displayValue = isMoney ? formatCurrency(children || 0, currency) : children;

  return (
    <Card className={classes.root}>
      <CardContent>
        {icon}

        <Typography variant="subtitle2" component="h3" gutterBotom>
          {title}
        </Typography>

        <Typography variant="subtitle2" component="h3" className={classes.value}>
          {loading ? <Skeleton /> : displayValue}
        </Typography>
      </CardContent>
    </Card>
  );
}

ValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  currency: PropTypes.string,
  loading: PropTypes.bool,
  isMoney: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.number
}

export default ValueCard;
