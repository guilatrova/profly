import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TickerField from './TickerField';
import StockInfoProvider from './StockInfoProvider';
import TransactionBody from './TransactionBody';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const prepareEntity = (raw, action) => {
  if (action === 'sell') {
    return {...raw, units: -raw.units};
  }

  return raw;
}

// TODO: Implement i18n
const TransactionForm = ({onSubmit}) => {
  const classes = useStyles();
  const [entity, setEntity] = useState({ ticker: "", strikePrice: "", units: ""});
  const [strikeAction, setStrikeAction] = useState();
  const [ticker, setTicker] = useState();

  const handleSubmit = () => onSubmit(prepareEntity(entity, strikeAction));

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>

      <TickerField onSubmitTicker={setTicker} />
      <StockInfoProvider ticker={ticker}>
        {(stockInfo, loading) => (
            <>
              <TransactionBody loading={loading} stockInfo={stockInfo} />
            </>
          )
        }
      </StockInfoProvider>

      <Button variant="contained" onClick={handleSubmit} color="primary">
        Add
      </Button>
    </form>
  );
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TransactionForm;
