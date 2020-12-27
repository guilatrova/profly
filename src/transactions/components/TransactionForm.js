import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

// TODO: Implement i18n
const TransactionForm = ({onSubmit}) => {
  const classes = useStyles();
  const [entity, setEntity] = useState({ stock: "", strikePrice: "", units: "", value: ""});
  const handleChange = e => setEntity({ ...entity, [e.target.id]: e.target.value });
  const handleSubmit = () => onSubmit(entity);

  return (
    <form className={classes.root} noValidate autoComplete="off">

      <TextField id="stock" label="Stock" value={entity.stock} onChange={handleChange} />
      <TextField id="strikePrice" label="Strike Price" value={entity.strikePrice} onChange={handleChange} />
      <TextField id="units" label="Units" value={entity.units} onChange={handleChange} />
      <TextField id="value" label="Value" variant="filled" value={entity.value} onChange={handleChange} />

      <Button variant="contained" onClick={handleSubmit} color="primary">
        Add
      </Button>

    </form>
  );
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default TransactionForm;
