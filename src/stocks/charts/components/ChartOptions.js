import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles({
  root: {
    color: '#fff',
  },
})

const ChartOptions = ({ onDownloadClick }) => {
  const classes = useStyles()

  return (
    <Box className={classes.root} display="flex" justifyContent="end">
      <ButtonGroup aria-label="chart options" color="inherit" variant="text">
        <IconButton
          aria-label="download"
          size="small"
          onClick={onDownloadClick}
        >
          <ArrowDownwardIcon fontSize="inherit" />
        </IconButton>
      </ButtonGroup>
    </Box>
  )
}

ChartOptions.propTypes = {
  onDownloadClick: PropTypes.func.isRequired,
}

export default ChartOptions
