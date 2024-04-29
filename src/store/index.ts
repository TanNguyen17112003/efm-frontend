import { API } from "src/services/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { UserReducers } from "./reducers/user";
import { activitiesReducer } from "./reducers/activities"
import { goalsReducer } from "./reducers/goals";
import { challengesReducer } from "./reducers/challenges";
import { logout } from "./reducers/user";

const reducers = combineReducers({
  api: API.reducer,
  user: UserReducers,
  activity: activitiesReducer,
  goal: goalsReducer,
  challenge: challengesReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(API.middleware);
    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch