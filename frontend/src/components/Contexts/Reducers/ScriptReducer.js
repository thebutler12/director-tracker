import { CardActions } from "@material-ui/core";

export const scriptReducer = (state, action) => {
  switch (action.type) {
    case 'importScripts':
      console.dir(action.scripts)
      return {
        ...state,
        scripts: action.scripts,
      };
    case 'clearScripts':
      return {
        ...state,
        scripts: [],
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
