import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
}));

const StrikeActionToggle = ({ onChange, disabled }) => {
  const [action, setAction] = useState('buy');

  const handleChange = (event, newAction) => {
    if (newAction) {
      setAction(newAction);
      onChange(newAction);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={action}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="buy" disabled={disabled}>
          Buy
        </ToggleButton>

        <ToggleButton value="sell" disabled={disabled}>
          Sell
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

StrikeActionToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default StrikeActionToggle;
