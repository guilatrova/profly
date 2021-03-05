import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles({
  toggleContainer: {
    textAlign: 'right',
  },
});

const CurrencyToggleButton = ({ currency, onChange }) => {
  const classes = useStyles();
  const handleChange = (event, newAction) => {
    if (newAction) {
      onChange(newAction);
    }
  };

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        size="small"
        value={currency}
        exclusive
        onChange={handleChange}
      >
        {["USD", "BRL"].map((symbol) => (
          <ToggleButton key={symbol} value={symbol}>
            {symbol}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

CurrencyToggleButton.propTypes = {
  currency: PropTypes.string,
  onChange: PropTypes.func,
};

export default CurrencyToggleButton;
