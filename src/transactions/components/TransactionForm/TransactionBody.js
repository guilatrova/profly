import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DecimalTextField from '../../../core/components/DecimalTextField';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStockInfo } from '../StockInfoProvider/context';

import TickerField from './TickerField';
import StrikeActionToggle from './StrikeActionToggle';

// TODO: Implement i18n
const TransactionBody = ({ onPropChange, entity }) => {
  const { stock: stockInfo, loadingStock: loading } = useStockInfo();
  const [userInput, setUserInput] = useState(false);
  console.log("entity", entity);

  const isDisabled = !stockInfo || loading;
  const isPriceUnset =
    stockInfo?.currentPrice && entity.strikePrice !== stockInfo.currentPrice;

  if (!userInput && isPriceUnset) {
    onPropChange({ strikePrice: stockInfo.currentPrice });
  }

  const handlePriceKeyDown = () => setUserInput(true);
  const handleActionChange = (action) => onPropChange({ action });
  const handleChange = (key) => (e) => onPropChange({ [key]: e.target.value });
  const handleDateChange = (performedAt) => onPropChange({ performedAt });
  const handleTickerChange = (ticker) => onPropChange({ ticker });

  return (
    <>
      <TickerField onSubmitTicker={handleTickerChange} />

      {loading && <CircularProgress />}
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle
        disabled={isDisabled}
        onChange={handleActionChange}
      />

      <DecimalTextField
        id="units"
        label="Units"
        disabled={isDisabled}
        value={entity.units}
        onChange={handleChange('units')}
      />

      <DecimalTextField
        id="strikePrice"
        label="Strike Price"
        disabled={isDisabled}
        value={entity.strikePrice}
        onChange={handleChange('strikePrice')}
        onKeyDown={handlePriceKeyDown}
      />

      <KeyboardDateTimePicker
        id="performedAt"
        label="Performed at"
        variant="inline"
        ampm={false}
        format="dd/MM/yyyy HH:mm"
        value={entity.performedAt}
        onChange={handleDateChange}
      />
    </>
  );
};

TransactionBody.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  entity: PropTypes.any,
};

export default TransactionBody;
