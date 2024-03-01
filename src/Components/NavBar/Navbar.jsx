import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/v1/user/profile", {
  //     credentials: "include",
  //   }).then((response) =>
  //     response.json().then((userData) => {
  //       setUserInfo(userData);
  //     })
  //   );
  // });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/user/profile",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the data", response.headers);
        }
        const userData = await response.json();
        setUserInfo(userData);
      } catch (error) {
        console.log("Error while fetching the data", error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = (e) => {
    //here we just have to invalidate the cookie
    fetch("https://blogslay-backend.onrender.com/api/v1/user/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;
  return (
    <div>
      <header className="flex text-lg items-center justify-between my-4 w-[90%] mx-auto px-4 py-3 border-2 border-black rounded-md ">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold">BlogSlay</h1>
        </Link>

        <nav className="flex">
          {username && (
            <ul className="flex gap-3 ">
            <li>
              Hello, {username}
            </li>
              <li>
                <NavLink to={"/create-post"}>Create New Post</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
          {!username && (
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
