import React, { useState } from "react";
import PropTypes from "prop-types";
import { TableCell, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import { extreme } from "../../path/constants";

export const PredecessorToogle = ({ current, items, onChange }) => {
  const [predecessors, setPredecessors] = useState(() => current.predecessor || []);

  const handleActivities = (event, newActivities) => {
    setPredecessors(newActivities);
    onChange({ ...current, predecessor: newActivities });
  };

  const isEditMode = current.isEditMode;
  return (
    <TableCell>
      <Stack direction="row" spacing={1} maxWidth={150} overflow="auto" marginX={1}>
        <ToggleButtonGroup size="small" value={predecessors} onChange={handleActivities} aria-label="predecessors">
          {isEditMode
            ? !!items &&
              items
                .filter((item) => item.name && item.name !== current.name && item.name !== extreme.END)
                .map((item) => (
                  <ToggleButton style={{ padding: "4px" }} key={item.id} value={item.name}>
                    {item.name}
                  </ToggleButton>
                ))
            : current.predecessor.map((name) => (
                <ToggleButton style={{ padding: "4px" }} key={name} value={name}>
                  {name}
                </ToggleButton>
              ))}
        </ToggleButtonGroup>
      </Stack>
    </TableCell>
  );
};

PredecessorToogle.propTypes = {
  current: PropTypes.object,
  items: PropTypes.array,
  onChange: PropTypes.func,
};
