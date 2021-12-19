import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme) => ({
  addButton: {
    fontWeight: 'bold',
    textTransform: 'upper',
  },
  closeButton: {
    color: theme.palette.grey[500],
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  drawer: {
    borderRadius: '20px 20px 0 0',
    overflow: 'visible',
    [theme.breakpoints.up('md')]: {
      margin: 'auto',
      maxWidth: '50%',
    },
  },
}))

const FormDrawer = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handlePostSubmit = () => {
    enqueueSnackbar('Transaction successfully added!', { variant: 'success' })
    setOpen(false)
    setTimeout(() => window.location.reload(false), 2000)
  }

  const toggleDrawer = (open) => () => {
    setOpen(open)
  }

  const clonedChildren = React.Children.map(children, function (child) {
    return React.cloneElement(child, { onPostSubmit: handlePostSubmit })
  })

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          className={classes.addButton}
          color="secondary"
          onClick={toggleDrawer(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <Box md={{ margin: 'auto', maxWidth: '50%' }}>
        <Drawer
          anchor="bottom"
          classes={{ paper: classes.drawer }}
          open={open}
          onClose={toggleDrawer(false)}
        >
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={toggleDrawer(false)}
          >
            <CloseIcon />
          </IconButton>

          <div role="presentation">{clonedChildren}</div>
        </Drawer>
      </Box>
    </>
  )
}

FormDrawer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FormDrawer
