import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { Footer } from "../ui/Footer";
import { TYPE } from "../../activity/constants";
import { chooseType } from "../store/slices/planning/planning.slice";

export const PlanningTypeSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(TYPE.CPM);

  const handleListItemClick = (event, value) => {
    setSelected(value);
    goToActivities();
  };

  const goToActivities = () => {
    dispatch(chooseType(selected));
    navigate("/activities");
  };

  const FOOTER_BUTTONS = [
    {
      text: "seleccionar",
      icon: "next",
      type: "fab",
      color: "error",
      handle: goToActivities,
      position: "left",
    },
  ];

  return (
    <>
      <Box textAlign="center">
        <Typography variant="overline">Selecciona tipo de planificación</Typography>
        <Divider />
      </Box>

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List component="nav" aria-label="planning types">
          <ListItemButton selected={selected === TYPE.CPM} onClick={(event) => handleListItemClick(event, TYPE.CPM)}>
            <ListItemText
              sx={{ my: 0, display: "flex", justifyContent: "center" }}
              primary="CPM"
              primaryTypographyProps={{
                fontSize: 18,
                fontWeight: "small",
                letterSpacing: 1,
              }}
            />
          </ListItemButton>
          <ListItemButton selected={selected === TYPE.PERT} onClick={(event) => handleListItemClick(event, TYPE.PERT)}>
            <ListItemText
              sx={{ my: 0, display: "flex", justifyContent: "center" }}
              primary="PERT"
              primaryTypographyProps={{
                fontSize: 18,
                fontWeight: "small",
                letterSpacing: 1,
              }}
            />
          </ListItemButton>
        </List>
      </Box>

      <Footer />
    </>
  );
};
