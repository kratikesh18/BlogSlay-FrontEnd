import React from "react";
import { Container } from "../Components/utilComponents";

function EditProfile() {
  return (
    <Container className={"gap-4"}>
      <h1 className="text-2xl font-semibold">Edit Your Profile</h1>
      <input type="file" className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full bg-black  "/>
      <input type="file" className="flex justify-center items-center w-[5rem] h-[5rem] rounded-full bg-black  "/>
      <div >
        <label htmlFor="username">username</label>
        <input
          type="text"
          className="border-2 border-black"
          placeholder="enter fileds"
        />
        <label htmlFor="username">email</label>
        <input
          type="email"
          className="border-2 border-black"
          placeholder="enter fileds"
        />
      </div>
    </Container>
  );
}

export default EditProfile;
