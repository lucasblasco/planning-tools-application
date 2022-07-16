import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adjacencyList: [],
  paths: [],
};

export const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    addPath: (state, action) => {
      state.paths = [...action.payload, ...state.paths];
    },
    addAdjacencyList: (state, action) => {
      state.adjacencyList = [...action.payload];
    },
    resetAll: (state, action) => {
      state.adjacencyList = initialState.adjacencyList;
      state.paths = initialState.paths;
    },
  },
});

export const { addPath, addAdjacencyList, resetAll } = pathSlice.actions;
