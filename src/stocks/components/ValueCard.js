import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../utils/money';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
  root: {
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ValueCard = ({ title, loading = false, currency = 'BRL', isMoney = false, children = null}) => {
  const classes = useStyles();
  const displayValue = isMoney ? formatCurrency(children || 0, currency) : children;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h5" component="h2">
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
  children: PropTypes.number
}

export default ValueCard;
