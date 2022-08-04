import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const FormInputNumber = ({ name, control, label }) => {
  const handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    target.focus();
    target.select();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          helperText={error ? error.message : null}
          abel={label}
          error={!!error}
          onChange={onChange}
          onFocus={handleFocus}
          value={value}
          fullWidth
          variant="standard"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      )}
    />
  );
};
