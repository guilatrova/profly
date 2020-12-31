import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import StrikePrice from './StrikePrice';
import StrikeActionToggle from './StrikeActionToggle';
import TickerField from './TickerField';

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

  const handleChange = e => setEntity({ ...entity, [e.target.id]: e.target.value });
  const handlePriceChange = strikePrice => setEntity({ ...entity, strikePrice})
  const handleActionChange = action => setStrikeAction(action);
  const handleSubmit = () => onSubmit(prepareEntity(entity, strikeAction));

  return (
    <form className={classes.root} noValidate autoComplete="off">

      <TickerField />
      <StrikeActionToggle onChange={handleActionChange} />
      <TextField id="units" label="Units" value={entity.units} onChange={handleChange} />
      {entity.ticker && <StrikePrice
        ticker={entity.ticker}
        value={entity.strikePrice}
        onPriceChange={handlePriceChange}
      />}

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
