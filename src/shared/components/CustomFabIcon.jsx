import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Fab, Stack, Typography, useMediaQuery } from "@mui/material";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    width: "150px",
  },
}));

export const CustomFabIcon = ({ text, color, onClick, disabled, icon }) => {
  const theme = useTheme();
  const extended = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledFab color={color} aria-label={text} onClick={onClick} disabled={disabled} variant={extended ? "extended" : "circular"}>
      <Stack direction="row" alignItems="center">
        <Typography variant="button" display={{ xs: "none", sm: "block" }}>
          {text}
        </Typography>
        {icon}
      </Stack>
    </StyledFab>
  );
};
