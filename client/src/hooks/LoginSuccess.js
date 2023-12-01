import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUserData, checkLoggedIn } from "../store/userDataSlice";
const LoginSuccess = () => {
  const dispatch = useDispatch();
  const handleLoginSuccess = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/login-success`,
        { withCredentials: true }
      );
      dispatch(updateUserData(data));
      dispatch(checkLoggedIn());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await handleLoginSuccess();
    })();
  }, []);
};

export default LoginSuccess;
