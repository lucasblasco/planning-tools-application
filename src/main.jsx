import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CpmApp } from "./CpmApp";
import { store } from "./shared/store";
import { theme } from "./shared/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <CpmApp />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
