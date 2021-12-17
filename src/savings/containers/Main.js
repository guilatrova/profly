import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import RecentTransactions from '../../transactions/containers/RecentTransactions';
import TotalSummary from './TotalSummary';
import SavingsCardsSummary from './SavingsCardsSummary';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Main = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Typography component="h1" variant="h3">Your Savings</Typography>

        <Paper className={classes.paper}>
          <Typography component="h2" variant="subtitle2">Total</Typography>

          <TotalSummary />
        </Paper>

        <SavingsCardsSummary />
      </Grid>

    </Grid>
  );
};

export default Main;
