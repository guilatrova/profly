import React, { useState } from 'react';
import PropTypes from 'prop-types';

import StockInfoProvider from '../StockInfoProvider';
import TransactionBody from './TransactionBody';
import STOCK_ACTIONS from '../../../core/constants/stockActions';
import { prepareEntity, isSubmitEnabled } from './utils';


const emptyEntity = {
  ticker: '',
  action: STOCK_ACTIONS.BUY,
  units: '',
  strikePrice: '',
  emotion: 'neutral_face',
  performedAt: new Date(),
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
          entity={entity}
          onPropChange={handlePropChange}
          onSubmitTicker={setTicker}
          onSubmit={handleSubmit}
          enableSubmit={isEntityValid}
        />
      </StockInfoProvider>

    </form>
  );
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TransactionForm;
