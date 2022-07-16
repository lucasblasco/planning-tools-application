import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
      },
    },
  },
  palette: {
    primary: {
      main: "#2C2C2C",
    },
    secondary: {
      main: "#F1F7F6",
    },
    success: {
      main: "#29AF66",
    },
    error: {
      main: "#EE4E34",
    },
  },
  typography: {
    fontFamily: "Raleway, Arial",
    fontSize: 12,
  },
});
