import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import ErrorHandler from 'core/components/ApolloErrorHandler'
import DateTimePicker from 'core/components/DateTimePicker'
import DecimalTextField from 'core/components/DecimalTextField'
import { isDayYesterdayOrBeforeRegardlessTime } from 'utils/dates'
import { formatCurrency } from 'utils/money'

import { useStockInfo } from '../StockInfoProvider/context'
import Emotion from './Emotion'
import StrikeActionToggle from './StrikeActionToggle'
import TickerField from './TickerField'

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(2, 0),
    },
    margin: theme.spacing(2, 1),
    padding: theme.spacing(4, 4),
  },
  field: {
    margin: theme.spacing(0, 1),
  },
}))

const FormRow = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      {children}
    </Box>
  )
}

const TransactionBody = ({
  enableSubmit,
  entity,
  onPropChange,
  onSubmit,
  onSubmitTicker,
}) => {
  const classes = useStyles()
  const { error, loadingStock: loading, stock: stockInfo } = useStockInfo()
  const isDisabled = !stockInfo || loading
  const isEnabled = !isDisabled
  const tickerHelperText = error ? 'Ticker not found' : stockInfo?.name
  const totalValue =
    isEnabled && entity.strikePrice && entity.units
      ? entity.units * entity.strikePrice
      : 0
  const formattedTotalValue = formatCurrency(totalValue, stockInfo?.currency)

  useEffect(() => {
    if (stockInfo) {
      onPropChange({ strikePrice: stockInfo.currentPrice })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockInfo])

  const handleInputChange = (key) => (e) =>
    onPropChange({ [key]: e.target.value })
  const handleChange = (key) => (value) => onPropChange({ [key]: value })
  const handleEmotionChange = (emoji) => onPropChange({ emotion: emoji.id })
  const emojiQuestion = isDayYesterdayOrBeforeRegardlessTime(entity.performedAt)
    ? 'How have you felt?'
    : 'How do you feel?'

  return (
    <>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
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
        <ErrorHandler hidden operation="get stock info">
          {error}
        </ErrorHandler>

        <FormRow>
          <DecimalTextField
            className={classes.field}
            disabled={isDisabled}
            id="units"
            label="Units"
            value={entity.units}
            onChange={handleInputChange('units')}
          />

          <DecimalTextField
            className={classes.field}
            currency={stockInfo?.currency}
            disabled={isDisabled}
            id="strikePrice"
            label="Strike Price"
            value={entity.strikePrice}
            onChange={handleInputChange('strikePrice')}
          />
        </FormRow>

        <FormRow>
          <Typography variant="h3">{formattedTotalValue}</Typography>
        </FormRow>

        <FormRow>
          <DateTimePicker
            disabled={isDisabled}
            id="performedAt"
            label="Performed at"
            value={entity.performedAt}
            onChange={handleChange('performedAt')}
          />
        </FormRow>

        <FormRow>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
          >
            <Typography>
              In emoji-words - <strong>{emojiQuestion}</strong>
            </Typography>
            <Emotion disabled={isDisabled} onChange={handleEmotionChange} />
          </Box>
        </FormRow>

        <FormRow>
          <Button
            fullWidth
            color="secondary"
            disabled={!enableSubmit || error}
            size="large"
            variant="contained"
            onClick={onSubmit}
          >
            Add
          </Button>
        </FormRow>
      </Box>
    </>
  )
}

TransactionBody.propTypes = {
  enableSubmit: PropTypes.bool.isRequired,
  entity: PropTypes.any,
  onPropChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitTicker: PropTypes.func.isRequired,
}

export default TransactionBody
