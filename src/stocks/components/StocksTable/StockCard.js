import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { formatCurrency } from '../../../utils/money';
import { stockSummaryPropType } from '../../types';
import StockAvatar from '../StockAvatar';
import StockLink from '../../../core/components/StockLink';


const useStyles = makeStyles({
  stockTitle: {
    fontWeight: 900,
    fontSize: 16
  },
  link: {
    textDecoration: 'none',
  },
  card: {
    cursor: 'pointer',
    background: 'inherit',
    position: 'relative',
    '&:hover': {
      background: '#eaeaea'
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '50px',
      right: '5px',
      bottom: 0,
      borderBottom: '1px solid #dadada',
    }
  },
  cardHeader: {
    paddingLeft: 5
  }
});


const StockCard = ({ data }) => {
  const classes = useStyles();

  return (
    <StockLink ticker={data.ticker}>
      <Card elevation={0} className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <StockAvatar url={data.logoUrl} ticker={data.ticker} name={data.name} />
          }
          title={<Typography className={classes.stockTitle}>{data.ticker}</Typography>}
          subheader={`x${data.units}`}
          action={
            <p className={classes.stockTitle}>{formatCurrency(data.value, data.currency)}</p>
          }
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
