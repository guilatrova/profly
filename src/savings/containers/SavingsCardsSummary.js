import React from 'react'
import { Link } from 'react-router-dom'

import { Box } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BitcoinIcon from 'assets/bitcoin.svg'
import StocksIcon from 'assets/stocks.svg'
import WalletIcon from 'assets/wallet.svg'

import { useQuery } from '@apollo/client'
import ErrorHandler from 'core/components/ApolloErrorHandler'
import paths from 'routes/paths'
import savingsQueries from 'savings/queries'
import stocksQueries from 'stocks/queries'
import { formatCurrency } from 'utils/money'

const useStyles = makeStyles((theme) => ({
  card: {
    marginRight: theme.spacing(2),
    width: 160,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
  media: {
    height: 100,
    textAlign: 'center',
  },
  mediaImage: {
    margin: 'auto',
    paddingTop: 20,
    width: 90,
  },
  soonChip: {
    fontWeight: 'bold',
  },
  summaryTitle: {
    flexBasis: '25%',
  },
  summaryValue: {
    flexShrink: 0,
    fontWeight: '700',
  },
}))

const CategorySummaryCard = ({
  children,
  disabled,
  redirect = '',
  src,
  title,
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Link className={classes.link} disabled={disabled} to={redirect}>
        <CardActionArea disabled={disabled}>
          <CardMedia className={classes.media} title={title}>
            <img className={classes.mediaImage} src={src} />
          </CardMedia>

          <CardContent>
            <Typography gutterBottom component="h2" variant="h5">
              {children}
            </Typography>
            <Typography color="textSecondary" component="p" variant="body2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}

const SavingsSummary = () => {
  const classes = useStyles()
  const { error, data = [] } = useQuery(stocksQueries.chartStocksValues)
  const { data: walletData, error: walletError } = useQuery(
    savingsQueries.defaultWallet
  )

  if (error)
    return <ErrorHandler operation="portfolio summary">{error}</ErrorHandler>
  if (walletError)
    return <ErrorHandler operation="wallet summary">{walletError}</ErrorHandler>

  const chartData = data?.stocks || []
  const walletTotal = walletData?.wallet?.value || 0
  // TODO: Consider different currencies
  const stocksTotal = chartData.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <Box display="flex">
      <CategorySummaryCard
        redirect={paths.SAVINGS_DASHBOARD}
        src={WalletIcon}
        title="Savings"
      >
        {formatCurrency(walletTotal)}
      </CategorySummaryCard>

      <CategorySummaryCard
        redirect={paths.STOCKS_DASHBOARD}
        src={StocksIcon}
        title="Stocks"
      >
        {formatCurrency(stocksTotal)}
      </CategorySummaryCard>

      <CategorySummaryCard disabled src={BitcoinIcon} title="Crypto">
        <Chip
          className={classes.soonChip}
          color="secondary"
          label="coming soon"
          size="small"
        />
      </CategorySummaryCard>
    </Box>
  )
}

export default SavingsSummary
