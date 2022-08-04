import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Stack, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { TYPE } from "../constants";
import { NOTIFICATION_TYPE } from "../../shared/constants";
import { useShowNotification } from "../../shared/hooks";
import { Footer } from "../../shared/ui";
import { CpmActivityForm, PertActivityForm } from "../components";
import { selectCurrentPlanningType } from "../../shared/store/slices/planning/planning.slice";
import { updateActivity, clearIfNew, selectActivities, selectActiveActivity } from "../../shared/store/slices/activity/activity.slice";

export const ActivityEditor = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { showNotification } = useShowNotification();
  const allActivities = useSelector(selectActivities);
  const planningType = useSelector(selectCurrentPlanningType);
  const activeActivity = useSelector(selectActiveActivity);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const goBack = () => {
    dispatch(clearIfNew(activeActivity));
    navigate("/activities");
  };

  const onSubmit = (data) => {
    if (typeof data.predecessor === undefined || data.predecessor.length === 0) {
      showNotification("Debe elegir una actividad predecesora", NOTIFICATION_TYPE.ERROR);
      return;
    }
    if (Object.keys(errors).length > 0) {
      return;
    }
    const activity = { ...activeActivity, ...data };
    dispatch(updateActivity({ ...activity }));
    showNotification("¡Actividad actualizada correctamente!");
    navigate("/activities");
  };

  const handleReset = () => {
    reset(initialValue);
  };

  const FOOTER_BUTTONS = [
    {
      text: "volver",
      icon: "back",
      type: "icon",
      color: "inherit",
      handle: goBack,
      position: "left",
    },
    {
      text: "guardar",
      icon: "save",
      type: "fab",
      color: "error",
      handle: handleSubmit(onSubmit),
      position: "left",
    },
    {
      text: "limpiar",
      icon: "clean",
      type: "icon",
      color: "inherit",
      handle: handleReset,
      position: "right",
    },
  ];

  return (
    <Stack>
      <Box textAlign="center">
        <Typography variant="overline">Modificar una actividad</Typography>
        <Divider />
      </Box>

      <Container maxWidth="sm">
        {planningType === TYPE.CPM ? (
          <CpmActivityForm
            currentActivity={activeActivity}
            activities={allActivities}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <PertActivityForm
            currentActivity={activeActivity}
            activities={allActivities}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        )}
      </Container>

      <Footer buttons={FOOTER_BUTTONS} />
    </Stack>
  );
};
