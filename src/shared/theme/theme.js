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
    // primary: {
    //   main: "#181A20",
    // },
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
    fontFamily: "Roboto, Arial",
    fontSize: 14,
  },
});
