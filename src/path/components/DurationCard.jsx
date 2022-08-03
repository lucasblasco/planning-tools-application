import React from "react";
import PropTypes from "prop-types";
import { useTheme, styled, Card, CardContent, Typography } from "@mui/material";

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 100,
}));

export const DurationCard = ({ description, duration }) => {
  const theme = useTheme();
  return (
    <Item elevation={2} theme={theme}>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {duration}
        </Typography>
      </CardContent>
    </Item>
  );
};

DurationCard.propTypes = {
  description: PropTypes.string,
  duration: PropTypes.number,
};
