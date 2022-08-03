import React from "react";
import { Box, Stack, TextField } from "@mui/material";

import { PredecessorToogle } from "./PredecessorToogle";

export const CpmActivityForm = ({ currentActivity, activities, register, errors, setValue }) => {
  const onTogglePredecessors = (predecessorsChoose) => setValue("predecessor", [...predecessorsChoose.predecessor]);

  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.select();
  };

  return (
    <Box component="form" autoComplete="off">
      <Stack spacing={2} p={4}>
        <TextField
          {...register("name", { required: true, setValueAs: (v) => String(v).toUpperCase() })}
          label="Identificación"
          variant="standard"
          helperText={errors.name && "Ingrese la identificación. Por ejemplo: A o B"}
          error={!!errors.name}
        />
        <TextField {...register("description")} label="Descripción" variant="standard" autoComplete="off" />
        <TextField
          {...register("duration", { required: true, valueAsNumber: true })}
          label="Duración"
          variant="standard"
          onFocus={handleFocus}
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          helperText={errors.duration && "Ingrese la duración para la actividad"}
          error={!!errors.duration}
        />
        <PredecessorToogle current={currentActivity} items={activities} onChange={onTogglePredecessors} />
      </Stack>
    </Box>
  );
};
