import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import StockLink from 'core/components/StockLink'
import { useSnackbar } from 'notistack'
import { formatDateTimeOutput } from 'utils/dates'
import { formatCurrency } from 'utils/money'

import queries from '../../queries'
import { transactionPropType } from '../../types'
import Actions from './Actions'
import TransactionAvatar from './TransactionAvatar'

const useStyles = makeStyles({
  card: {
    '&:before': {
      borderBottom: '1px solid #dadada',
      bottom: 0,
      content: '""',
      display: 'block',
      left: '70px',
      position: 'absolute',
      right: '28px',
    },
    '&:hover': {
      background: '#eaeaea',
    },
    background: 'inherit',
    cursor: 'pointer',
    padding: '10px 0',
    position: 'relative',
  },
  cardAvatar: {
    marginRight: 15,
  },
  cardHeader: {
    paddingLeft: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 900,
  },
})

const unitsToDisplay = (row) =>
  row.units >= 0 ? `x${row.units}` : `x${row.units * -1}`
const resolveToTicker = (row) => row.stock.ticker
const resolveToStrikePrice = (row) =>
  formatCurrency(row.strikePrice, row.stock.currency)
const resolveToUnits = (row) =>
  `${unitsToDisplay(row)} on ${formatDateTimeOutput(row.performedAt)}`

const RESOLVER_MAP = {
  ALL: {
    resolveSubheader: resolveToUnits,
    resolveTitle: resolveToTicker,
  },
  STOCK: {
    resolveSubheader: resolveToStrikePrice,
    resolveTitle: resolveToUnits,
  },
}

const TransactionCard = ({ mode = 'ALL', row }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [deleteMutation] = useMutation(queries.deleteTransaction, {
    variables: { id: row.id },
  })
  const handleDelete = () => {
    deleteMutation()
    enqueueSnackbar('Transaction deleted successfully', { variant: 'success' })
    setTimeout(() => window.location.reload(false), 2000)
  }
  const resolver = RESOLVER_MAP[mode]

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        action={
          <div>
            <span className={clsx(classes.headerTitle)}>
              {formatCurrency(row.value, row.stock.currency)}
            </span>
            <Actions onDelete={handleDelete} />
          </div>
        }
        avatar={
          <StockLink ticker={row.stock.ticker}>
            <TransactionAvatar item={row} />
          </StockLink>
        }
        className={classes.cardHeader}
        subheader={resolver.resolveSubheader(row)}
        title={
          <Typography className={classes.headerTitle}>
            {resolver.resolveTitle(row)}
          </Typography>
        }
      />
    </Card>
  )
}

TransactionCard.propTypes = {
  mode: PropTypes.oneOf(['ALL', 'STOCK']),
  row: transactionPropType.isRequired,
}

export default TransactionCard
