import React, { useEffect, useState } from "react";
import { Button, Container } from "../Components/utilComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { status } = useSelector((state) => state.authSlice);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const [updatedUserFiles, setUpdatedUserFiles] = useState({
    avatar: null,
    coverImage: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/api/v1/user/userprofile`, {
          method: "GET",
          credentials: "include",
        });
        const resData = await response.json();

        setProfileData(resData?.data);
      } catch (error) {
        console.log("Error while fetching the post ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status]);

  const handleOnChange = (e) => {
    const { value, name, files } = e.target;
    // Use a conditional to check if the input is a file input
    if (files) {
      setUpdatedUserFiles((prev) => ({
        ...prev,
        [name]: files[0], // Store the first file from the files array
      }));
    } else {
      setUpdatedUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dataToSend = new FormData();
      dataToSend.append(
        "username",
        updatedUserData?.username || profileData?.username || ""
      );
      dataToSend.append(
        "email",
        updatedUserData?.email || profileData?.email || ""
      );
      dataToSend.set("avatar", updatedUserFiles?.avatar);
      dataToSend.set("coverImage", updatedUserFiles?.coverImage);

      const response = await fetch(`${url}/api/v1/user/updateuserinfo`, {
        method: "PATCH",
        credentials: "include",
        body: dataToSend,
      });

      if (response.ok) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error while updating user profile", error.message);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <Container className={"gap-4"}>
      {/* <h1 className="text-center text-lg">{id}</h1> */}
      <h1 className="text-2xl font-semibold">Edit Your Profile</h1>

      <div className=" relative flex h-full w-[95%] flex-col justify-center items-center mb-[10rem] ">
        <div className="relative border-4 h-[22rem] w-[95%] rounded-xl overflow-hidden">
          <input
            name="coverImage"
            type="file"
            className="absolute opacity-0 w-full h-full  z-50 "
            onChange={handleOnChange}
          />

          <h1 className="absolute z-10  h-full w-full flex justify-center items-center text-white bg-black/40 p-4 ">
            Update Cover Photo
          </h1>
          <img
            src={profileData?.profileCoverImage}
            className="h-full w-full object-cover "
          />
        </div>

        <div className="md:w-[35%] lg:w-fit h-52  top-[17rem] absolute overflow-hidden border-4 rounded-lg z-10">
          <div className="h-full w-full ">
            <input
              type="file"
              className="absolute opacity-0 w-full h-full  z-50"
              name="avatar"
              onChange={handleOnChange}
            />

            <h1 className="absolute z-10  h-full w-full flex justify-center items-center text-white bg-black/40 p-4 ">
              Update Profile Photo
            </h1>
            <img src={profileData?.profileAvatar} className="h-full w-full " />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-[20rem] ">
        <div className="flex justify-between items-center">
          <label htmlFor="username" className="text-lg font-semibold">
            username:
          </label>
          <input
            type="text"
            name="username"
            placeholder={profileData?.username}
            value={updatedUserData?.username}
            onChange={handleOnChange}
            className="border-2 border-black py-1 px-2 rounded-md font-semibold"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="username" className="text-lg font-semibold">
            email:
          </label>
          <input
            type="email"
            name="email"
            placeholder={profileData?.email}
            value={updatedUserData?.email}
            onChange={handleOnChange}
            // onChange={(e) =>
            //   setUpdatedUserData({ ...updatedUserData, email: e.target.value })
            // }
            className="border-2 border-black py-1 px-2 rounded-md font-semibold"
          />
        </div>
      </div>
      <Button
        text={"Update Profile"}
        eventFunc={updateUserData}
        className={"mt-8"}
      />
    </Container>
  );
}

export default EditProfile;
