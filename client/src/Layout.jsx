import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import LoginSuccess from "./hooks/LoginSuccess";
const Layout = () => {
  LoginSuccess();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
