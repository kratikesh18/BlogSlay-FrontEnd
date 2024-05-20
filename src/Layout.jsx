import React from "react";
import Navbar from "./Components/NavBar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Components/NavBar/Footer.jsx";

function Layout() { 
  return (
    <div>
      <main className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
