import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentPlanningTypeText } from "../store/slices/planning";
import { AlertContextProvider, ConfirmationModalContextProvider } from "../store/context";
import { Layout } from "../ui";
import { ActivityEditor, ActivityList } from "../../activity/pages";
import { GraphScreen, ResultScreen } from "../../path/pages";
import { PlanningTypeSelection } from "../pages/PlanningTypeSelection";
import { ValidateRoute } from "./ValidateRoute";

export const AppRouter = () => {
  const currentPlanningTypeText = useSelector(selectCurrentPlanningTypeText);

  return (
    <BrowserRouter>
      <ConfirmationModalContextProvider>
        <Layout currentPlanning={currentPlanningTypeText}>
          <AlertContextProvider>
            <Routes>
              <Route
                path="/activities"
                element={
                  <ValidateRoute type={currentPlanningTypeText}>
                    <ActivityList />
                  </ValidateRoute>
                }
              />
              <Route
                path="/activities/edit"
                element={
                  <ValidateRoute type={currentPlanningTypeText}>
                    <ActivityEditor />
                  </ValidateRoute>
                }
              />
              <Route
                path="/diagram"
                element={
                  <ValidateRoute type={currentPlanningTypeText}>
                    <GraphScreen />
                  </ValidateRoute>
                }
              />
              <Route
                path="/paths"
                element={
                  <ValidateRoute type={currentPlanningTypeText}>
                    <ResultScreen />
                  </ValidateRoute>
                }
              />

              <Route path="/*" element={<PlanningTypeSelection />} />
            </Routes>
          </AlertContextProvider>
        </Layout>
      </ConfirmationModalContextProvider>
    </BrowserRouter>
  );
};
