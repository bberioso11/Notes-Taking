import React, { useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
const Sidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <>
      <RxHamburgerMenu
        onClick={handleToggleSidebar}
        className="d-lg-none"
        type="button"
      />
      {toggleSidebar && (
        <div className="sidebar-overlay" onClick={handleToggleSidebar}></div>
      )}
      <aside className={`sidebar-container ${toggleSidebar && `open-sidebar`}`}>
        <div className="sidebar-layout px-4 py-3">
          <div className="sidebar-brand pb-1">
            <h4 className="fw-semibold">Note Taking</h4>
          </div>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <IoHome />
              <Link to="/" className="ms-1 sidebar-link">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
