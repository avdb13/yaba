import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationState = Notification | undefined;
const initialState: NotificationState = undefined;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action: PayloadAction<NotificationState>) {
      const notification = action.payload!;
      return notification;
    },
  }
});

export default notificationSlice.reducer;

export const newNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(setNotification("")), timeout);
  };
};

export const notificationOnError = (f, onSuccess, onError) => {
  try {
    f();
    onSuccess();
  } catch(e) {
    onError();
  }
};

export const { setNotification } = notificationSlice.actions;
