import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const TransactionActions = ({ onDelete }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

TransactionActions.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default TransactionActions;
