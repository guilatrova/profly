import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBar from './HeaderBar';
import AppContent from './AppContent';


const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const AppWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <HeaderBar />

      <AppContent>
        {children}
      </AppContent>

    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node
};

export default AppWrapper;
