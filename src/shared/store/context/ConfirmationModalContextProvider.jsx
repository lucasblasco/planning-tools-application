import React, { useRef, useState } from "react";
import { ConfirmDialog } from "../../components";
import { useModalShow } from "../../hooks";
import { ConfirmationModalContext } from "./ConfirmationModalContext";

export const ConfirmationModalContextProvider = ({ children }) => {
  const { show, onShow, onHide } = useModalShow();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const resolver = useRef();

  const handleShowModal = (title, message) => {
    setTitle(title);
    setMessage(message);
    onShow();

    return new Promise((resolve, reject) => {
      resolver.current = resolve;
    });
  };

  const handleConfirm = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleClose = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation: handleShowModal }}>
      {children}
      <ConfirmDialog message={message} title={title} openDialog={show} handleClose={handleClose} handleConfirm={handleConfirm} />
    </ConfirmationModalContext.Provider>
  );
};
