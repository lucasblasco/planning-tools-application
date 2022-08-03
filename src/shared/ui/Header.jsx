import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, IconButton, Container, Toolbar, Typography, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../components";

export const Header = ({ currentType, handleDrawerOpen }) => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Box display={{ xs: "flex", md: "none" }}>
              <IconButton
                size="large"
                aria-label="menu sidebar open"
                aria-controls="menu-sidebar"
                aria-haspopup="true"
                onClick={handleDrawerOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box display={{ xs: "none", md: "flex" }}>
              <Logo variant="h7" hiddenText={false} iconSize="medium" />
            </Box>
            <Typography variant="overline" color="inherit">
              {currentType}
            </Typography>
            <Box display={{ xs: "flex", md: "none" }}>
              <Logo variant="h7" hiddenText={true} />
            </Box>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  currentType: PropTypes.string,
  handleDrawerOpen: PropTypes.func,
};
