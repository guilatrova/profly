import React from "react";
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import StockLink from '../../../core/components/StockLink';
import { formatCurrency } from '../../../utils/money';
import { stockSummaryPropType } from '../../types';
import StockAvatar from '../StockAvatar';


const useStyles = makeStyles({
  card: {
    '&:before': {
      borderBottom: '1px solid #dadada',
      bottom: 0,
      content: '""',
      display: 'block',
      left: '50px',
      position: 'absolute',
      right: '5px',
    },
    '&:hover': {
      background: '#eaeaea'
    },
    background: 'inherit',
    cursor: 'pointer',
    position: 'relative'
  },
  cardHeader: {
    paddingLeft: 5
  },
  link: {
    textDecoration: 'none',
  },
  stockTitle: {
    fontSize: 16,
    fontWeight: 900
  }
});


const StockCard = ({ data }) => {
  const classes = useStyles();

  return (
    <StockLink ticker={data.ticker}>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          action={
            <p className={classes.stockTitle}>{formatCurrency(data.value, data.currency)}</p>
          }
          avatar={
            <StockAvatar name={data.name} ticker={data.ticker} url={data.logoUrl} />
          }
          className={classes.cardHeader}
          subheader={`x${data.units}`}
          title={<Typography className={classes.stockTitle}>{data.ticker}</Typography>}
        />
      </Card>
    </StockLink>
  );
}


StockCard.propTypes = {
  data: stockSummaryPropType,
  loading: PropTypes.bool
};

export default StockCard;
