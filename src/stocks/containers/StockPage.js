import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StockHistoryLineChart from '../../charts/containers/StockHistoryLineChart';
import StockAverageSummary from './StockAverageSummary';
import PeriodToggle from '../components/PeriodToggle';

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

const StockPage = () => {
  const classes = useStyles();
  const { ticker } = useParams();
  const [period, setPeriod] = useState('ytd');
  const interval = period == '1d' ? '1h' : '1d';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>{ticker}</h1>
      </Grid>

      <Grid container xs={12} alignContent="flex-end">
        <Grid item xs={12}>
          <StockAverageSummary ticker={ticker} />
        </Grid>

        <Grid item xs={12}>
          <PeriodToggle onChange={setPeriod} />
        </Grid>
      </Grid>


      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <StockHistoryLineChart period={period} interval={interval} ticker={ticker} />
        </Paper>
      </Grid>

    </Grid>
  );
};

export default StockPage;
