import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import Button from "../../Components/utilComponents/Button";
import Layout from "./Layout";
function Profile() {
  // const url = "https://blogslay-backend.onrender.com";
  const url = import.meta.env.VITE_BACKEND_URL
  const { status, userdata } = useSelector((state) => state.authSlice);
  console.log(userdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const handleLogout = async (e) => {
    //here we just have to invalidate the cookie
    try {
      const res = await fetch(`${url}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res) {
        console.log("dispacthing logout ", res);
        dispatch(logout());

        console.log("printing the  status ", status);

        if (!status) {
          console.log("navigating to login");
          navigate("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!status) {
    return (
      <div>
        <h1>403| Your must have login to visit this page </h1>
      </div>
    );
  }
  return (
    <div className="flex w-[95%] mx-auto h-screen mt-4 items-center flex-col ">
      <div className="border-4 relative  border-black w-[95%] flex justify-center h-fit flex-col items-center ">
        <div className="w-full  object-fill ">
          <img
            className="w-full h-[22rem]"
            src="https://images.pexels.com/photos/4483237/pexels-photo-4483237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>

        <div className="md:w-[35%] lg:w-fit h-52  top-[12rem] absolute overflow-hidden border-4 rounded-lg">
          <img
            src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="w-full h-full scale-110 object-cover object-center  "
            alt=""
          />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col mt-[5rem] ">
        <h1 className="text-2xl font-bold ">Hello, Veronica</h1>
        <h2 className="text-xl">Veronica@blogslay.com</h2>
        <Button text={"Logout"} eventFunc={handleLogout} className={"m-4"} />
      </div>

      <Layout />
    </div>
  );
}

export default Profile;
