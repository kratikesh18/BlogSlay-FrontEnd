import React from "react";
import Navbar from "./Components/NavBar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Footer from "./Components/NavBar/Footer.jsx";

function Layout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
