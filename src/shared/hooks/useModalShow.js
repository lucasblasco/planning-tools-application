import { useState } from "react";

export const useModalShow = () => {
  const [show, setShow] = useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  const handleOnShow = () => {
    setShow(true);
  };

  return {
    show,
    onShow: handleOnShow,
    onHide: handleOnHide,
  };
};
