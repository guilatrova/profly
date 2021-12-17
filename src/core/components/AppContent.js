import * as React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  content: {
    backgroundColor: '#f7f9fb',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const AppBody = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Container className={classes.container} maxWidth="lg">
        {children}
      </Container>
    </main>
  );
}

AppBody.propTypes = {
  children: PropTypes.node
};

export default AppBody;
