import React from "react";
import PropTypes from "prop-types";
import { AppBar, Stack, Typography, MenuItem, styled } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";
import { TYPE } from "../../activity/constants";

const StyledAppBar = styled(AppBar)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
});

export const Header = ({ changeMenu }) => {
  return (
    <StyledAppBar position="sticky">
      <Typography variant="h6" color="secondary" sx={{ display: { xs: "none", sm: "block" } }}>
        Administración de proyectos
      </Typography>
      <TimelineIcon sx={{ display: { xs: "block", sm: "none" } }} />
      <Stack direction="row">
        <MenuItem onClick={() => changeMenu(TYPE.CPM)}>
          <Typography textAlign="center" color="secondary">
            CPM
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => changeMenu(TYPE.PERT)}>
          <Typography textAlign="center" color="secondary">
            PERT
          </Typography>
        </MenuItem>
      </Stack>
    </StyledAppBar>
  );
};

Header.propTypes = {
  changeMenu: PropTypes.func,
};
