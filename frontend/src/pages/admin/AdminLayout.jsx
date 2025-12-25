import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="flex gap-4 w-full ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
