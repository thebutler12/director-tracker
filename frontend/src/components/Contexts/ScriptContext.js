import React, {createContext, useContext, useReducer} from 'react';

export const ScriptContext = createContext();
export const ScriptProvider = ({reducer, initialState, children}) =>(
  <ScriptContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ScriptContext.Provider>
);
export const useScriptState = () => useContext(ScriptContext);