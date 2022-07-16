import React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const ActivityCard = ({ activity }) => {
  return (
    <Card sx={{ minWidth: 100 }}>
      <Grid item container textAlign="center">
        <Grid item xs={6} md={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {activity.earlyStart}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {activity.earlyFinish}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" component="div">
            {activity.name}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {activity.lateStart}
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {activity.lateFinish}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Holgura: {activity.freeFloat}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object,
};
