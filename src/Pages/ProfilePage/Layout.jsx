import React from "react";
import { Outlet, Routes, Route, NavLink } from "react-router-dom";
import Profile from "./Profile";
import ActionNav from "./ActionNav";

function Layout() {
  <Routes>
    <Route path="'/profile" element={<Profile />}>
      <Route path="likedposts" element={<div>Liked posts</div>} />
      <Route path="comments" element={<div>Your comments</div>} />
    </Route>
  </Routes>;
  return (
    <div>
      <ActionNav>
        <Outlet />
      </ActionNav>
    </div>
  );
}
export default Layout;
