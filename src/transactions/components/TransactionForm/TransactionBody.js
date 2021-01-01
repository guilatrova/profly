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
  const handleInputChange = (key) => (e) => onPropChange({ [key]: e.target.value });
  const handleChange = (key) => value => onPropChange({ [key]: value });

  return (
    <>
      <TickerField onSubmitTicker={handleChange('ticker')} />

      {loading && <CircularProgress />}
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle
        disabled={isDisabled}
        onChange={handleChange('action')}
      />

      <DecimalTextField
        id="units"
        label="Units"
        disabled={isDisabled}
        value={entity.units}
        onChange={handleInputChange('units')}
      />

      <DecimalTextField
        id="strikePrice"
        label="Strike Price"
        disabled={isDisabled}
        value={entity.strikePrice}
        onChange={handleInputChange('strikePrice')}
        onKeyDown={handlePriceKeyDown}
      />

      <KeyboardDateTimePicker
        id="performedAt"
        label="Performed at"
        variant="inline"
        ampm={false}
        format="dd/MM/yyyy HH:mm"
        value={entity.performedAt}
        onChange={handleChange('performedAt')}
      />
    </>
  );
};

TransactionBody.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  entity: PropTypes.any,
};

export default TransactionBody;
