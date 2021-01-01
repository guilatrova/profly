import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DecimalTextField from '../../../core/components/DecimalTextField';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStockInfo } from '../StockInfoProvider/context';

import TickerField from './TickerField';
import StrikeActionToggle from './StrikeActionToggle';

const TransactionBody = ({ onPropChange, onSubmitTicker, entity }) => {
  const { stock: stockInfo, loadingStock: loading } = useStockInfo();
  const isDisabled = !stockInfo || loading;

  useEffect(() => {
    if (stockInfo) {
      onPropChange({ strikePrice: stockInfo.currentPrice });
    }
  }, [stockInfo]);

  const handleInputChange = (key) => (e) => onPropChange({ [key]: e.target.value });
  const handleChange = (key) => (value) => onPropChange({ [key]: value });

  return (
    <>
      <TickerField
        value={entity.ticker}
        onChange={handleChange('ticker')}
        onSubmitTicker={onSubmitTicker}
      />

      {loading && <CircularProgress />}
      <p>{stockInfo?.name}</p>

      <StrikeActionToggle
        disabled={isDisabled}
        value={entity.action}
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
  onSubmitTicker: PropTypes.func.isRequired,
  entity: PropTypes.any,
};

export default TransactionBody;
