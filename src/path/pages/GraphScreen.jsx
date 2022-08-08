import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { Footer, Toolbar } from "../../shared/ui";
import { DurationViewer, Graph } from "../components";
import { selectActivities } from "../../shared/store/slices/activity";
import { selectLinks, selectPaths } from "../../shared/store/slices/path/path.slice";
import { selectProcessed } from "../../shared/store/slices/planning/planning.slice";

export const GraphScreen = () => {
  const [currentActivity, setCurrentActivity] = useState(null);
  const links = useSelector(selectLinks);
  const paths = useSelector(selectPaths);
  const isProcessed = useSelector(selectProcessed);
  const activities = useSelector(selectActivities);

  const handleItemClick = (activityName) => setCurrentActivity(activities.filter((act) => act.name === activityName)[0] || null);

  return (
    <>
      <Toolbar title="Diagrama" nextPage="/paths" nextPageTitle="Resultados" previousPage="/activities" previousPageTitle="Actividades" />

      {isProcessed ? (
        <Stack justifyContent="space-around" textAlign="center" spacing={2}>
          <Graph flexGrow={1} allPaths={paths} links={links} onItemClick={handleItemClick} />
          <Divider />
          <Stack flexGrow={1} sx={{ display: currentActivity === null ? "none" : "flex" }}>
            <DurationViewer activity={currentActivity} />
          </Stack>
        </Stack>
      ) : (
        <Box textAlign="center">
          <Typography variant="subtitle1">Falta processar las actividades</Typography>
        </Box>
      )}
    </>
  );
};
