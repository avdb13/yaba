import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
// import notificationReducer from "./notificationReducer";
// import blogReducer from "./blogReducer";
import usersReducer from "./usersReducer";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => configureStore({
    reducer: {
    // notification: notificationReducer,
    // blogs: blogReducer,
        [usersReducer.name]: usersReducer,
    },
    devTools: true,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
