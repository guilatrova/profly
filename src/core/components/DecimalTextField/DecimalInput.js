import React from 'react';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

const DecimalInput = ({ inputRef, onChange, ...other }) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      isNumericString
    />
  );
};

DecimalInput.propTypes = {
  inputRef: PropTypes.any,
  onChange: PropTypes.func
};

export default DecimalInput;
