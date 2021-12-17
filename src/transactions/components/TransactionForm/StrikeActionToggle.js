import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import STOCK_ACTIONS from '../../../core/constants/stockActions';

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0, 2),
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
        exclusive
        size="large"
        value={value}
        onChange={handleChange}
      >
        <ToggleButton disabled={disabled} value={STOCK_ACTIONS.BUY}>
          Buy
        </ToggleButton>

        <ToggleButton disabled={disabled} value={STOCK_ACTIONS.SELL}>
          Sell
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

StrikeActionToggle.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(Object.values(STOCK_ACTIONS))
}

export default StrikeActionToggle;
