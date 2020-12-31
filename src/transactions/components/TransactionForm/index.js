import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TickerField from './TickerField';
import StockInfoProvider from './StockInfoProvider';
import TransactionBody from './TransactionBody';
import STOCK_ACTIONS from '../../../core/constants/stockActions';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const prepareEntity = (ticker, entity) => {
  const prepared = {ticker, ...entity};
  delete prepared.action;

  if (entity.action === STOCK_ACTIONS.SELL) {
    prepared.units = -entity.units;
  }

  return prepared;
}

// TODO: Implement i18n
const TransactionForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [entity, setEntity] = useState({ action: STOCK_ACTIONS.BUY, units: '', strikePrice: '' });
  const [ticker, setTicker] = useState();

  const handleSubmit = () => onSubmit(prepareEntity(ticker, entity));
  const handlePropChange = (modified) => setEntity({ ...entity, ...modified});
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleFormSubmit}>

      <TickerField onSubmitTicker={setTicker} />

      <StockInfoProvider ticker={ticker}>
        {(stockInfo, loading) => (
            <TransactionBody
              loading={loading}
              stockInfo={stockInfo}
              onPropChange={handlePropChange}
            />
          )
        }
      </StockInfoProvider>

      <Button variant="contained" onClick={handleSubmit} color="primary">
        Add
      </Button>
    </form>
  );
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TransactionForm;
