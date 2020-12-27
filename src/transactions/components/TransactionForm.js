import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import StrikePrice from './StrikePrice';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// TODO: Implement i18n
const TransactionForm = ({onSubmit}) => {
  const classes = useStyles();
  const [entity, setEntity] = useState({ ticker: "", strikePrice: "", units: ""});
  const handleChange = e => setEntity({ ...entity, [e.target.id]: e.target.value });
  const handlePriceChange = strikePrice => setEntity({ ...entity, strikePrice})
  const handleSubmit = () => onSubmit(entity);

  return (
    <form className={classes.root} noValidate autoComplete="off">

      <TextField id="ticker" label="Ticker" value={entity.ticker} onChange={handleChange} />
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
