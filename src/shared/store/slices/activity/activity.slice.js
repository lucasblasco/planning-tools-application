import { createSlice } from "@reduxjs/toolkit";
import { TYPE } from "../../../../activity/constants";
import { EXTREME } from "../../../../path/constants";
import { createUUID } from "../../../helpers";

const initialState = {
  entities: [
    {
      id: createUUID(),
      name: EXTREME.INIT,
      description: null,
      predecessor: [],
      duration: 0,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
    },
    {
      id: createUUID(),
      name: EXTREME.END,
      description: null,
      predecessor: [],
      duration: 0,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
    },
  ],
  active: null,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.entities = action.payload;
    },
    addNewEmptyActivity: (state, action) => {
      const newActivity = {
        id: createUUID(),
        type: action.payload,
      };
      state.entities = [newActivity, ...state.entities];
      state.active = newActivity;
    },
    setActiveActivity: (state, action) => {
      state.active = action.payload;
    },
    updateActivity: (state, action) => {
      const current = action.payload;
      if (current.type === TYPE.PERT) {
        const mean = (+current.optimistic + 4 * +current.mostLikely + +current.pessimistic) / 6;
        current.duration = Math.round(mean * 100) / 100;
        const variance = ((+current.pessimistic - +current.optimistic) / 6) ** 2;
        current.variance = Math.round(variance * 100) / 100;
      }
      state.entities = state.entities.map((activity) => (activity.id === current.id ? current : activity));
    },
    clearIfNew: (state, action) => {
      if (action.payload.name === "") {
        state.entities = state.entities.filter((activity) => activity.id !== action.payload.id);
        state.active = null;
      }
    },
    deleteActivity: (state, action) => {
      state.entities = state.entities.filter((activity) => activity.id !== action.payload.id);
    },
    addProcessed: (state, action) => {
      const processedActivities = action.payload;
      processedActivities.forEach((processed) => {
        state.entities = state.entities.map((activity) => (activity.id === processed.id ? processed : activity));
      });
    },
    reset: (state) => {
      state.entities = [...initialState.entities];
      state.active = initialState.active;
    },
  },
});

export const selectActivities = (state) => state.activity.entities;

export const selectActivitiesWithoutExtremes = (state) =>
  state.activity.entities.filter((activity) => activity.name !== EXTREME.INIT && activity.name !== EXTREME.END);

export const selectActiveActivity = (state) => state.activity.active;

export const selectActivitiesWithoutSlackNames = (state) =>
  state.activity.entities.filter((activity) => activity.slack === 0).map((activity) => activity.name);

export const selectEndActivity = (state) => state.activity.entities.filter((activity) => activity.name === EXTREME.END)[0];

export const { setActivities, addNewEmptyActivity, setActiveActivity, updateActivity, clearIfNew, deleteActivity, addProcessed, reset } =
  activitySlice.actions;
