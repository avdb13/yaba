import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";

type NotificationState = Notification | null;
const initialState: NotificationState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<Notification>) {
      const notification = action.payload;
      return notification;
    },
  }
});

export default notificationSlice.reducer;

export const newNotification = (notification: Notification): AppThunk => {
  return async dispatch => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(setNotification("")), 5000);
  };
};

export const { setNotification } = notificationSlice.actions;
