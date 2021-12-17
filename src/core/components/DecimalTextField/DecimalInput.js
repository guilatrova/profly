import React from 'react';
import NumberFormat from 'react-number-format';

import PropTypes from 'prop-types';

const DecimalInput = ({ inputRef, onChange, ...other }) => {
  return (
    <NumberFormat
      {...other}
      isNumericString
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
    />
  );
};

DecimalInput.propTypes = {
  inputRef: PropTypes.any,
  onChange: PropTypes.func
};

export default DecimalInput;
