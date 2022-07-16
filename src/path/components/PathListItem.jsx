import React from "react";
import PropTypes from "prop-types";

import { Stack, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const PathListItem = ({ path }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" divider={<ArrowForwardIcon sx={{ fontWeight: "normal" }} fontSize="small" />}>
      {path.map((item) => (
        <Chip key={item} label={item} variant="outlined" />
      ))}
    </Stack>
  );
};

PathListItem.propTypes = {
  path: PropTypes.array,
};
