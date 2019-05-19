import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import { middlewares } from "./Middleware";
import { reducer } from "./Reducer";

const store = createStore(
  reducer,
  { appConfiguration: undefined, userStorage: undefined },
  applyMiddleware(...middlewares)
);

export const configStore = () => {
  const persistor = persistStore(store);
  return { store, persistor };
};

/**
 * @return {import("@Models").StoreState}
 */
export function getStore() {
  return store;
}
