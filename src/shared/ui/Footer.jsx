import React from "react";
import PropTypes from "prop-types";

import { AppBar, Box, Toolbar, Container } from "@mui/material";
import { iconMap } from "../helpers";
import { CustomFabIcon, CustomIconButton } from "../components";

export const Footer = ({ buttons = [] }) => {
  const getIcon = (button, index) => {
    if (button.type === "icon") {
      return (
        <CustomIconButton
          key={index}
          color={button.color}
          text={button.text}
          onClick={button.handle}
          disabled={button.disabled}
          icon={iconMap[button.icon]}
          position={button.position}
        />
      );
    } else {
      return (
        <CustomFabIcon
          key={index}
          color={button.color}
          text={button.text}
          onClick={button.handle}
          disabled={button.disabled}
          icon={iconMap[button.icon]}
        />
      );
    }
  };

  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", gap: 3 }}>
          {buttons.filter((button) => button.position === "left").map((button, index) => getIcon(button, index))}
          <Box sx={{ flexGrow: 1 }} />
          {buttons.filter((button) => button.position === "right").map((button, index) => getIcon(button, index))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Footer.propTypes = {
  buttons: PropTypes.array,
};
