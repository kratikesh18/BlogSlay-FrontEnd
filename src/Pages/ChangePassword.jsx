import React from "react";
import ChangePasswordForm from "../Components/Profile-components/ChangePasswordForm";
import { useSelector } from "react-redux";

function ChangePassword() {

  const { status } = useSelector((state) => state.authSlice);
  if (!status) {
    return <div className="text-center text-lg font-semibold">you are not Authorized to visit this page please login</div>;
  }
  return (
    <div className="">
      <h1 className="text-xl font-medium text-center my-4 ">
        Change Your Password
      </h1>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePassword;
