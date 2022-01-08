import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useMutation } from '@apollo/client'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import queries from 'savings/queries'
import { walletTransactionPropType } from 'savings/types'
import { formatDateTimeOutput } from 'utils/dates'
import { formatCurrency } from 'utils/money'

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

const TransactionCard = ({ item }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [deleteMutation] = useMutation(queries.deleteTransaction, {
    refetchQueries: queries.REFETCH_WHEN_CHANGE,
    variables: { id: item.id },
  })
  const handleDelete = () => {
    deleteMutation()
    enqueueSnackbar('Transaction deleted successfully', { variant: 'success' })
  }
  const title = item.value >= 0 ? 'Deposit' : 'Withdrawal'
  const dateOut = formatDateTimeOutput(item.performedAt)

  return (
    <Card className={classes.card} elevation={0}>
      <CardHeader
        action={
          <div>
            <span className={clsx(classes.headerTitle)}>
              {formatCurrency(item.value, item.wallet.currency)}
            </span>
            <Actions onDelete={handleDelete} />
          </div>
        }
        avatar={<TransactionAvatar item={item} />}
        className={classes.cardHeader}
        subheader={item.notes}
        title={
          <Typography className={classes.headerTitle}>
            {title} on {dateOut}
          </Typography>
        }
      />
    </Card>
  )
}

TransactionCard.propTypes = {
  item: walletTransactionPropType.isRequired,
}

export default TransactionCard
