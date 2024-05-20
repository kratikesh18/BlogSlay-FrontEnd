import React, { useState } from "react";
import { Button } from "../utilComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [error, setError] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;

  // const handleChangePassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(`${url}/api/v1/user/changepassword`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         currentPassword,
  //         newPassword,
  //         reEnteredPassword,
  //       }),
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       toast.success("Password changed successfully");
  //     }
  //     if (!response.ok) {
  //       toast.error("error occured while changing the password");
  //       const parsedFalseResponse = await response.json()
  //       console.log(response);
  //       console.log(parsedFalseResponse);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError(error.message);
  //   }
  // };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/v1/user/changepassword`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          reEnteredPassword,
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Password changed successfully");
      } else {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Error occurred while changing the password";

        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.log("Error Data:", errorData);
        } else {
          console.log("Non-JSON Error Response:", await response.text());
        }

        toast.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An unexpected error occurred");
      setError(error.message);
    }
  };

  
  if (!status)
    return (
      <div>
        {error && (
          <h1 className="text-center text-red-500 font-medium">{error}</h1>
        )}
        <form
          onSubmit={handleChangePassword}
          className="flex flex-col gap-4 justify-center items-center max-w-[50%] mx-auto"
        >
          <input
            type="password"
            placeholder="current password"
            id="current-pswd"
            className="  rounded-sm px-3 py-1"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
          />

          <input
            type="password"
            placeholder="new password"
            id="new-pswd"
            className="  rounded-sm px-3 py-1"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />

          <input
            type="password"
            placeholder="re-enter new password"
            id="reentered-pswd"
            className="  rounded-sm px-3 py-1"
            onChange={(e) => setReEnteredPassword(e.target.value)}
            value={reEnteredPassword}
          />
          <Button type={"submit"} text={"Change password"} />
        </form>
        <ToastContainer autoClose={1000} />
      </div>
    );
}

export default ChangePasswordForm;
