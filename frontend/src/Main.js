import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import { ScriptProvider } from './components/Contexts/ScriptContext';
import { scriptReducer } from './components/Contexts/Reducers/ScriptReducer';
export default (...props) => {
  useEffect(() => {}, []);

  return (
    <div>
      <ScriptProvider initialState={{ scripts: [] }} reducer={scriptReducer}>
        <Header />
      </ScriptProvider>
    </div>
  );
};
