export const scriptReducer = (state, action) => {
  switch (action.type) {
    case 'importScript':
      state.scripts.push(action.script);
      return {
        ...state,
        scripts: state.scripts,
      };
    case 'clearScript':
      state.scripts.splice(action.cursor, 1)
      return {
        ...state,
        scripts: state.scripts,
      };
    case 'clearScripts':
      return {
        ...state,
        scripts: action.scripts,
      };
    case 'updateScripts':
      return {
        ...state,
        scripts: action.scripts,
      };
    default:
      return state;
  }
};
