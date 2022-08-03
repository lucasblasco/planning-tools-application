import React, { useState } from "react";
import PropTypes from "prop-types";
import { ToggleButtonGroup, ToggleButton, Stack, Typography } from "@mui/material";
import { EXTREME } from "../../path/constants";

export const PredecessorToogle = ({ current, items, onChange }) => {
  const [predecessors, setPredecessors] = useState(() => current.predecessor || []);

  const handleActivities = (event, newActivities) => {
    setPredecessors(newActivities);
    onChange({ ...current, predecessor: newActivities });
  };

  const activitiesWithoutCurrentAndEND = items
    ? items.filter((item) => item.name && item.id !== current?.id && item.name !== EXTREME.END)
    : null;

  return (
    <Stack spacing={1} overflow="auto" margin={1}>
      <Typography variant="caption">Predecesora/s</Typography>
      <ToggleButtonGroup size="small" value={predecessors} onChange={handleActivities} aria-label="predecessors">
        {activitiesWithoutCurrentAndEND &&
          activitiesWithoutCurrentAndEND.map((item) => (
            <ToggleButton key={item.id} value={item.name}>
              {item.name}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

PredecessorToogle.propTypes = {
  current: PropTypes.object,
  items: PropTypes.array,
  onChange: PropTypes.func,
};
