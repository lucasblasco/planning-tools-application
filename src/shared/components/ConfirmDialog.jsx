import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

export const ConfirmDialog = ({ openDialog, handleClose, handleConfirm }) => {
  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"Reiniciar la aplicación"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Se perderán todos los datos ingresados. ¿Desea continuar?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} autoFocus>
          Reiniciar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
};
