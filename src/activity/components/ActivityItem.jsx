import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { styled, useTheme } from "@mui/material/styles";
import { Stack, Box, Typography, Chip, Divider, Toolbar, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { iconMap } from "../../shared/helpers";
import { TYPE } from "../constants";

const Wrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const ToolButton = styled(Stack)(({ theme, visible }) => ({
  backgroundColor: theme.palette.mode === "light" ? grey[50] : theme.palette.background.default,
  display: visible ? "block" : "none",
  transition: "display 300ms ease-out",
}));

export const ActivityItem = ({ activity, handleEdit, handleDelete, processed, disabled = false }) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const hanldeVisibleToolbar = () => {
    setVisible(!visible);
  };

  useEffect(() => {}, [visible]);

  return (
    <Wrapper direction="row" p={0} theme={theme} justifyContent="space-between">
      <Stack flexGrow={1} direction="row" justifyContent="space-between" alignItems="center" p={1}>
        <Stack>
          <Box
            borderRadius={30}
            p={1}
            m={1}
            sx={{
              backgroundColor: "secondary.dark",
            }}
          >
            <Typography variant="button">{activity.name}</Typography>
          </Box>
        </Stack>

        <Stack flexGrow={3} justifyContent="center">
          <Typography variant="subtitle2">{activity.description || "Sin descripción"}</Typography>

          <Stack direction="row" spacing={1}>
            <Typography variant="caption">Predecesoras</Typography>
            <Divider orientation="vertical" flexItem />
            {!activity.predecessor || activity.predecessor.length === 0 ? (
              <Typography variant="caption">Ninguna</Typography>
            ) : (
              activity.predecessor.map((pre) => <Chip key={pre} label={String(pre).toUpperCase()} size="small" />)
            )}
          </Stack>

          <Stack direction="row" spacing={1} sx={{ display: processed ? "flex" : "none" }}>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">ES:</Typography>
              <Typography variant="caption">{activity.earlyStart}</Typography>
              <Divider orientation="vertical" flexItem />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">EF:</Typography>
              <Typography variant="caption">{activity.earlyFinish}</Typography>
              <Divider orientation="vertical" flexItem />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">LS:</Typography>
              <Typography variant="caption">{activity.lateStart}</Typography>
              <Divider orientation="vertical" flexItem />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Typography variant="caption">LF:</Typography>
              <Typography variant="caption">{activity.lateFinish}</Typography>
              <Divider orientation="vertical" flexItem />
            </Stack>
          </Stack>
        </Stack>

        <Stack justifyContent="center">
          {activity.type === TYPE.CPM ? (
            <Box>
              <Typography variant="h6">{activity.duration}</Typography>
            </Box>
          ) : (
            <Stack alignItems="center">
              <Typography variant="h6">{activity.duration}</Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="caption">{activity.optimistic}</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="caption">{activity.mostLikely}</Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="caption">{activity.pessimistic}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="caption">σ²: </Typography>
                <Typography variant="caption">{activity.variance}</Typography>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", backgroundColor: "primary.main", margin: "0 auto" }}>
        <IconButton color="secondary" aria-label="show" onClick={hanldeVisibleToolbar} sx={{ padding: 0 }} disabled={disabled}>
          {visible ? iconMap["rightArrow"] : iconMap["leftArrow"]}
        </IconButton>
      </Box>
      <ToolButton theme={theme} spacing={0} visible={visible ? 1 : 0} alignItems="center">
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <IconButton onClick={() => handleEdit(activity)}>{iconMap["edit"]}</IconButton>
          <IconButton onClick={() => handleDelete(activity)}>{iconMap["delete"]}</IconButton>
        </Toolbar>
      </ToolButton>
    </Wrapper>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  processed: PropTypes.bool,
  disabled: PropTypes.bool,
};
