import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ENTER_KEY = 13;


const TickerField = ({ onSubmitTicker }) => {
  const [ticker, setTicker] = useState("");

  const handleKeyPress = (e) => {
    if (e.keyCode == ENTER_KEY) {
      onSubmitTicker(e.target.value);
    }
  };

  const handleChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  };

  return <TextField
    id="ticker"
    label="Ticker"
    value={ticker}
    onChange={handleChange}
    onKeyDown={handleKeyPress}
  />;
};

TickerField.propTypes = {
  onSubmitTicker: PropTypes.func.isRequired,
};

export default TickerField;
