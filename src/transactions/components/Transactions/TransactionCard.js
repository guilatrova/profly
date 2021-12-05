import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { formatCurrency } from '../../../utils/money';
import { transactionPropType } from '../../types';
import Actions from './Actions';
import { useMutation } from '@apollo/client';
import queries from '../../queries';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import StockLink from '../../../core/components/StockLink';
import TransactionAvatar from './TransactionAvatar';


const useStyles = makeStyles((theme) => ({
  boughtUnits: {
    color: theme.palette.error.main,
  },
  soldUnits: {
    color: theme.palette.success.main,
  },
  headerTitle: {
    fontWeight: 900,
    fontSize: 16
  },
  card: {
    cursor: 'pointer',
    background: 'inherit',
    position: 'relative',
    padding: '10px 0',
    '&:hover': {
      background: '#eaeaea'
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '70px',
      right: '28px',
      bottom: 0,
      borderBottom: '1px solid #dadada',
    }
  },
  cardHeader: {
    paddingLeft: 5
  },
  cardAvatar: {
    marginRight: 15
  }
}));


const TransactionCard = ({ row, displayStock }) => {
  const classes = useStyles();
  const [handleDelete] = useMutation(queries.deleteTransaction, { variables: { id: row.id }});
  const isBuyOperation = row.units >= 0;
  const units = isBuyOperation ? `x${row.units}` : `x${row.units * -1}`;
  const displayClass = isBuyOperation ? classes.boughtUnits : classes.soldUnits;

  return (
    <StockLink ticker={row.stock.ticker}>
      <Card elevation={0} className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <TransactionAvatar item={row} />
          }
          title={<Typography className={classes.headerTitle}>{row.stock.ticker}</Typography>}
          subheader={units}
          action={
            <div>
              <span className={clsx(classes.headerTitle, displayClass)}>{formatCurrency(row.value, row.stock.currency)}</span>
              <Actions onDelete={handleDelete} />
            </div>
          }
        />
      </Card>
    </StockLink>
  );
};

TransactionCard.propTypes = {
  row: transactionPropType.isRequired,
  displayStock: PropTypes.bool,
};

export default TransactionCard;
