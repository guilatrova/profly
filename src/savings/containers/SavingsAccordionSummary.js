import React from 'react'

import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Chip from '@material-ui/core/Chip'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import stocksQueries from 'stocks/queries'
import { formatCurrency } from 'utils/money'

import savingsQueries from '../queries'

const useStyles = makeStyles((theme) => ({
  soonChip: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
  summaryTitle: {
    flexBasis: '25%',
  },
  summaryValue: {
    flexShrink: 0,
    fontWeight: '700',
  },
}))

const Accordion = withStyles({
  expanded: {},
  root: {
    '&$expanded': {
      margin: 'auto',
    },
    '&:before': {
      display: 'none',
    },
    backgroundColor: 'inherit',
    border: 'none',
    boxShadow: 'none',
  },
})(MuiAccordion)

const AccordionSummary = withStyles({
  content: {
    '&$expanded': {
      margin: 0,
    },
    margin: 0,
  },
  expandIcon: {
    paddingBottom: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  expanded: {},
  root: {
    backgroundColor: 'inherit',
    flexDirection: 'row-reverse',
    margin: 0,
    marginBottom: -1,
    minHeight: '24px',
    padding: 0,
  },
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
}))(MuiAccordionDetails)

const SavingsSummary = () => {
  const classes = useStyles()
  const { error, data = [] } = useQuery(stocksQueries.chartStocksValues)
  const { walletData, walletError } = useQuery(savingsQueries.defaultWallet)
  const [expanded, setExpanded] = React.useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  if (error)
    return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>
  if (walletError)
    return <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>

  const chartData = data?.stocks || []
  const walletTotal = walletData?.value || 0
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <>
      <Accordion square expanded={expanded === 'panel-savings'}>
        <AccordionSummary
          IconButtonProps={{
            disabled: true,
            edge: 'start',
          }}
        >
          <Typography className={classes.summaryTitle}>Wallet</Typography>
          <Typography className={classes.summaryValue}>
            {formatCurrency(walletTotal)}
          </Typography>
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
          <Typography className={classes.summaryValue}>
            {formatCurrency(stocksTotal)}
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion square expanded={expanded === 'panel-crypto'}>
        <AccordionSummary
          IconButtonProps={{
            disabled: true,
            edge: 'start',
          }}
        >
          <Typography className={classes.summaryTitle}>Crypto</Typography>
          <Typography className={classes.summaryValue}>
            <Chip color="secondary" label="coming soon" size="small" />
          </Typography>
        </AccordionSummary>
      </Accordion>
    </>
  )
}

export default SavingsSummary
