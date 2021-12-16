import React from 'react';
import { useQuery } from '@apollo/client';
import chartQueries from '../../charts/queries';
import savingsQueries from '../queries';
import ErrorHandler from '../../core/components/ApolloErrorHandler';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { formatCurrency } from '../../utils/money';


const useStyles = makeStyles((theme) => ({
  summaryTitle: {
    flexBasis: '25%',
  },
  summaryValue: {
    fontWeight: '700',
    flexShrink: 0,
  },
  soonChip: {
    marginLeft: theme.spacing(1),
    fontWeight: 'bold',
  }
}));

const Accordion = withStyles({
  root: {
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    padding: 0,
    margin: 0,
    minHeight: '24px',
    backgroundColor: 'inherit',
    marginBottom: -1,
    flexDirection: 'row-reverse',
  },
  expandIcon: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,

  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const SavingsSummary = () => {
  const classes = useStyles();
  const { error, data = [] } = useQuery(chartQueries.chartStocksValues);
  const { walletError, walletData } = useQuery(savingsQueries.defaultWallet);
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (error)
    return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>;
  if (walletError)
    return (
      <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>
    );

  const chartData = data?.stocks || [];
  const walletTotal = walletData?.value || 0;
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <>
      <Accordion
        square
        expanded={expanded === 'panel-savings'}
      >
        <AccordionSummary
          IconButtonProps={{
            disabled: true,
            edge: 'start',
          }}
        >
          <Typography className={classes.summaryTitle}>Wallet</Typography>
          <Typography className={classes.summaryValue}>{formatCurrency(walletTotal)}</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel-stocks'}
        onChange={handleChange('panel-stocks')}
        // onClick={() => alert('oi')}
      >
        <AccordionSummary
          IconButtonProps={{
            disableRipple: true,
            edge: 'start',
          }}
        >
          <Typography className={classes.summaryTitle}>Stocks</Typography>
          <Typography className={classes.summaryValue}>{formatCurrency(stocksTotal)}</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        square
        expanded={expanded === 'panel-crypto'}
      >
        <AccordionSummary
          IconButtonProps={{
            disabled: true,
            edge: 'start'
          }}
        >
          <Typography className={classes.summaryTitle}>Crypto</Typography>
          <Typography className={classes.summaryValue}>
            <Chip size="small" label="coming soon" color="secondary" />
          </Typography>
        </AccordionSummary>
      </Accordion>
    </>
  );
};

export default SavingsSummary;
