import { useContext } from "react";
import { ConfirmationModalContext } from "../store/context";

export const useConfirmationModalContext = () => useContext(ConfirmationModalContext);
