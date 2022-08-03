import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Divider, Stack, Container, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { Footer } from "../../shared/ui";
import { CpmActivityForm, PertActivityForm } from "../components";
import { useShowNotification } from "../../shared/hooks";
import { TYPE } from "../constants";
import { selectCurrentPlanningType } from "../../shared/store/slices/planning/planning.slice";
import { updateActivity, clearIfNew, selectActivities, selectActiveActivity } from "../../shared/store/slices/activity/activity.slice";
import { NOTIFICATION_TYPE } from "../../shared/constants";

export const ActivityEditor = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { showNotification } = useShowNotification();
  const allActivities = useSelector(selectActivities);
  const planningType = useSelector(selectCurrentPlanningType);
  const activeActivity = useSelector(selectActiveActivity);
  const {
    register,
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
            register={register}
            errors={errors}
            setValue={setValue}
          />
        ) : (
          <PertActivityForm
            currentActivity={activeActivity}
            activities={allActivities}
            register={register}
            errors={errors}
            setValue={setValue}
          />
        )}
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} p={4}>
            <TextField
              {...register("name", { required: true })}
              label="Identificación"
              variant="standard"
              autoComplete="off"
              required
              helperText={errors.name && "Ingrese la identificación. Por ejemplo: A o B"}
              error={errors.name}
            />

            <TextField {...register("description", { required: true })} label="Descripción" variant="standard" autoComplete="off" />
            <Typography variant="caption">Tiempos</Typography>
            {planningType === TYPE.CPM ? (
              <TextField
                {...register("duration", { required: true })}
                label="Duración"
                variant="standard"
                onFocus={handleFocus}
                type="number"
                helperText={errors.duration && "Ingrese la duración para la actividad"}
                error={errors.duration}
              />
            ) : (
              <>
                <TextField
                {...register("duration", { required: true })}
                  name="optimistic"
                  label="Optimista"
                  variant="standard"
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  value={optimistic}
                  type="number"
                  required
                  helperText={errors && errors.optimistic && errors.optimistic.required && "Ingrese el tiempo optimista para la actividad"}
                  error={errors && errors.optimistic}
                />
                <TextField
                {...register("duration", { required: true })}
                  name="mostLikely"
                  label="Más probable"
                  variant="standard"
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  value={mostLikely}
                  type="number"
                  required
                  helperText={
                    errors && errors.mostLikely && errors.mostLikely.required && "Ingrese el tiempo más probable para la actividad"
                  }
                  error={errors && errors.mostLikely}
                />
                <TextField
                {...register("duration", { required: true })}
                  name="pessimistic"
                  label="Pesimista"
                  variant="standard"
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  value={pessimistic}
                  type="number"
                  required
                  helperText={
                    errors && errors.pessimistic && errors.pessimistic.required && "Ingrese el tiempo pesimista para la actividad"
                  }
                  error={errors && errors.pessimistic}
                />
              </>
            )}
            <PredecessorToogle current={activeActivity} items={allActivities} onChange={onTogglePredecessors} />
          </Stack>
        </form> */}
      </Container>

      <Footer buttons={FOOTER_BUTTONS} />
    </Stack>
  );
};
