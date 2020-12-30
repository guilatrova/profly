import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Deposits from './Deposits';
import RecentTransactions from '../transactions/containers/RecentTransactions';
import StockHistoryLineChart from '../charts/containers/StockHistoryLineChart';
import ValueSpreadPieChart from '../charts/components/ValueSpreadPieChart';
import AppWrapper from '../core/components/AppWrapper';


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
    <AppWrapper>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <ValueSpreadPieChart />
          </Paper>
        </Grid>

        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <RecentTransactions />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>STOCKS</h1>
            <div height={800}>
              <StockHistoryLineChart ticker="MGLU3.SA" />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </AppWrapper>
  );
};

export default Dashboard;
