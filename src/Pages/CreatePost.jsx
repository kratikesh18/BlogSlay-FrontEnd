import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Components/utilComponents/Editor";
import { useSelector } from "react-redux";

function CreatePost() {
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL;

  const { status } = useSelector((state) => state.authSlice);
  if (!status) {
    return (
      <div className="text-center text-lg font-semibold">
        <h1> 403 | Your must have login to visit this page </h1>
      </div>
    );
  }

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [userFiles, setUserFiles] = useState(null);

  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("coverImage", userFiles);

    const response = await fetch(`${url}/api/v1/user/createNewPost`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      toast.success("Post Created");
      navigate("/");
    }
  };

  const handleOnChangeFile = (e) => {
    setUserFiles(e.target.files[0]);
  };

  return (
    <form
      onSubmit={handleCreatePost}
      className="flex flex-col gap-3 w-[80%] mx-auto "
    >
      <input
        type="text"
        placeholder="title"
        name="title"
        value={title}
        minLength={50}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-black px-3 rounded-md py-1 font-semibold"
      />
      <input
        type="text"
        placeholder="summary"
        name="summary"
        value={summary}
        minLength={100}
        onChange={(e) => setSummary(e.target.value)}
        className="border-2 border-black px-3 rounded-md py-1 font-semibold"
      />

      <input
        type="file"
        onChange={handleOnChangeFile}
        className="border-2 border-black rounded-md px-3 py-1"
      />

      <div className={"border-2 border-black rounded-md"}>
        <Editor onChange={setContent} value={content} />
      </div>

      <button className="bg-black text-white px-4 w-fit mx-auto py-2 font-semibold rounded-md hover:bg-black/85 duration-75">
        Publish Post
      </button>
      <ToastContainer />
    </form>
  );
}

export default CreatePost;
