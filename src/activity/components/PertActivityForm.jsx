import React from "react";
import { Box, Stack, TextField, FormControl, FormLabel, FormGroup } from "@mui/material";

import { PredecessorToogle } from "./PredecessorToogle";

export const PertActivityForm = ({ currentActivity, activities, register, errors, setValue }) => {
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
          onFocus={handleFocus}
          helperText={errors.name && "Ingrese la identificación. Por ejemplo: A o B"}
          error={!!errors.name}
        />
        <TextField {...register("description")} label="Descripción" variant="standard" onFocus={handleFocus} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Tiempos</FormLabel>
          <FormGroup>
            <TextField
              {...register("optimistic", { required: true, valueAsNumber: true })}
              label="Optimista"
              variant="standard"
              onFocus={handleFocus}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              helperText={errors.optimistic && "Ingrese el tiempo optimista para la actividad"}
              error={!!errors.optimistic}
            />
            <TextField
              {...register("mostLikely", { required: true, valueAsNumber: true })}
              label="Más probable"
              variant="standard"
              onFocus={handleFocus}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              helperText={errors.mostLikely && "Ingrese el tiempo más probable para la actividad"}
              error={!!errors.mostLikely}
            />
            <TextField
              {...register("pessimistic", { required: true, valueAsNumber: true })}
              label="Pesimista"
              variant="standard"
              onFocus={handleFocus}
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              helperText={errors.pessimistic && "Ingrese el tiempo pesimista para la actividad"}
              error={!!errors.pessimistic}
            />
          </FormGroup>
        </FormControl>
        <PredecessorToogle current={currentActivity} items={activities} onChange={onTogglePredecessors} />
      </Stack>
    </Box>
  );
};
