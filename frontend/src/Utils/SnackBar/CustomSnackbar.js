import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    width: 'fit-content',
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: '#0073bb'
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  root: {
    width: 'fit-content'
  },
  div: {display: 'inline-flex', width: '100%'}
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, progress, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      classes={{ root: classes[variant], message: classes.message }}
      // className={clsx(classes[variant], className, classes['snackbar'], 'root')}
      aria-describedby='client-snackbar'
      message={
        <div className={classes.div}>
          <span id='client-snackbar' className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
          {progress && progress}
        </div>
      }
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
};

export default ({ type, message, vertical, horizontal, progress }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical ? vertical : 'bottom',
        horizontal: horizontal ? horizontal : 'right'
      }}
      open={open}
      onClose={handleClose}>
      <MySnackbarContentWrapper
        variant={type}
        message={message}
        onClose={handleClose}
        progress={progress}
      />
    </Snackbar>
  );
};
