import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";

import { PredecessorToogle } from "./PredecessorToogle";
import { FormInputText } from "./form/FormInputText";
import { FormInputNumber } from "./form/FormInputNumber";

export const CpmActivityForm = ({ currentActivity, activities, control, setValue }) => {
  const onTogglePredecessors = (predecessorsChoose) => setValue("predecessor", [...predecessorsChoose.predecessor]);

  useEffect(() => {
    if (!!currentActivity.name) {
      setValue("name", currentActivity.name);
      setValue("description", currentActivity.description);
      setValue("duration", currentActivity.duration);
      setValue("predecessor", currentActivity.predecessor);
    }
  }, [currentActivity]);

  return (
    <Box component="form" autoComplete="off">
      <Stack spacing={2} p={4}>
        <FormInputText name="name" label="Identificación" control={control} />
        <FormInputText name="description" label="Descripción" control={control} />
        <FormInputNumber name="duration" label="Duración" control={control} />
        <PredecessorToogle current={currentActivity} items={activities} onChange={onTogglePredecessors} />
      </Stack>
    </Box>
  );
};
