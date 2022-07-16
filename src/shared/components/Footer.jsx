import React from "react";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import { AppBar, Fab, Box, Button, Toolbar, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAllTwoTone";
import CheckIcon from "@mui/icons-material/Check";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { PROCESS_STATUS } from "../../path/constants/process-status";

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  [theme.breakpoints.up("sm")]: {
    width: "150px",
  },
}));

export const Footer = ({ step, handleCalculate, handleClearAll }) => {
  const getButton = (currentStep) => {
    if (currentStep === PROCESS_STATUS.CHECKED) {
      return (
        <StyledFab variant="extended" color="error" aria-label="add" onClick={handleCalculate}>
          <DoneAllIcon color="secondary" sx={{ mr: 1 }} />
          Procesar
        </StyledFab>
      );
    }
    if (currentStep === PROCESS_STATUS.PROCESS) {
      <StyledFab disabled variant="extended" color="success" aria-label="add" onClick={handleCalculate}>
        <CheckIcon color="secondary" sx={{ mr: 1 }} />
        Terminado
      </StyledFab>;
    }

    return (
      <StyledFab variant="extended" color="warning" aria-label="add" onClick={handleCalculate}>
        <CheckIcon color="secondary" sx={{ mr: 1 }} />
        Verificar
      </StyledFab>
    );
  };

  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Button variant="contained" endIcon={<CleaningServicesIcon />} onClick={handleClearAll}>
          <Typography component="span" sx={{ display: { xs: "none", sm: "block" } }}>
            Limpiar
          </Typography>
        </Button>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>{getButton(step)}</Box>
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <StyledFab color="error" aria-label="add" onClick={handleCalculate}>
            <DoneAllIcon color="secondary" sx={{ mr: 1 }} />
          </StyledFab>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  step: PropTypes.number,
  handleCalculate: PropTypes.func,
  handleClearAll: PropTypes.func,
};
