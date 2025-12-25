import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Header } from "../components";
import Sidebar from "../components/Sidebar";
import MyFooter from "../components/Footer";
import ScrollTop from "../helper/ScrollTop";

function Layout() {
  const location = useLocation();

  // List of paths where footer should NOT appear
  const hideFooterRoutes = ["/login", "/register", "/checkout"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);
  const adjustFooterSize = ["/"];
  const footerAdjust = adjustFooterSize?.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-roboto ">
      {/* Navbar at the top */}
      <div className="w-full z-50 fixed ">
        <ScrollTop />
        <Navbar />
        <Header />
      </div>

      {/* Content section: Sidebar + Main Content */}
      {/* Main content */}
      <div className="flex-1 md:px-5 px-0 flex flex-col mt-[140px] ">
        <main className="flex-1   overflow-auto ">
          <Outlet />
          {!shouldHideFooter && <>{footerAdjust ? <MyFooter /> : ""}</>}
        </main>
      </div>
    </div>
  );
}

export default Layout;
