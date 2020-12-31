import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RecentTransactions from '../transactions/containers/RecentTransactions';
import ValueSpreadPieChart from '../charts/containers/ValueSpreadPieChart';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <ValueSpreadPieChart />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <RecentTransactions />
        </Paper>
      </Grid>

    </Grid>
  );
};

export default Dashboard;
