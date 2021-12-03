import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import HeaderBar from './HeaderBar';
import AppContent from './AppContent';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Urbanist',
      'Roboto',
      'sans-serif'
    ].join(','),
    h6: {
      fontWeight: 700
    },
  }
});

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
          {children}
        </AppContent>
      </ThemeProvider>

    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node
};

export default AppWrapper;
