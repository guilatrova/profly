import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import STOCK_ACTIONS from '../../../core/constants/stockActions';

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(0, 2),
    display: 'inline-block'
  },
}));

const StrikeActionToggle = ({ onChange, disabled, value = STOCK_ACTIONS.BUY }) => {
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
        value={value}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={STOCK_ACTIONS.BUY} disabled={disabled}>
          Buy
        </ToggleButton>

        <ToggleButton value={STOCK_ACTIONS.SELL} disabled={disabled}>
          Sell
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

StrikeActionToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.oneOf(Object.values(STOCK_ACTIONS))
}

export default StrikeActionToggle;
