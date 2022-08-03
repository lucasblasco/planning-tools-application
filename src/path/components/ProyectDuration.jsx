import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

export const ProyectDuration = ({ duration }) => {
  return (
    <Box textAlign="center">
      <Typography component="h2" variant="subtitle1">
        Duración estima del proyecto
      </Typography>
      <Typography component="h2" variant="h4">
        {duration}
      </Typography>
    </Box>
  );
};

ProyectDuration.propTypes = {
  duration: PropTypes.number,
};
