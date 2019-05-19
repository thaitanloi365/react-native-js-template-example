import { Dispatch, Store } from "redux";
export type StoreModel = {
  userToken: UserToken;
  userProfile: UserToken;
};

export type StoreState = Store<StoreModel> & {
  dispatch: Dispatch;
};

export type RouteName = "Start" | "Home" | "Authentication";

export type UserToken = {
  access_token: string;
};

export type UserProfile = {
  name: string;
};
