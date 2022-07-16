import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button, Stack, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import RevertIcon from "@mui/icons-material/NotInterestedOutlined";
import AddIcon from "@mui/icons-material/Add";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

import { CustomTableCell } from "../../shared/components";
import { ButtonToolbar } from "../../shared/styled-components/toolbar.styled.components";
import {
  deleteActivity,
  editMode,
  updateActivity,
  addActivity,
  calculateEstimatedDurationAndVariance,
} from "../../shared/store/slices/activity/activity.slice";
import { PredecessorToogle } from "./PredecessorToogle";
import { saveToLocalStorage } from "../helpers";
import { TYPE } from "../constants";

export const ActivityTable = () => {
  const { activities, type } = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  const onToggleEditMode = (id) => {
    dispatch(editMode(id));
  };

  const doneEditing = (row) => {
    if (type === TYPE.PERT) {
      dispatch(calculateEstimatedDurationAndVariance(row.id));
    }

    dispatch(editMode(row.id));
  };

  const onChange = (e, row) => {
    const name = e.target.name;
    const value = name === "name" ? e.target.value.toUpperCase() : e.target.value;
    dispatch(updateActivity({ ...row, [name]: value }));
  };

  const onTogglePredecessors = (row) => {
    dispatch(updateActivity({ ...row }));
  };

  const onRevert = (id) => {
    dispatch(editMode(id));
  };

  const onDelete = (id) => {
    dispatch(deleteActivity(id));
  };

  const onAdd = () => {
    const nextId = activities.length + 1;
    const newActivity = {
      id: nextId,
      name: null,
      description: null,
      predecessor: [],
      duration: 0,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
      variance: 0,
      earlyStart: 0,
      lateStart: 0,
      earlyFinish: 0,
      lateFinish: 0,
      freeFloat: 0,
      isEditMode: true,
    };
    dispatch(addActivity(newActivity));
  };

  useEffect(() => {
    const confirmActivities = activities.filter((act) => act.name !== null && !act.isEditMode);
    if (confirmActivities.filter((act) => act.id > 2).length === 0) {
      return;
    }
    saveToLocalStorage(confirmActivities);
  }, [activities]);

  return (
    <Box flex={1} p={2}>
      <Box position="fixed">
        <Table size="small" aria-label="activity table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Actividad</TableCell>
              <TableCell align="left">Descripción</TableCell>
              {type === TYPE.CPM ? (
                <TableCell align="left">Duración</TableCell>
              ) : (
                <>
                  <TableCell align="left">Optimista</TableCell>
                  <TableCell align="left">Probable</TableCell>
                  <TableCell align="left">Pesimista</TableCell>
                </>
              )}

              <TableCell align="left">Predecesoras</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {activities
              .filter((act) => act.id > 2)
              .map((row) => (
                <TableRow key={row.id}>
                  <CustomTableCell {...{ row, column: "name", onChange }} />
                  <CustomTableCell {...{ row, column: "description", onChange }} />
                  {type === TYPE.CPM ? (
                    <CustomTableCell {...{ row, column: "duration", onChange }} />
                  ) : (
                    <>
                      <CustomTableCell {...{ row, column: "optimistic", onChange }} />
                      <CustomTableCell {...{ row, column: "mostLikely", onChange }} />
                      <CustomTableCell {...{ row, column: "pessimistic", onChange }} />
                    </>
                  )}
                  <PredecessorToogle current={row} items={activities} onChange={onTogglePredecessors} />
                  <TableCell>
                    {row.isEditMode ? (
                      <Stack direction="row">
                        <IconButton aria-label="done" onClick={() => doneEditing(row)}>
                          <DoneIcon />
                        </IconButton>
                        <IconButton aria-label="revert" onClick={() => onRevert(row.id, row.isNew)}>
                          <RevertIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => onDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    ) : (
                      <IconButton aria-label="delete" onClick={() => onToggleEditMode(row.id)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <ButtonToolbar>
          <Button variant="contained" endIcon={<AddIcon />} onClick={onAdd}>
            Agregar actividad
          </Button>
        </ButtonToolbar>
      </Box>
    </Box>
  );
};
