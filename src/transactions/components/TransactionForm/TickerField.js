import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const ENTER_KEY = 13;


const TickerField = ({ onSubmitTicker }) => {
  const handleKeyPress = (e) => {
    if (e.keyCode == ENTER_KEY) {
      onSubmitTicker(e.target.value);
    }
  };

  return <TextField id="ticker" label="Ticker" onKeyDown={handleKeyPress} />;
};

TickerField.propTypes = {
  onSubmitTicker: PropTypes.func.isRequired,
};

export default TickerField;
