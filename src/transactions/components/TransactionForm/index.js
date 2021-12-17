import React, { useState } from 'react';
import PropTypes from 'prop-types';

import STOCK_ACTIONS from '../../../core/constants/stockActions';
import StockInfoProvider from '../StockInfoProvider';
import TransactionBody from './TransactionBody';
import { isSubmitEnabled,prepareEntity } from './utils';


const emptyEntity = {
  action: STOCK_ACTIONS.BUY,
  emotion: 'neutral_face',
  performedAt: new Date(),
  strikePrice: '',
  ticker: '',
  units: '',
};

const TransactionForm = ({ onSubmit }) => {
  const [entity, setEntity] = useState({ ...emptyEntity });
  const [ticker, setTicker] = useState();
  const isEntityValid = isSubmitEnabled(entity);

  const handlePropChange = (modified) => setEntity({ ...entity, ...modified });
  const handleSubmit = () => {
    if (isEntityValid) {
      onSubmit(prepareEntity(entity));
      setTicker();
      setEntity({ ...emptyEntity });
    }
  };
  const preventFormSubmit = (e) => e.preventDefault();

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={preventFormSubmit}
    >
      <StockInfoProvider ticker={ticker}>
        <TransactionBody
          enableSubmit={isEntityValid}
          entity={entity}
          onPropChange={handlePropChange}
          onSubmit={handleSubmit}
          onSubmitTicker={setTicker}
        />
      </StockInfoProvider>

    </form>
  );
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TransactionForm;
