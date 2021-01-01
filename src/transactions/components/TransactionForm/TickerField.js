import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const ENTER_KEY = 13;

const TickerField = ({ value, onChange, onSubmitTicker, error, helperText }) => {
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
      id="ticker"
      label="Ticker"
      value={value}
      error={hasError}
      helperText={helperText}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
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
