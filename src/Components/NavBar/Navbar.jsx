import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/slices/authSlice.js";
import { useSelector } from "react-redux";

function Navbar() {
  const url = import.meta.env.VITE_BACKEND_URL

  const dispatch = useDispatch();
  const { status, userdata } = useSelector((state) => state.authSlice);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${url}/api/v1/user/profile`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the data", response.headers);
        }
        const userData = await response.json();

        dispatch(login(userData));
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = (e) => {
    //here we just have to invalidate the cookie
    fetch(`${url}/api/v1/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch(logout());
  };

  // const username = userInfo?.username;
  const username = userdata?.username;
  // console.log(username);

  return (
    <div>
      <header className="flex text-lg items-center justify-between my-4 w-[90%] mx-auto px-4 py-3 border-2 border-black rounded-md ">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">BlogSlay</h1>
        </Link>

        <nav className="flex">
          {username && status && (
            <ul className="flex gap-3 ">
              <li>
                <NavLink to={"/create-post"}>Create New Post</NavLink>
              </li>
              <li>
                <NavLink to={"/your-posts"}>Your Posts</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Hello, {username}</NavLink>
              </li>
            </ul>
          )}
          {!status && (
            <ul className="flex gap-3 ">
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/SignUp"}>Register</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

// ************************ GARBAGE CODE **************************//
// useEffect(() => {
//   fetch("http://localhost:4000/api/v1/user/profile", {
//     credentials: "include",
//   }).then((response) =>
//     response.json().then((userData) => {
//       setUserInfo(userData);
//     })
//   );
// });
