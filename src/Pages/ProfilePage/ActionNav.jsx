import React from "react";
import { NavLink } from "react-router-dom";

function ActionNav() {
  return (
    <div className="border-4 text-xl  flex justify-center items-center gap-[5rem] h-[3rem] bg-slate-200/60 w-full">
      <div>
        <NavLink to={"/profile/likedposts"}>Likes</NavLink>
      </div>
      <div>
        <NavLink to={"/profile/comments"}>Comments</NavLink>
      </div>
    </div>
  );
}

export default ActionNav;
