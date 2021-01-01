import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ENTER_KEY = 13;

const TickerField = ({ value, onChange, onSubmitTicker, error, helperText }) => {
  const hasError = !!error;
  // const helperText = hasError ? "Ticker not found" : "";
  const handleKeyPress = (e) => {
    if (e.keyCode == ENTER_KEY) {
      onSubmitTicker(e.target.value);
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value.toUpperCase());
  };

  return (
    <TextField
      id="ticker"
      label="Ticker"
      value={value}
      error={hasError}
      helperText={helperText}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
};

TickerField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitTicker: PropTypes.func.isRequired,
  error: PropTypes.any,
  helperText: PropTypes.string
};

export default TickerField;
