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
import Typography from '@material-ui/core/Typography';

import Emotion from './Emotion';
import TickerField from './TickerField';
import StrikeActionToggle from './StrikeActionToggle';
import { formatCurrency } from '../../../utils/money';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4, 4),
    margin: theme.spacing(2, 1),
    '& > *': {
      margin: theme.spacing(2, 0),
    },
  },
  field: {
    margin: theme.spacing(0, 1),
  }
}));

const FormRow = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
        {children}
    </Box>
  )
}

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
  const isEnabled = !isDisabled;
  const tickerHelperText = error ? "Ticker not found" : stockInfo?.name;
  const totalValue = isEnabled && entity.strikePrice && entity.units ? entity.units * entity.strikePrice : 0;
  const formattedTotalValue = formatCurrency(totalValue, stockInfo?.currency);

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
        flexDirection="column"
        justifyContent="space-around"
        className={classes.container}
      >
        <FormRow>
          <StrikeActionToggle
            value={entity.action}
            onChange={handleChange('action')}
          />

          <TickerField
            error={error}
            helperText={tickerHelperText}
            value={entity.ticker}
            onChange={handleChange('ticker')}
            onSubmitTicker={onSubmitTicker}
            />
        </FormRow>

        {loading && <LinearProgress color="secondary" />}
        <ErrorHandler>{error}</ErrorHandler>

        <FormRow>
          <DecimalTextField
            id="units"
            label="Units"
            className={classes.field}
            disabled={isDisabled}
            value={entity.units}
            onChange={handleInputChange('units')}
          />

          <DecimalTextField
            id="strikePrice"
            label="Strike Price"
            className={classes.field}
            disabled={isDisabled}
            currency={stockInfo?.currency}
            value={entity.strikePrice}
            onChange={handleInputChange('strikePrice')}
          />
        </FormRow>

        <FormRow>
          <Typography variant="h3">{formattedTotalValue}</Typography>
        </FormRow>

        <FormRow>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Typography>In emoji-words - <strong>How do you feel?</strong></Typography>
            <Emotion
              onChange={handleEmotionChange}
              disabled={isDisabled}
            />
          </Box>
        </FormRow>

        <FormRow>
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
        </FormRow>

        <FormRow>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            disabled={!enableSubmit || error}
            onClick={onSubmit}
          >
            Add
          </Button>
        </FormRow>
      </Box>
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
