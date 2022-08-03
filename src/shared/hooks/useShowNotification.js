import { useContext } from "react";
import { AlertContext } from "../store/context";

export const useShowNotification = () => useContext(AlertContext);
