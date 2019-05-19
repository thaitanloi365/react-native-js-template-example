import { getStore } from "../Base/Store";

export const ActionTypes = {
  SAVE_USER_TOKEN: "SAVE_USER_TOKEN",
  DELETE_USER_TOKEN: "DELETE_USER_TOKEN"
};

const store = getStore();

/**
 *
 * @param {import("@Models").UserToken} userToken
 */
function saveUserToken(userToken) {
  store.dispatch({
    type: ActionTypes.SAVE_USER_TOKEN,
    payload: userToken
  });
}

function deleteUserToken() {
  store.dispatch({ type: ActionTypes.DELETE_USER_TOKEN });
}

export default {
  saveUserToken,
  deleteUserToken
};
