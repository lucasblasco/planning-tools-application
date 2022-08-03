import React from "react";
import { Typography, styled, Stack } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

const Text = styled(Typography)({
  mr: 2,
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
});

export const Logo = ({ variant, hiddenText = false, iconSize = "small" }) => {
  return (
    <Stack direction="row" alignItems="center">
      <TimelineIcon sx={{ mr: 1 }} fontSize={iconSize} />
      <Text variant={variant} noWrap component="a" href="/" sx={{ display: hiddenText ? "none" : "block" }}>
        PLANNING APP
      </Text>
    </Stack>
  );
};
