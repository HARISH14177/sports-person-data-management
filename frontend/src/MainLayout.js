import React from "react";
import { Outlet } from "react-router-dom";
import "./pages/Dashboard.css";

const MainLayout = () => {
  return (
    <div className="dashboard-container">
      <h1>Sports Event Management</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
