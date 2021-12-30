import * as React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Chip from '@material-ui/core/Chip'
import CssBaseline from '@material-ui/core/CssBaseline'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

import clsx from 'clsx'
import paths from 'routes/paths'

import AppDrawer, { drawerEnabled, drawerWidth } from './AppDrawer'
import LoggedUser from './LoggedUser'

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  betaChip: {
    marginLeft: theme.spacing(1),
  },
  linkTitle: {
    color: 'inherit',
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
}))

const HeaderBar = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => setOpen(!open)

  return (
    <>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, open && classes.appBarShift)}
        position="absolute"
      >
        <Toolbar className={classes.toolbar}>
          {drawerEnabled && (
            <IconButton
              aria-label="open drawer"
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            noWrap
            className={classes.title}
            color="inherit"
            component="h1"
            variant="h6"
          >
            <Link className={classes.linkTitle} to={paths.MAIN}>
              profly
            </Link>
            <Chip
              className={classes.betaChip}
              color="secondary"
              label="BETA"
              size="small"
            />
          </Typography>

          <LoggedUser />
        </Toolbar>
      </AppBar>

      <AppDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  )
}

export default HeaderBar
