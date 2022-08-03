import React from "react";
import { IconButton, Button, useMediaQuery, useTheme } from "@mui/material";

export const CustomIconButton = ({ text, color, onClick, disabled, icon, position = "left" }) => {
  const theme = useTheme();
  const showTextButton = useMediaQuery(theme.breakpoints.up("md"));
  const isLeft = position === "left";

  return (
    <>
      {showTextButton ? (
        <Button
          color={color}
          aria-label={text}
          onClick={onClick}
          disabled={disabled}
          variant="text"
          startIcon={isLeft && icon}
          endIcon={!isLeft && icon}
        >
          {text}
        </Button>
      ) : (
        <IconButton color={color} aria-label={text} onClick={onClick} disabled={disabled}>
          {icon}
        </IconButton>
      )}
    </>
  );
};
