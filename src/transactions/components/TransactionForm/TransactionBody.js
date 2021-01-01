import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DecimalTextField from '../../../core/components/DecimalTextField';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStockInfo } from '../StockInfoProvider/context';

import StrikeActionToggle from './StrikeActionToggle';

// TODO: Implement i18n
const TransactionBody = ({ onPropChange }) => {
  const { stock: stockInfo, loadingStock: loading } = useStockInfo();
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');
  const [performedDateTime, setPerformedDateTime] = useState(new Date());
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
  const handleChange = (key, setter) => (e) => {
    setter(e.target.value);
    onPropChange({ [key]: e.target.value });
  };
  const handleDateChange = performedAt => {
    setPerformedDateTime(performedAt);
    onPropChange({ performedAt });
  };

  return (
    <>
      {loading && <CircularProgress />}
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle disabled={isDisabled} onChange={handleActionChange} />

      <DecimalTextField
        id="units"
        label="Units"
        disabled={isDisabled}
        value={units}
        onChange={handleChange("units", setUnits)}
      />

      <DecimalTextField
        id="strikePrice"
        label="Strike Price"
        disabled={isDisabled}
        value={price}
        onChange={handleChange("strikePrice", setPrice)}
        onKeyDown={handlePriceKeyDown}
      />

      <KeyboardDateTimePicker
        id="performedAt"
        label="Performed at"
        variant="inline"
        ampm={false}
        value={performedDateTime}
        onChange={handleDateChange}
        format="dd/MM/yyyy HH:mm"
      />
    </>
  );
};

TransactionBody.propTypes = {
  onPropChange: PropTypes.func.isRequired
};

export default TransactionBody;
