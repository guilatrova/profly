import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { DateTimePicker } from '@material-ui/pickers'

import ErrorHandler from 'core/components/ApolloErrorHandler'
import DecimalTextField from 'core/components/DecimalTextField'

import SavingsActionToggle from './StrikeActionToggle'

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *': {
      margin: theme.spacing(2, 0),
    },
    margin: theme.spacing(2, 1),
    padding: theme.spacing(4, 4),
  },
  field: {
    margin: theme.spacing(0, 1),
  },
}))

const FormRow = ({ children }) => {
  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      {children}
    </Box>
  )
}

const TransactionBody = ({
  enableSubmit,
  entity,
  error,
  onPropChange,
  onSubmit,
}) => {
  const classes = useStyles()

  const handleInputChange = (key) => (e) =>
    onPropChange({ [key]: e.target.value })
  const handleChange = (key) => (value) => onPropChange({ [key]: value })

  return (
    <>
      <Box
        className={classes.container}
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
      >
        <FormRow>
          <SavingsActionToggle
            value={entity.action}
            onChange={handleChange('action')}
          />
        </FormRow>

        <FormRow>
          <DecimalTextField
            className={classes.field}
            currency="USD"
            id="value"
            label="Value"
            value={entity.value}
            onChange={handleInputChange('value')}
          />
        </FormRow>

        <FormRow>
          <TextField
            multiline
            id="notes"
            inputProps={{ maxLength: 250 }}
            label="Notes"
            maxRows={4}
            minRows={2}
            placeholder="Input your thoughts and reasoning here"
            onChange={handleInputChange('notes')}
          />
        </FormRow>

        <FormRow>
          <DateTimePicker
            ampm={false}
            format="dd/MM/yyyy HH:mm"
            id="performedAt"
            label="Performed at"
            value={entity.performedAt}
            variant="inline"
            onChange={handleChange('performedAt')}
          />
        </FormRow>

        {error && (
          <FormRow>
            <ErrorHandler operation="submit savings transaction">
              {error}
            </ErrorHandler>
          </FormRow>
        )}

        <FormRow>
          <Button
            fullWidth
            color="secondary"
            disabled={!enableSubmit}
            size="large"
            variant="contained"
            onClick={onSubmit}
          >
            Add
          </Button>
        </FormRow>
      </Box>
    </>
  )
}

TransactionBody.propTypes = {
  enableSubmit: PropTypes.bool.isRequired,
  entity: PropTypes.any,
  error: PropTypes.any,
  onPropChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default TransactionBody
