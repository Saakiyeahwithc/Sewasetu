import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
    />
  );
};

export default ToastProvider;
