import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Emoji from 'common/components/Emoji'
import { walletTransactionPropType } from 'savings/types'

const useStyles = makeStyles({
  root: {
    marginRight: 15,
  },
})

const TransactionAvatar = ({ item }) => {
  const classes = useStyles()
  const emoji = item.value >= 0 ? 'moneybag' : 'money_with_wings'

  return (
    <div className={classes.root}>
      <Emoji emoji={emoji} size={48} />
    </div>
  )
}

TransactionAvatar.propTypes = {
  item: walletTransactionPropType.isRequired,
}

export default TransactionAvatar
