import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import LoginSuccess from "../hooks/LoginSuccess";
import { useSelector } from "react-redux";
const Login = () => {
  LoginSuccess();
  const isLoggedIn = useSelector((state) => state.userData.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/google`, "_self");
  };
  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        <div className="row justify-content-center p-3">
          <div className="col-8 card shadow p-3">
            <div className="title text-center">
              <h3>Login</h3>
            </div>
            <div className="row p-3">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="text" className="form-control" id="email" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <GoogleButton onClick={handleGoogleLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
