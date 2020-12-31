import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { stockInfoPropType } from '../../types';

import StrikeActionToggle from './StrikeActionToggle';

// TODO: Implement i18n
const TransactionBody = ({ stockInfo, onPropChange, loading }) => {
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');
  const [userInput, setUserInput] = useState(false);
  const [, setStrikeAction] = useState();

  const isDisabled = !stockInfo || loading;
  const isPriceUnset = stockInfo?.currentPrice && price !== stockInfo?.currentPrice;

  if (!userInput && isPriceUnset) {
    setPrice(stockInfo.currentPrice);
    onPropChange({ strikePrice: stockInfo.currentPrice });
  }

  const handlePriceKeyDown = () => setUserInput(true);
  const handleActionChange = (action) => {
    setStrikeAction(action);
    onPropChange({ action });
  };
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    onPropChange({ [e.target.id]: e.target.value });
  };

  return (
    <>
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle disabled={isDisabled} onChange={handleActionChange} />

      <TextField
        id="units"
        label="Units"
        disabled={isDisabled}
        value={units}
        onChange={handleChange(setUnits)}
      />

      <TextField
        id="strikePrice"
        label="Strike Price"
        disabled={isDisabled}
        value={price}
        onChange={handleChange(setPrice)}
        onKeyDown={handlePriceKeyDown}
      />
    </>
  );
};

TransactionBody.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  stockInfo: stockInfoPropType,
  loading: PropTypes.bool,
};

export default TransactionBody;
