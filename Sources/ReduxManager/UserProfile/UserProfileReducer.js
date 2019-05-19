import { ActionTypes } from "./UserProfileActions";
/**
 * @param {{ type: keyof typeof ActionTypes; payload: any }} action
 */
const reducer = (state = null, action) => {
  switch (action.type) {
    case "SAVE_USER_PROFILE":
      return { ...state, ...action.payload };
    case "DELETE_USER_PROFILE":
      return null;
    default:
      return state;
  }
};

export default { reducer };
