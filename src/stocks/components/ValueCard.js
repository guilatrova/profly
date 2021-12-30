import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'

import { formatCurrency } from 'utils/money'

const useStyles = makeStyles(() => ({
  root: {},
  value: {
    color: 'black',
  },
}))

const ValueCard = ({
  children = null,
  currency = 'USD',
  icon,
  isMoney = false,
  loading = false,
  title,
}) => {
  const classes = useStyles()
  const displayValue = isMoney
    ? formatCurrency(children || 0, currency)
    : children

  return (
    <Card className={classes.root}>
      <CardContent>
        {icon}

        <Typography component="h3" variant="subtitle2">
          {title}
        </Typography>

        <Typography
          className={classes.value}
          component="h3"
          variant="subtitle2"
        >
          {loading ? <Skeleton /> : displayValue}
        </Typography>
      </CardContent>
    </Card>
  )
}

ValueCard.propTypes = {
  children: PropTypes.number,
  currency: PropTypes.string,
  icon: PropTypes.node,
  isMoney: PropTypes.bool,
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

export default ValueCard
