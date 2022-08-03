import { createSlice } from "@reduxjs/toolkit";
import { includeAllItems } from "../../../../path/helpers";
import { selectActivitiesWithoutSlackNames } from "../activity";

const initialState = {
  links: [],
  paths: [],
};

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    addPath: (state, action) => {
      state.paths = [...action.payload, ...state.paths];
    },
    addLink: (state, action) => {
      state.links = [...action.payload, ...state.links];
    },
    reset: (state) => {
      state.links = [...initialState.links];
      state.paths = [...initialState.paths];
    },
  },
});

export const selectLinks = (state) => state.path.links;
export const selectPaths = (state) => state.path.paths;

export const selectCriticalPaths = (state) =>
  state.path.paths.filter((path) => includeAllItems(path, selectActivitiesWithoutSlackNames(state)));
export const { addPath, addLink, reset } = pathSlice.actions;
