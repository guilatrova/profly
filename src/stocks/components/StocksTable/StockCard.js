import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { formatCurrency } from '../../../utils/money';
import { stockSummaryPropType } from '../../types';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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
    <Link className={classes.link} to={`/stocks/${data.ticker}`}>
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
    </Link>
  );
}


StockCard.propTypes = {
  data: stockSummaryPropType,
  loading: PropTypes.bool
};

export default StockCard;
