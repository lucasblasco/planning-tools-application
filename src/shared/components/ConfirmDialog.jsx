import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export const ConfirmDialog = ({ message, title, openDialog, handleClose, handleConfirm }) => {
  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
};
