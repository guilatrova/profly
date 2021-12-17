import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PropTypes from 'prop-types';

import PERIODS from '../../core/constants/periods';

const useStyles = makeStyles({
  root: {
    border: 'none',
    fontWeight: 900
  },
  toggleContainer: {
    textAlign: 'center'
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
        exclusive
        size="large"
        value={selectedPeriod}
        onChange={handleChange}
      >
        {PERIODS.map(({display: text, value: period}) => (
          <ToggleButton key={period} className={classes.root} value={period}>
            {text}
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
