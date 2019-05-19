import { ActionTypes } from "./AppConfigurationActions";
/**
 * @param {any} state
 * @param {{ type: keyof typeof ActionTypes; payload: any }} action
 */
const reducer = (state = null, action) => {
  switch (action.type) {
    case "SAVE_CODEPUSH_VERSION":
      return { ...state, codePushVersion: action.payload };
    case "SAVE_APP_VERSION":
      return { ...state, appVersion: action.payload };
    case "SAVE_FIREBASE_TOKEN":
      return { ...state, firebaseToken: action.payload };
    case "DELETE_FIREBASE_TOKEN":
      return { ...state, firebaseToken: null };
    case "SET_FIRST_START":
      return { ...state, firstStart: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default { reducer };
