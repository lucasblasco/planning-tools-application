import React, { useState } from "react";
import { Stack } from "@mui/material";

import { Header, Sidebar } from "./index";

export const Layout = ({ children, currentPlanning }) => {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Stack bgcolor={"background.default"} color={"text.primary"}>
      <Header currentType={currentPlanning} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      {children}
    </Stack>
  );
};
