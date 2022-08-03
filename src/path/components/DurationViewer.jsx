import React from "react";
import PropTypes from "prop-types";
import { Grid, Box } from "@mui/material";
import { DurationCard } from "./DurationCard";

export const DurationViewer = ({ activity }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Box
          sx={{
            p: 2,
            bgcolor: "background.default",
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" },
            gap: 2,
          }}
        >
          <DurationCard description="Tiempo de inicio temprano (ES)" duration={activity?.earlyStart} />
          <DurationCard description="Tiempo de fin temprano (EF)" duration={activity?.earlyFinish} />
          <DurationCard description="Tiempo de inicio más lejano (LS)" duration={activity?.lateStart} />
          <DurationCard description="Tiempo de fin más lejana (LF)" duration={activity?.lateFinish} />
          <DurationCard description="Holgura (H)" duration={activity?.slack} />
        </Box>
      </Grid>
    </Grid>
  );
};

DurationViewer.propTypes = {
  activity: PropTypes.object,
};
