import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCurrencyRoundedNumber } from '../../utils/numberFormat';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

const ValueCard = ({ title, isMoney = false, children = null}) => {
  const classes = useStyles();
  console.log(children);
  const displayValue = isMoney ? getCurrencyRoundedNumber(children || 0) : children;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h5" component="h2">
          {displayValue}
        </Typography>

        {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>

        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

ValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  isMoney: PropTypes.bool,
  children: PropTypes.number
}

export default ValueCard;
