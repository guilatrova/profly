import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StockHistoryLineChart from '../../charts/containers/StockHistoryLineChart';
import StockAverageSummary from './StockAverageSummary';

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <h1>{ticker}</h1>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <StockHistoryLineChart ticker={ticker} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <StockAverageSummary ticker={ticker} />
      </Grid>
    </Grid>
  );
};

export default StockPage;
