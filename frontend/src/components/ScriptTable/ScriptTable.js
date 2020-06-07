import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ScriptNavigator from './ScriptNavigator';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { useScriptState } from '../Contexts/ScriptContext';
var words = require('lodash.words');

function createData(
  fileId,
  character,
  script,
  directions,
  finalFilename,
  recordStatus,
  recordAs,
  recordDate,
  wordCount,
  notes
) {
  return {
    fileId,
    character,
    script,
    directions,
    finalFilename,
    recordStatus,
    recordAs,
    recordDate,
    wordCount,
    notes,
  };
}

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
  textfield: {
    width: '100%',
    fontStyle: 'italic',
    padding: '0 5px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    border: ['1px solid #aab7b8'].join(','),
    '& .MuiInput-underline:hover:before': {
      border: 0,
    },
    '& .MuiInput-underline:before': {
      border: 0,
    },
    '& .MuiInput-underline:after': {
      border: 0,
    },
    '& .MuiInput-root': {
      fontSize: '0.75rem',
    },
    '& .Mui-focused': {
      fontStyle: 'normal',
    },
  },
  close: {
    color: '#d13212',
  },
  tick: {
    color: '#1d8102',
  },
});

export default ({ script }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [render, setRender] = useState(false);

  const columns = [
    {
      id: 'fileId',
      label: 'ID',
      minWidth: 50,
      align: 'center',
    },
    {
      id: 'character',
      label: 'Character',
      minWidth: 50,
      align: 'left',
    },
    {
      id: 'script',
      label: 'Script',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'directions',
      label: 'Directions',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'finalFilename',
      label: 'Final Filename',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'recordStatus',
      label: 'Recorded',
      minWidth: 10,
      align: 'center',
      format: (value) =>
        value ? (
          <DoneIcon className={classes.tick} />
        ) : (
          <CloseIcon className={classes.close} />
        ),
    },
    {
      id: 'recordAs',
      label: 'Record As',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'recordDate',
      label: 'Recorded On',
      minWidth: 100,
      align: 'left',
      format: (value) => (value ? value.toISOString() : 'N/A'),
    },
    {
      id: 'wordCount',
      label: 'Count',
      minWidth: 10,
      align: 'left',
    },
    {
      id: 'notes',
      label: 'Notes',
      minWidth: 100,
      align: 'left',
    },
  ];

  useEffect(() => {}, []);

  const getRows = () => {
    return script.rows.map((row) =>
      createData(
        row.fileId,
        row.character,
        row.script,
        row.directions,
        row.finalFilename,
        row.recordStatus,
        row.recordAs,
        row.recordDate,
        words(row.script).length,
        row.notes
      )
    );
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  function handleAction(action) {
    console.dir(action);
    switch (action) {
      case 'start':
        script.rows[cursor].recordDate = new Date();
        script.rows[cursor].recordStatus = true;
        setRender(!render);
        return;
      case 'stop':
        return;
      case 'next':
        let next = cursor < script.rows.length - 1 ? cursor + 1 : cursor;
        setCursor(next);
        return;
      case 'previous':
        let previous = cursor > 0 ? cursor - 1 : cursor;
        setCursor(previous);
        return;
      default:
        return;
    }
  }

  return (
    <div style={{  width: '100%', height: '100%' }}>
      <ScriptNavigator action={handleAction} />
      <Paper className={classes.root}>
        {/* <TablePagination
            classes={{ root: classes.pagination }}
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={getRows().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table' size='small'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    classes={{ root: classes.cell }}
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getRows()
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover={false}
                      role='checkbox'
                      tabIndex={-1}
                      key={index}
                      style={{
                        height: '25px',
                        padding: 0,
                        backgroundColor: `${
                          index === cursor ? '#eeeeee' : '#fafafa'
                        }`,
                      }}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            classes={{ root: classes.rowCell }}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
