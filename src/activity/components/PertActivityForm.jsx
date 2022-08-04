import React, { useEffect } from "react";
import { Box, Stack, FormControl, FormLabel, FormGroup } from "@mui/material";

import { FormInputText } from "./form/FormInputText";
import { FormInputNumber } from "./form/FormInputNumber";
import { PredecessorToogle } from "./PredecessorToogle";

export const PertActivityForm = ({ currentActivity, activities, control, setValue }) => {
  const onTogglePredecessors = (predecessorsChoose) => setValue("predecessor", [...predecessorsChoose.predecessor]);

  useEffect(() => {
    if (!!currentActivity.name) {
      setValue("name", currentActivity.name);
      setValue("description", currentActivity.description);
      setValue("optimistic", currentActivity.optimistic);
      setValue("mostLikely", currentActivity.mostLikely);
      setValue("pessimistic", currentActivity.pessimistic);
      setValue("predecessor", currentActivity.predecessor);
    }
  }, [currentActivity]);

  return (
    <Box component="form" autoComplete="off">
      <Stack spacing={2} p={4}>
        <FormInputText name="name" label="Identificación" control={control} />
        <FormInputText name="description" label="Descripción" control={control} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Tiempos</FormLabel>
          <FormGroup>
            <FormInputNumber name="optimistic" label="Optimista" control={control} />
            <FormInputNumber name="mostLikely" label="Más probable" control={control} />
            <FormInputNumber name="pessimistic" label="Pesimista" control={control} />
          </FormGroup>
        </FormControl>
        <PredecessorToogle current={currentActivity} items={activities} onChange={onTogglePredecessors} />
      </Stack>
    </Box>
  );
};
