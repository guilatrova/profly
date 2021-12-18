import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'

import ErrorHandler from '../../core/components/ApolloErrorHandler'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
}))

const SummaryValueHeader = ({
  data,
  error,
  loading = false,
  operationName,
  title,
}) => {
  const classes = useStyles()

  if (error)
    return <ErrorHandler operation={operationName}>{error}</ErrorHandler>

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="subtitle2">
        {title}
      </Typography>

      {loading ? (
        <Skeleton height={72} variant="text" />
      ) : (
        <Typography variant="h2">{data}</Typography>
      )}
    </Paper>
  )
}

SummaryValueHeader.propTypes = {
  data: PropTypes.string,
  error: PropTypes.any,
  loading: PropTypes.bool,
  operationName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default SummaryValueHeader
