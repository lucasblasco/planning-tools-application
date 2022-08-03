import React, { useState } from "react";
import { Alert, Collapse, Container } from "@mui/material";

import { AlertContext } from "./AlertContext";
import { NOTIFICATION_TYPE } from "../../constants";

export const AlertContextProvider = ({ children }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState(NOTIFICATION_TYPE.SUCCESS);

  const handleShowToast = (message, type = NOTIFICATION_TYPE.SUCCESS, duration = 3000) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setNotificationOpen(true);

    setTimeout(() => {
      setNotificationOpen(false);
    }, duration);
  };

  return (
    <AlertContext.Provider value={{ showNotification: handleShowToast }}>
      <Container maxWidth="xl">
        <Collapse in={notificationOpen}>
          <Alert severity={notificationType} sx={{ textAlign: "center" }}>
            {notificationMessage}
          </Alert>
        </Collapse>
      </Container>
      {children}
    </AlertContext.Provider>
  );
};
