import React from 'react';
import DecimalInput from './DecimalInput';
import TextField from '@material-ui/core/TextField';


const DecimalTextField = ({ ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        inputComponent: DecimalInput,
      }}
      type="number"
    />
  )
}

export default DecimalTextField;
