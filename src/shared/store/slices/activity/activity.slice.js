import { createSlice } from "@reduxjs/toolkit";
import { TYPE } from "../../../../activity/constants";
import { extreme } from "../../../../path/constants";

const initialState = {
  type: TYPE.CPM,
  activities: [
    {
      id: 1,
      name: extreme.INIT,
      description: null,
      predecessor: [],
      duration: 0,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
      variance: 0,
      earlyStart: 0,
      lateStart: 0,
      earlyFinish: 0,
      lateFinish: 0,
      freeFloat: 0,
    },
    {
      id: 2,
      name: extreme.END,
      description: null,
      predecessor: [],
      duration: 0,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
      variance: 0,
      earlyStart: 0,
      lateStart: 0,
      earlyFinish: 0,
      lateFinish: 0,
      freeFloat: 0,
    },
  ],
  processed: false,
  total: 0,
  loading: false,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setActivities: (state, action) => {
      state.activities = [...action.payload];
    },
    editMode: (state, action) => {
      state.activities = state.activities.map((row) => (row.id === action.payload ? { ...row, isEditMode: !row.isEditMode } : row));
    },
    addActivity: (state, action) => {
      state.activities = [action.payload, ...state.activities];
    },
    updateActivity: (state, action) => {
      state.activities = state.activities.map((activity) => (activity.id === action.payload.id ? action.payload : activity));
    },
    deleteActivity: (state, action) => {
      state.activities = state.activities.filter((activity) => activity.id !== action.payload);
    },
    addProcessed: (state, action) => {
      const processedActivities = action.payload;
      processedActivities.forEach((processed) => {
        state.activities = state.activities.map((activity) => (activity.id === processed.id ? processed : activity));
      });
      state.processed = true;
      state.loading = false;
    },
    startLoading: (state, action) => {
      state.loading = true;
    },
    stopLoading: (state, action) => {
      state.loading = false;
    },
    resetAll: (state, action) => {
      state.activities = [...initialState.activities];
      state.loading = initialState.loading;
      state.processed = initialState.processed;
    },
    calculateEstimatedDurationAndVariance: (state, action) => {
      state.activities = state.activities.map((activity) => {
        if (activity.id === action.payload) {
          const newVal = {
            ...activity,
            duration: (+activity.optimistic + 4 * +activity.mostLikely + +activity.pessimistic) / 6,
            variance: ((+activity.pessimistic - +activity.optimistic) / 6) ** 2,
          };
          return newVal;
        }

        return activity;
      });
      //   activity.id === action.payload.id
      //     ? {
      //         ...activity,
      //         duration: (+activity.optimistic + 4 * +activity.mostLikely + +activity.pessimistic) / 6,
      //         variance: ((+activity.pessimistic - +activity.optimistic) / 6) ** 2,
      //       }
      //     : activity
      // );
    },
  },
});

export const {
  addActivity,
  updateActivity,
  deleteActivity,
  editMode,
  addProcessed,
  startLoading,
  stopLoading,
  resetAll,
  setActivities,
  setType,
  calculateEstimatedDurationAndVariance,
} = activitySlice.actions;
