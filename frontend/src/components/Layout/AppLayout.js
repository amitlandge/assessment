import React from "react";

import "./AppLayout.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const AppLayout = (prop) => {
  return (
    <div>
      <Navbar />
      <div className="main-section">
        <div className="sidebar">
          <Sidebar />
        </div>

        <div className="main-content" style={{ height: "87.5vh" }}>
          {prop.children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
