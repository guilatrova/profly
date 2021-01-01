import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ENTER_KEY = 13;

const TickerField = ({ value, onChange, onSubmitTicker }) => {
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
      onChange={handleChange}
      onKeyDown={handleKeyPress}
    />
  );
};

TickerField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitTicker: PropTypes.func.isRequired,
};

export default TickerField;
