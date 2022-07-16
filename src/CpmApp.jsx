import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Stack, Box, Alert } from "@mui/material";

import { ActivityTable } from "./activity/components";
import { ConfirmDialog, Footer, Header } from "./shared/components";
import { PathList, Graph } from "./path/components";

import { includeAllItems, createGraph, calculateForwardPass, searchAllPaths, calculateEndPredecessor } from "./path/helpers";
import { isValidPredecessorActivities, loadFromLocalStorage } from "./activity/helpers";
import { addPath, addAdjacencyList, resetAll as resetAllPath } from "./shared/store/slices/path/path.slice";
import {
  addProcessed,
  startLoading,
  resetAll as resetAllActivities,
  stopLoading,
  setActivities,
  updateActivity,
  setType,
} from "./shared/store/slices/activity/activity.slice";
import { clearLocalStorage } from "./activity/helpers/storeActivities";
import { extreme } from "./path/constants";

export const CpmApp = () => {
  const dispatch = useDispatch();
  const { paths, adjacencyList } = useSelector((state) => state.path);
  const { activities, loading, processed, type } = useSelector((state) => state.activity);
  const [openDialog, setOpenDialog] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const storedActivities = loadFromLocalStorage();
    if (storedActivities.length > 0) {
      dispatch(setActivities(storedActivities));
    }
  }, []);

  const freeFloatActivities = processed && activities.filter((activity) => activity.freeFloat === 0).map((activity) => activity.name);
  const criticalPaths = processed && paths.filter((path) => includeAllItems(path, freeFloatActivities));

  const changeMenu = (type) => {
    dispatch(setType(type));
  };

  const handleCalculate = () => {
    dispatch(startLoading());
    if (step === 0) {
      if (!isValidPredecessorActivities(activities)) {
        dispatch(stopLoading());
        <Alert variant="outlined" severity="error">
          Existe una/s actividad predecesora que no es válida.
        </Alert>;
        return;
      }
      const edges = createGraph(activities);
      const searchedPaths = searchAllPaths(edges);
      const endPredecessors = calculateEndPredecessor(searchedPaths);
      dispatch(addPath(searchedPaths));
      dispatch(addAdjacencyList(edges));
      dispatch(updateActivity({ ...activities.find((act) => act.name === extreme.END), ["predecessor"]: endPredecessors }));
      setStep(1);
    }
    if (step === 1) {
      dispatch(addProcessed(calculateForwardPass(adjacencyList, activities)));
      setStep(2);
    }
    dispatch(stopLoading());
  };

  const handleClearAll = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseConfirm = () => {
    dispatch(resetAllActivities());
    dispatch(resetAllPath());
    clearLocalStorage();
    setOpenDialog(false);
    setStep(0);
  };

  if (loading) {
    return <h1>loading ....</h1>;
  }

  return (
    <Stack bgcolor={"background.default"} color={"text.primary"}>
      <Header changeMenu={changeMenu} />
      <Stack direction="row" px={{ xs: 2, md: 4 }} justifyContent="space-between">
        <ActivityTable />
        {processed && (
          <Stack flex="1">
            <Box bgcolor="secondary">
              <Graph allPaths={paths} activities={activities} links={adjacencyList} />
            </Box>

            <PathList paths={criticalPaths} title={"Caminos críticos"} />
            <PathList paths={paths} title={"Posibles caminos"} />
          </Stack>
        )}
      </Stack>
      <Footer step={step} handleCalculate={handleCalculate} handleClearAll={handleClearAll} />
      <ConfirmDialog openDialog={openDialog} handleClose={handleCloseDialog} handleConfirm={handleCloseConfirm} />
    </Stack>
  );
};
