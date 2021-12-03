import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    backgroundColor: '#f7f9fb',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const AppBody = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      <Container maxWidth="lg" className={classes.container}>
        {children}
      </Container>
    </main>
  );
}

AppBody.propTypes = {
  children: PropTypes.node
};

export default AppBody;
