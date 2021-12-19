import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const TransactionActions = ({ onDelete }) => {

  return (
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
  );
}

TransactionActions.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default TransactionActions;
