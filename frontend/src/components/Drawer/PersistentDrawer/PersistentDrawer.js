import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NavBarButtons from '../../Header/NavBarButtons';
import TreeMenuActionMenu from '../Actions/TreeMenuActionMenu';
import ScriptTable from '../../ScriptTable/ScriptTable';
import FileImporter from '../Importer/FileImporter';
import ScriptTabController from '../../ScriptTable/ScriptTabController';
import { useScriptState } from '../../Contexts/ScriptContext';
import { fetchImage } from '../../../Utils/ImageSelector';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    borderRight: '1px solid #ddd',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#181614',
    boxShadow: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  heading: {
    padding: '5%',
    color: '#545b64',
    fontWeight: 600,
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '0.85rem',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: 'unset',
  },
  name: {
    position: 'absolute',
    left: 0,
    marginLeft: '5%',
    fontSize: '1.1rem',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontWeight: 600,
  },
  drawerHeader: {
    borderRight: '1px solid #ddd',
    height: '130px',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'sticky',
    top: 0,
    zIndex: 99,
    background: '#fff',
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'sticky',
    top: 0,
    zIndex: 99,
    background: '#fff',
    borderBottom: '1px solid #aab7b8',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: '100vh',
    overflow: 'hidden',
    position: 'sticky',
    // width:'100%',
    // height: `calc(100vh - ${headerHeight}px)`
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  importText: {
    textAlign: 'center',
    color: '#c4c3bf',
    zIndex: 99,
    position: 'absolute',
    right: '50px',
    top: '150px',
  },
  importTextContainer: {
    height: '100%',
    backgroundImage: `url(${fetchImage('tapes')})`,
    width: '100%'
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [{ scripts }] = useScriptState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  return (
    <div id={`sidepanel-${open}`} className={classes.root}>
      <div>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <NavBarButtons />
          </Toolbar>
        </AppBar>
        <Drawer
          variant='persistent'
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor='left'
          open={open}>
          {/* <div tabIndex={0} role='button' className='sideDrawer'> */}
          <div className={classes.drawerHeader}>
            <Typography className={classes.name}>Director Tracker</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <Close /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <div
            style={{
              height: '100%',
              overflow: 'scroll',
              borderBottom: '1px solid #aab7b8',
            }}>
            {/* <TreeMenuMaps /> */}
            <FileImporter />
            <TreeMenuActionMenu />
          </div>
        </Drawer>
      </div>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
        <div className={classes.main} />
        {scripts.length > 0 && (
          <div>
            <ScriptTabController scripts={scripts} />
          </div>
        )}
        {scripts.length === 0 && (
          <div className={classes.importTextContainer}>
            <Typography classes={{ root: classes.importText }}>
              Import a script to get started.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
