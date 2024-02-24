import React from "react";
import Navbar from "./Components/NavBar/Navbar";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
