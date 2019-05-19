import { combineReducers } from "redux";
import UserTokenReducer from "../UserToken/UserTokenReducer";
import AppConfigurationReducer from "../AppConfiguration/AppConfigurationReducer";

export const reducer = combineReducers({
  userStorage: UserTokenReducer.reducer,
  appConfiguration: AppConfigurationReducer.reducer
});
