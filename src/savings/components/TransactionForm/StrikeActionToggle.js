import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import ACTIONS from 'savings/savingsActions'

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    alignItems: 'center',
    display: 'flex',
    margin: theme.spacing(0, 2),
  },
}))

const SavingsActionToggle = ({
  onChange,
  disabled,
  value = ACTIONS.DEPOSIT,
}) => {
  const classes = useStyles()

  const handleChange = (event, newAction) => {
    if (newAction) {
      onChange(newAction)
    }
  }

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        exclusive
        size="large"
        value={value}
        onChange={handleChange}
      >
        <ToggleButton disabled={disabled} value={ACTIONS.DEPOSIT}>
          Deposit
        </ToggleButton>

        <ToggleButton disabled={disabled} value={ACTIONS.WITHDRAWAL}>
          Withdrawal
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

SavingsActionToggle.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOf(Object.values(ACTIONS)),
}

export default SavingsActionToggle
