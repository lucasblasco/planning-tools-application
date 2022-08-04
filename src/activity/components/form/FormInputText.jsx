import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export const FormInputText = ({ name, control, label }) => {
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          label={label}
          error={!!error}
          onChange={onChange}
          onFocus={handleFocus}
          value={value}
          fullWidth
          variant="standard"
        />
      )}
    />
  );
};
