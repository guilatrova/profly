import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PERIODS from '../../core/constants/periods';

const useStyles = makeStyles({
  toggleContainer: {
    textAlign: 'center'
  },
  root: {
    border: 'none',
    fontWeight: 900
  }
});

const PeriodToggle = ({ onChange }) => {
  const classes = useStyles();
  const [selectedPeriod, setSelectedPeriod] = useState('ytd');

  const handleChange = (event, newAction) => {
    if (newAction) {
      setSelectedPeriod(newAction);
      if (onChange) {
        onChange(newAction);
      }
    }
  };

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={selectedPeriod}
        exclusive
        onChange={handleChange}
        size="large"
      >
        {PERIODS.map((period) => (
          <ToggleButton key={period} value={period} className={classes.root}>
            {period}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

PeriodToggle.propTypes = {
  onChange: PropTypes.func,
};

export default PeriodToggle;
