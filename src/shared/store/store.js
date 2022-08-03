import { configureStore } from "@reduxjs/toolkit";
import { activitySlice } from "./slices/activity";
import { pathSlice } from "./slices/path";
import { planningSlice } from "./slices/planning";
import { loadState, saveState } from "./helpers";
import throttle from "lodash/throttle";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    activity: activitySlice.reducer,
    path: pathSlice.reducer,
    planning: planningSlice.reducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  //the throttle wrapper function that prevents call many times a wrapped function and only call this each 1000 ms
  throttle(() => {
    saveState({ activity: store.getState().activity, planning: store.getState().planning, path: store.getState().path });
  }),
  1000
);
