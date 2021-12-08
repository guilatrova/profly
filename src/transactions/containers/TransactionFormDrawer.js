import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useSnackbar } from 'notistack';
import TransactionFormContainer from './TransactionFormContainer';

const useStyles = makeStyles(theme => ({
  drawer: {
    borderRadius: '20px 20px 0 0',
    overflow: 'visible',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      margin: 'auto'
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  addButton: {
    fontWeight: 'bold',
    textTransform: 'upper'
  }
}));

const TransactionFormDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handlePostSubmit = () => {
    enqueueSnackbar('Transaction successfully added!', { variant: 'success' });
    setOpen(false);
    setTimeout(() => window.location.reload(false), 2000);
  }

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button color="primary" onClick={toggleDrawer(true)} className={classes.addButton}>Add Transaction</Button>
      </Box>

      <Box
        md={{maxWidth: '50%', margin: 'auto'}}
      >
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.drawer }}
          anchor="bottom"
        >
          <IconButton aria-label="close" className={classes.closeButton} onClick={toggleDrawer(false)}>
            <CloseIcon />
          </IconButton>

          <div role="presentation">
            <TransactionFormContainer onPostSubmit={handlePostSubmit} />
          </div>

        </Drawer>
      </Box>
    </>
  );
}

export default TransactionFormDrawer;
