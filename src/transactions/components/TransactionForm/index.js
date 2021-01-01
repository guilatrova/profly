import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import StockInfoProvider from '../StockInfoProvider';
import TransactionBody from './TransactionBody';
import STOCK_ACTIONS from '../../../core/constants/stockActions';
import { prepareEntity } from './utils';

const useStyles = makeStyles(() => ({
  root: {
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: '25ch',
    // },
  },
}));

const emptyEntity = {
  ticker: '',
  action: STOCK_ACTIONS.BUY,
  units: '',
  strikePrice: '',
  performedAt: new Date()
}


const TransactionForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [entity, setEntity] = useState({ ...emptyEntity });

  const handleSubmit = () => {
    onSubmit(prepareEntity(entity));
    setEntity(emptyEntity);
  }
  const handlePropChange = (modified) => setEntity({ ...entity, ...modified });
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <StockInfoProvider ticker={entity.ticker}>
        <TransactionBody
          onPropChange={handlePropChange}
          entity={entity}
        />
      </StockInfoProvider>

      <Button variant="contained" onClick={handleSubmit} color="primary">
        Add
      </Button>
    </form>
  );
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TransactionForm;
