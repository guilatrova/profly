import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TransactionFormContainer from './TransactionFormContainer';

const useStyles = makeStyles({
  drawer: {
    borderRadius: '15px 15px 0 0',
    overflow: 'visible'
  },
  centered: {
    width: 'auto',
  },
});

const TransactionFormDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>ADD TRANSACTION</Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawer }}
        anchor="bottom"
      >

        <div
          className={classes.centered}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <TransactionFormContainer />
        </div>

      </Drawer>
    </div>
  );
}

export default TransactionFormDrawer;
