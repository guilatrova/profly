import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import DecimalTextField from '../../../core/components/DecimalTextField';
import { DateTimePicker } from '@material-ui/pickers';
import { useStockInfo } from '../StockInfoProvider/context';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import ErrorHandler from '../../../core/components/ApolloErrorHandler';

import Emotion from './Emotion';
import TickerField from './TickerField';
import StrikeActionToggle from './StrikeActionToggle';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, 1),
    '& > *': {
      margin: theme.spacing(2, 0),
    },
  },
}));

const TransactionBody = ({
  entity,
  onPropChange,
  onSubmitTicker,
  onSubmit,
  enableSubmit
}) => {
  const classes = useStyles();
  const { stock: stockInfo, loadingStock: loading, error } = useStockInfo();
  const isDisabled = !stockInfo || loading;
  const tickerHelperText = error ? "Ticker not found" : stockInfo?.name;

  useEffect(() => {
    if (stockInfo) {
      onPropChange({ strikePrice: stockInfo.currentPrice });
    }
  }, [stockInfo]);

  const handleInputChange = (key) => (e) =>
    onPropChange({ [key]: e.target.value });
  const handleChange = (key) => (value) => onPropChange({ [key]: value });
  const handleEmotionChange = (emoji) => onPropChange({ emotion: emoji.id });

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignContent="center"
        className={classes.container}
      >
        <TickerField
          error={error}
          helperText={tickerHelperText}
          value={entity.ticker}
          onChange={handleChange('ticker')}
          onSubmitTicker={onSubmitTicker}
        />

        {error ? (
          <ErrorHandler>{error}</ErrorHandler>
        ) : (
          <>
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
              currency={stockInfo?.currency}
              value={entity.strikePrice}
              onChange={handleInputChange('strikePrice')}
            />

            <Emotion
              onChange={handleEmotionChange}
              disabled={isDisabled}
            />

            <DateTimePicker
              id="performedAt"
              disabled={isDisabled}
              label="Performed at"
              variant="inline"
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              value={entity.performedAt}
              onChange={handleChange('performedAt')}
            />

            <Box>
              <Button disabled={!enableSubmit} variant="contained" onClick={onSubmit} color="primary">
                Add
              </Button>
            </Box>
          </>
        )}
      </Box>
      {loading && <LinearProgress color="secondary" />}
    </>
  );
};

TransactionBody.propTypes = {
  onPropChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitTicker: PropTypes.func.isRequired,
  enableSubmit: PropTypes.bool.isRequired,
  entity: PropTypes.any,
};

export default TransactionBody;
