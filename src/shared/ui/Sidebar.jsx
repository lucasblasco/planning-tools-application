import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { iconMap } from "./../helpers";
import { Logo } from "../components";

const MENU = [
  { title: "Actividades", icon: "table", to: "/activities" },
  { title: "Diagrama", icon: "schema", to: "/diagram" },
  { title: "Resultados", icon: "doneAll", to: "/paths" },
];

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));

const ListText = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary,
}));

export const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Logo variant="caption" />
          <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? iconMap["rightArrow"] : iconMap["leftArrow"]}</IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {MENU.map((menu) => (
            <ListItem key={menu.title} disablePadding>
              <ListItemButton>
                <ListItemIcon>{iconMap[menu.icon]}</ListItemIcon>
                <ListText theme={theme} to={menu.to}>
                  {menu.title}
                </ListText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};
