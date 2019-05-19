import { getStore } from "../Base/Store";

const store = getStore();

export const ActionTypes = {
  SAVE_APP_VERSION: "SAVE_APP_VERSION",
  SAVE_CODEPUSH_VERSION: "SAVE_CODEPUSH_VERSION",
  SAVE_FIREBASE_TOKEN: "SAVE_FIREBASE_TOKEN",
  DELETE_FIREBASE_TOKEN: "DELETE_FIREBASE_TOKEN",
  SET_FIRST_START: "SET_FIRST_START",
  SET_LANGUAGE: "SET_LANGUAGE"
};

/**
 * @param {string} appVersion
 */
function saveAppVersion(appVersion) {
  store.dispatch({
    type: ActionTypes.SAVE_APP_VERSION,
    payload: appVersion
  });
}

/**
 * @param {string} codePushVersion
 */
function saveCodePushVersion(codePushVersion) {
  store.dispatch({
    type: ActionTypes.SAVE_CODEPUSH_VERSION,
    payload: codePushVersion
  });
}

/**
 * @param {string} firebaseToken
 */
function saveFirebaseToken(firebaseToken) {
  store.dispatch({
    type: ActionTypes.SAVE_FIREBASE_TOKEN,
    payload: firebaseToken
  });
}

function deleteFirebaseToken() {
  store.dispatch({ type: ActionTypes.DELETE_FIREBASE_TOKEN });
}

/**
 * @param {boolean} firstStart
 */
function setFirstStart(firstStart) {
  store.dispatch({ type: ActionTypes.SET_FIRST_START, payload: firstStart });
}

function setLanguage(language) {
  store.dispatch({ type: ActionTypes.SET_LANGUAGE, payload: language });
}

export default {
  saveCodePushVersion,
  saveAppVersion,
  saveFirebaseToken,
  deleteFirebaseToken,
  setFirstStart,
  setLanguage
};
