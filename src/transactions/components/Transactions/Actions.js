import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';


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
