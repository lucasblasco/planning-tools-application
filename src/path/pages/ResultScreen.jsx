import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import { Footer, Toolbar } from "../../shared/ui";
import { PathList, ProyectDuration } from "../components";
import { selectCriticalPaths, selectPaths } from "../../shared/store/slices/path/path.slice";
import { selectProcessed, selectProyectTotalDuration } from "../../shared/store/slices/planning/planning.slice";

export const ResultScreen = () => {
  let navigate = useNavigate();
  const paths = useSelector(selectPaths);
  const criticalPaths = useSelector(selectCriticalPaths);
  const isProcessed = useSelector(selectProcessed);
  const proyectTotalDuration = useSelector(selectProyectTotalDuration);

  return (
    <>
      <Toolbar title="Resultados" previousPage="/diagram" previousPageTitle="Diagrama" />

      {isProcessed ? (
        <Box textAlign="center" display="flex" flexDirection="column" gap={2}>
          <ProyectDuration duration={proyectTotalDuration} />
          <PathList paths={criticalPaths} title={"Caminos críticos"} />
          <PathList paths={paths} title={"Posibles caminos"} />
        </Box>
      ) : (
        <Box textAlign="center">
          <Typography variant="subtitle1">Falta processar las actividades</Typography>
        </Box>
      )}
    </>
  );
};
