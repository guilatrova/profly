import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ENTER_KEY = 13;

const TickerField = ({ error, helperText, onChange, onSubmitTicker, value }) => {
  const hasError = !!error;

  const handleSubmit = () => onSubmitTicker(value);

  const handleKeyPress = (e) => {
    if (e.keyCode == ENTER_KEY) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value.toUpperCase());
  };

  return (
    <TextField
      error={hasError}
      helperText={helperText}
      id="ticker"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="find ticker"
              color="secondary"
              onClick={handleSubmit}
            >
              <ArrowForwardIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      label="Ticker"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
};

TickerField.propTypes = {
  error: PropTypes.any,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmitTicker: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default TickerField;
