import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Stack, Container, IconButton } from "@mui/material";
import { iconMap } from "../helpers";

export const Toolbar = ({ title, nextPage, nextPageTitle, previousPage, previousPageTitle }) => {
  let navigate = useNavigate();

  const onNextPage = () => navigate(nextPage);

  const onPreviousPage = () => navigate(previousPage);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Box textAlign="center">
          <IconButton aria-label="previousPage" size="small" disabled={!previousPage} onClick={onPreviousPage}>
            {iconMap["leftArrow"]}
            <Typography variant="overline" display={{ xs: "none", sm: "block" }}>
              {previousPageTitle}
            </Typography>
          </IconButton>
        </Box>

        <Box textAlign="center" flexGrow={1}>
          <Typography variant="overline">{title}</Typography>
        </Box>

        <Box textAlign="right">
          <IconButton aria-label="nextPage" size="small" disabled={!nextPage} onClick={onNextPage}>
            <Typography variant="overline" display={{ xs: "none", sm: "block" }}>
              {nextPageTitle}
            </Typography>
            {iconMap["rightArrow"]}
          </IconButton>
        </Box>
        <Divider />
      </Stack>
    </Container>
  );
};

Toolbar.propTypes = {
  nextPage: PropTypes.string,
  previousPage: PropTypes.string,
  title: PropTypes.string,
};
