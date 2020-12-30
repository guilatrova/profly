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

const PeriodToggle = ({ onChange }) => {
  const classes = useStyles();
  const periodOptions = ['1d', '5d', '1mo', '3mo', '6mo', '1y', 'ytd', '2y', '5y', 'max'];
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
      >
        {periodOptions.map(period => <ToggleButton key={period} value={period}>{period}</ToggleButton>)}

      </ToggleButtonGroup>
    </div>
  );
}

PeriodToggle.propTypes = {
  onChange: PropTypes.func
}

export default PeriodToggle;
