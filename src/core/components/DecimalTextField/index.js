import React from 'react';
import PropTypes from 'prop-types';
import DecimalInput from './DecimalInput';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { resolveCurrencySign } from './utils';

const DecimalTextField = ({ currency, ...props }) => {
  const startAdornment = currency ? <InputAdornment position="start">{resolveCurrencySign(currency)}</InputAdornment> : <></>;

  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: DecimalInput,
        startAdornment
      }}
    />
  )
};

DecimalTextField.propTypes = {
  currency: PropTypes.string
};

export default DecimalTextField;
