import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userDataSlice";
const Header = () => {
  const user = useSelector((state) => state.userData.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container-fluid my-2">
        <div className="border shadow rounded py-2 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <Sidebar />
            <h5 className="mb-0 d-none d-lg-inline">Notes Taking</h5>
            <div className="d-flex">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </div>
            <div>
              <div className="btn-group">
                <img
                  src="/images/sample.png"
                  alt="profile"
                  width="40px"
                  type="button"
                  className="rounded-circle dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />

                <ul className="dropdown-menu dropdown-menu-start">
                  <li>
                    <div className="d-flex align-items-center ms-2">
                      <img
                        src="/images/sample.png"
                        alt="profile"
                        className="rounded-circle"
                        width="40px"
                      />
                      <div className="d-flex flex-column ms-2 align-items-center">
                        <span className="dropdown-avatar-text fw-semibold">
                          {user?.firstname.toUpperCase() || "Guest"}
                        </span>
                        {/* <span className="dropdown-avatar-text">
                          Administrator
                        </span> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    {user ? (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={handleLogOut}>
                        Logout
                      </button>
                    ) : (
                      <Link to="/login" className="dropdown-item" type="button">
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
