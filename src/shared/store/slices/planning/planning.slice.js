import { createSlice } from "@reduxjs/toolkit";
import { TYPE } from "../../../../activity/constants";
import { selectEndActivity } from "../activity";

const initialState = {
  type: null,
  processed: false,
  isSaving: false,
};

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    chooseType: (state, action) => {
      state.type = action.payload;
    },
    saving: (state, action) => {
      state.isSaving = action.payload;
    },
    setProcessed: (state) => {
      state.processed = true;
    },
    reset: (state) => {
      state.type = initialState.type;
      state.processed = initialState.processed;
      state.isSaving = initialState.isSaving;
    },
  },
});

export const selectCurrentPlanningType = (state) => state.planning.type;

export const selectCurrentPlanningTypeText = (state) => {
  if (state.planning.type === TYPE.CPM) {
    return "CPM";
  }
  if (state.planning.type === TYPE.PERT) {
    return "PERT";
  }
  return "";
};

export const selectIsSaving = (state) => state.planning.isSaving;
export const selectProcessed = (state) => state.planning.processed;
export const selectProyectTotalDuration = (state) => {
  const endActivity = selectEndActivity(state);
  const { earlyFinish } = endActivity;
  return earlyFinish;
};

export const { chooseType, saving, setProcessed, reset } = planningSlice.actions;
