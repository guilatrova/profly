import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/GitHub';
import GetAppIcon from '@material-ui/icons/GetApp';
import AppDrawer, { drawerWidth, drawerEnabled } from './AppDrawer';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';
import { DownloadCSV } from '../../utils/downloader';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  betaChip: {
    marginLeft: theme.spacing(1),
  },
  linkTitle: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const HeaderBar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);
  const handleAuthorLink = () =>
    window.open('https://guilatrova.dev', '_blank');
  const handleDownloadCSV = () => DownloadCSV();

  return (
    <>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          {drawerEnabled && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
          )}

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              <Link to="/" className={classes.linkTitle}>
                profly
              </Link>
              <Chip
                className={classes.betaChip}
                size="small"
                label="BETA"
                color="secondary"
              />
          </Typography>

          <IconButton color="inherit" onClick={handleDownloadCSV}>
            <GetAppIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handleAuthorLink}>
            <PersonIcon />
          </IconButton>

          <LoggedUser />
        </Toolbar>
      </AppBar>

      <AppDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default HeaderBar;
