import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

export default ({
  onSelected,
  options,
  label,
  description,
  width,
  margin,
  multiSelect,
  placeholder,
  group
}) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'grid',
      flexWrap: 'wrap',
      margin: margin,
      width: '100%',
      zIndex: 99,
    },
    label: {
      marginLeft: '0'
    },
    description: {
      marginLeft: '0',
      color: '#687078'
    },
    textfield: {
      width: width,
      border: [0].join(','),
      '& .MuiInput-underline:hover:before': {
        border: 0
      },
      '& .MuiInput-underline:before': {
        border: 0
      },
      '& .MuiInput-underline:after': {
        border: 0
      },
      '& .MuiInput-root': {
        border: '1px solid #aab7b8',
        padding: '0 0 0 2%',
        fontSize: '14px',
        height: '35px'
      }
    },
    paper: {
      color: '#000',
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial, sans-serif',
    }
  }));

  const classes = useStyles();

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: option => option.value
  });

  return (
    <div className={classes.root}>
      <Typography className={classes.label} variant='body2'>
        {label}
      </Typography>
      <Typography className={classes.description} variant='caption'>
        {description}
      </Typography>

      <Autocomplete
        disableClearable
        multiple={multiSelect}
        options={
          group
            ? options.sort((a, b) => -b.group.localeCompare(a.group))
            : options
        }
        getOptionLabel={option => option.label}
        groupBy={group ? option => option.group : undefined}
        onChange={onSelected}
        filterOptions={filterOptions}
        classes={{ paper: classes.paper }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              size='small'
              variant='outlined'
              label={option.label}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={params => (
          <TextField {...params} classes={{ root: classes.textfield }} />
        )}
        defaultValue={placeholder}
      />
    </div>
  );
};
