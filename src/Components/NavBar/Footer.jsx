import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div
      className=" h-[4rem]  border-4 flex justify-center items-center text-lg  font-bold mt-16 bg-yellow-50/60 mx-auto
    "
    >
      <h1>All rights reserved &copy;BlogSlay 2024.</h1>
      <div className="ml-20">
        <span>version 2.0.3</span>
      </div>
    </div>
  );
}

export default Footer;
