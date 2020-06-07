import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import RootRef from '@material-ui/core/RootRef';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import XLSX from 'xlsx';
import { useScriptState } from '../../Contexts/ScriptContext';

export default ({}) => {
  const [{}, importScript] = useScriptState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.error('file reading was aborted');
      reader.onerror = () => console.error('file reading has failed');
      reader.onload = () => {
        const script = XLSX.read(new Uint8Array(reader.result), {
          type: 'array',
        });
        const ws = script.Sheets[script.SheetNames[0]];
        importScript({
          type: 'importScript',
          script: {
            sheet: script.SheetNames[0],
            rows: XLSX.utils.sheet_to_json(ws, { header: 2, raw: true }),
          },
        });
      };
      reader.readAsArrayBuffer(file);
    });
    acceptedFiles = [];
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { ref, ...rootProps } = getRootProps();

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      textAlign: 'center',
      border: '2px dashed #fafafa',
      boxShadow: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
    text: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontSize: '0.75rem',
      padding: '20px',
      color: '#AAB7B8',
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <RootRef rootRef={ref}>
        <Paper className={classes.root} {...rootProps}>
          <input {...getInputProps()} />
          <Typography className={classes.text}>
            Drop script files here, or click to select files from your computer
          </Typography>
        </Paper>
      </RootRef>
    </div>
  );
};
