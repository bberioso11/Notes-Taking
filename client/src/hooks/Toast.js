import React from "react";
import Swal from "sweetalert2";
const Toast = () => {
  const toastInstance = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
  return toastInstance;
};

export default Toast;
