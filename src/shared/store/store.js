import { configureStore } from "@reduxjs/toolkit";
import { activitySlice } from "./slices/activity";
import { pathSlice } from "./slices/path";

export const store = configureStore({
  reducer: {
    activity: activitySlice.reducer,
    path: pathSlice.reducer,
  },
});
