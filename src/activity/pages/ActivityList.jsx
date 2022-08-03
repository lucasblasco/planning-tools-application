import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Typography, Container } from "@mui/material";

import { useCalculate } from "../hooks";
import { useConfirmationModalContext, useShowNotification } from "../../shared/hooks";
import { Footer, Toolbar } from "../../shared/ui";
import { NOTIFICATION_TYPE } from "../../shared/constants";
import { ActivityItem } from "../components";
import {
  addNewEmptyActivity,
  selectActivitiesWithoutExtremes,
  setActiveActivity,
  selectActivities,
  addProcessed,
  deleteActivity,
  reset as resetActivities,
} from "./../../shared/store/slices/activity";
import { addLink, addPath, reset as resetPaths } from "../../shared/store/slices/path";
import {
  saving,
  selectCurrentPlanningType,
  selectIsSaving,
  selectProcessed,
  setProcessed,
  reset as resetPlanning,
} from "../../shared/store/slices/planning";

export const ActivityList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { showConfirmation } = useConfirmationModalContext();
  const { showNotification } = useShowNotification();
  const { links, paths, processedActivities, error, onCalculate } = useCalculate();

  const planningType = useSelector(selectCurrentPlanningType);
  const isSaving = useSelector(selectIsSaving);
  const processed = useSelector(selectProcessed);
  const activitiesWithoutInitials = useSelector(selectActivitiesWithoutExtremes);
  const activities = useSelector(selectActivities);

  useEffect(() => {
    if (processed) {
      dispatch(addPath(paths));
      dispatch(addLink(links));
      dispatch(addProcessed(processedActivities));
    }
  }, [processed, links, paths, processedActivities]);

  useEffect(() => {}, [isSaving, processed]);

  const resetApp = () => {
    dispatch(resetActivities());
    dispatch(resetPaths());
    dispatch(resetPlanning());
    showNotification("Se reinició la aplicación");
  };

  const handleChangePlanningType = async () => {
    const result = await showConfirmation("Cambiar tipo de planificación", "Se perderán todos los datos ingresados. ¿Desea continuar?");
    if (result) {
      resetApp();
      navigate("/", { replace: true });
    }
  };

  const goToEditing = () => {
    navigate("/activities/edit");
  };

  const handleClearAll = async () => {
    const result = await showConfirmation("Reiniciar aplicación", "Se perderán todos los datos ingresados. ¿Desea continuar?");
    if (result) {
      resetApp();
    }
  };

  const handleAddNew = () => {
    dispatch(addNewEmptyActivity(planningType));
    goToEditing();
  };

  const handleEdit = (activity) => {
    dispatch(setActiveActivity(activity));
    goToEditing();
  };

  const handleDelete = async (activity) => {
    const result = await showConfirmation("Eliminar actividad", `Se eliminará la aplicación ${activity.name}, ¿Desea continuar?`);
    if (result) {
      dispatch(deleteActivity(activity));
      showNotification("¡La actividad fue eliminada con éxito!");
    }
  };

  const handleCalculate = () => {
    dispatch(saving(true));
    onCalculate(activities);

    if (error) {
      showNotification(error, NOTIFICATION_TYPE.ERROR);
      dispatch(saving(false));
      return;
    }

    dispatch(setProcessed());
    dispatch(saving(false));
  };

  const FOOTER_BUTTONS = [
    {
      text: "cambiar planificación",
      icon: "timeline",
      type: "icon",
      color: "inherit",
      handle: handleChangePlanningType,
      position: "left",
      disabled: isSaving,
    },
    {
      text: "reiniciar",
      icon: "reset",
      type: "icon",
      color: "inherit",
      handle: handleClearAll,
      position: "left",
      disabled: isSaving,
    },
    {
      text: "agregar",
      icon: "add",
      type: "fab",
      color: "error",
      handle: handleAddNew,
      position: "left",
      disabled: isSaving || processed,
    },
    {
      text: "procesar",
      icon: "doneAll",
      type: "icon",
      color: "inherit",
      handle: handleCalculate,
      position: "right",
      disabled: isSaving || processed,
    },
  ];

  return (
    <Stack>
      <Toolbar title="Actividades" nextPage="/diagram" nextPageTitle="Diagrama" />

      <Box overflow="scroll" marginBottom={8}>
        {isSaving ? (
          <Box textAlign="center">
            <Typography variant="overline">Procesando...</Typography>
          </Box>
        ) : !activitiesWithoutInitials ? (
          <Box textAlign="center" mt={3}>
            <Typography variant="subtitle2">No hay actividades</Typography>
          </Box>
        ) : (
          <Container maxWidth="md">
            {activitiesWithoutInitials.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                processed={processed}
                disabled={isSaving || processed}
              />
            ))}
          </Container>
        )}
      </Box>

      <Footer buttons={FOOTER_BUTTONS} />
    </Stack>
  );
};
