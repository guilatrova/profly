import * as React from 'react';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import PropTypes from 'prop-types';

import theme from '../constants/theme';
import AppContent from './AppContent';
import HeaderBar from './HeaderBar';


const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const AppWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <HeaderBar />

        <AppContent>
          <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            {children}
          </SnackbarProvider>
        </AppContent>
      </ThemeProvider>

    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node
};

export default AppWrapper;
