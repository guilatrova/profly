import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StockHistoryLineChart from '../../charts/containers/StockHistoryLineChart';
import { COLORS } from '../../charts/components/StockHistoryLineChart';
import StockAverageSummary from './StockAverageSummary';
import StockTransactions from './StockTransactions';
import PeriodToggle from '../components/PeriodToggle';
import Typography from '@material-ui/core/Typography';
import StockBreadcrumbs from '../components/StockBreadcrumbs';
import ValueHeader from './ValueHeader';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperChart: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    background: COLORS.background
  },
  paperless: {
    padding: theme.spacing(2),
  }
}));

const StockPage = () => {
  const classes = useStyles();
  const { ticker } = useParams();
  const [period, setPeriod] = useState('ytd');
  const interval = period == '1d' ? '1h' : '1d';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">{ticker}</Typography>
        <StockBreadcrumbs location={ticker} />
      </Grid>

      <Grid item xs={12}>
        <ValueHeader ticker={ticker} />
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paperChart}>
          <StockHistoryLineChart period={period} interval={interval} ticker={ticker} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <PeriodToggle onChange={setPeriod} />
      </Grid>

      <Grid container className={classes.paperless}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="h6">Status</Typography>
          <StockAverageSummary ticker={ticker} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h2" variant="h6">Transactions</Typography>
        <StockTransactions period={period} ticker={ticker} />
      </Grid>

    </Grid>
  );
};

export default StockPage;
