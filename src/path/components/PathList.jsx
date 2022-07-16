import React from "react";
import PropTypes from "prop-types";
import { PathListItem } from "./index";
import { Stack, Typography } from "@mui/material";

export const PathList = ({ paths, title, color }) => {
  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      <Typography component="h2" variant="subtitle1">
        {title}
      </Typography>
      <Stack spacing={1}>{!!paths && paths.map((path) => <PathListItem key={paths.indexOf(path)} path={path} />)}</Stack>
    </Stack>
  );
};

PathList.propTypes = {
  paths: PropTypes.array,
  title: PropTypes.string,
  color: PropTypes.string,
};
