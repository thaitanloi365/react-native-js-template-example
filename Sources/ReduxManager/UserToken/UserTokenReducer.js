import { ActionTypes } from "./UserTokenActions";
/**
 * @param {{ type: keyof typeof ActionTypes; payload: any }} action
 */
const reducer = (state = null, action) => {
  switch (action.type) {
    case "SAVE_USER_TOKEN":
      return { ...state, ...action.payload };
    case "DELETE_USER_TOKEN":
      return null;
    default:
      return state;
  }
};

export default { reducer };
