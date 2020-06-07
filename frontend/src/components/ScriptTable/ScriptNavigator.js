import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'scroll',
    boxShadow: 'none',
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  container: {
    maxHeight: '100%',
  },
  cell: {
    color: '#545b64',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '.65rem',
    fontWeight: 600,
  },
  rowCell: {
    color: '#16191f',
    fontSize: '.6rem',
    padding: '5px',
    margin: '0 0 0 1%',
    fontFamily: 'Helvetica, Arial, sans-serif',
  },
  headRowCell: {
    background: '#fff',
    color: '#16191f',
    fontSize: '.5rem',
    padding: '5px',
    margin: '0 0 0 1%',
    fontFamily: 'Helvetica, Arial, sans-serif',
    top: 37,
  },
  name: {
    width: '100%',
    margin: 0,
    color: '#16191f',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '.5rem',
    padding: '0',
    // margin: '0 0 0 1%',
  },
  title: {
    margin: '5px 0 15px 0',
    color: '#16191f',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '.75rem',
  },
  button: {
    width: '15%',
    margin: '2%',
    backgroundColor: '#ec7211',
    borderColor: '#ec7211',
    color: '#fff',
    borderRadius: '2px',
    border: '1px solid',
    fontWeight: 700,
    display: 'inline-block',
    cursor: 'pointer',
    textTransform: 'capitalize',
    fontSize: '0.75rem',
    fontFamily: ['Helvetica, Arial, sans-serif'].join(','),
    '&:hover': {
      backgroundColor: '#eb5f07',
      borderColor: '#dd6b10',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#eb5f07',
      borderColor: '#dd6b10',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  formGroup: {
    width: '100%',
  },
  pagination: {
    backgroundColor: '#fafafa',
    color: '#545b64',
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '.85rem',
    fontWeight: 600,
  },
  menuButton: {
    marginLeft: '5px',
    marginRight: ['15px'].join(','),
    '&:hover': {
      outline: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  navigation: {
    display: 'inline-flex',
    width: '100%',
  },
});
export default ({ action }) => {
  const classes = useStyles();
  const [recording, setRecording] = useState(false);

  function handleRecord() {
    setRecording(!recording);
    action(`${recording ? 'stop' : 'start'}`);
  }
  return (
    <div className={classes.navigation}>
      <Tooltip title={`${recording ? 'Stop Recording' : 'Start Recording'}`}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          onClick={handleRecord}
          color='inherit'
          aria-label={`${recording ? 'stop record' : 'record'}`}>
          {recording ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title='Previous'>
        <IconButton
          edge='start'
          className={classes.menuButton}
          onClick={() => action('previous')}
          color='inherit'
          aria-label='previous'>
          <ChevronLeft />
        </IconButton>
      </Tooltip>
      <Tooltip title='Next'>
        <IconButton
          edge='start'
          className={classes.menuButton}
          onClick={() => action('next')}
          color='inherit'
          aria-label='next'>
          <ChevronRight />
        </IconButton>
      </Tooltip>
    </div>
  );
};
