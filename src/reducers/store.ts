import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogReducer from "./blogReducer";
import usersReducer from "./usersReducer";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  users: usersReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<typeof store>(() => store);
