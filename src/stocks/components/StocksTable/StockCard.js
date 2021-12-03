import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../../utils/money';
import { stocksSummaryPropType } from '../../types';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  stockTitle: {
    fontFamily: "Lato, Roboto",
    fontWeight: 900,
    fontSize: 16
  },
});


const StockAvatar = ({ url, ticker, name }) => {
  const ariaLabel = { "aria-label": `logo-${ticker}` };
  if (url) {
    return <Avatar {...ariaLabel} src={url} />;
  }

  const firstLetter = name[0];
  return <Avatar {...ariaLabel}>{firstLetter}</Avatar>;
}

StockAvatar.propTypes = {
  url: PropTypes.string,
  ticker: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};


const StockCard = ({ data }) => {
  const classes = useStyles();

  return (
      <Card>
        <CardHeader
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
  );
}


StockCard.propTypes = {
  data: stocksSummaryPropType,
  loading: PropTypes.bool
};

export default StockCard;
