import React, { useEffect, useState } from "react";
import Editor from "../Components/utilComponents/Editor";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Components/utilComponents/Button";

function EditPost() {
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [userFiles, setUserFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndSetData() {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/user/post/${id}`);

      const data = await response.json();

      setTitle(data.data.title);
      setSummary(data.data.summary);
      setContent(data.data.content);
      setLoading(false);
    }
    fetchAndSetData();
  }, []);

  const handleOnChangeFile = (e) => {
    setUserFiles(e.target.files[0]);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const newData = new FormData();
    newData.set("title", title);
    newData.set("summary", summary);
    newData.set("content", content);
    newData.set("id", id);

    if (userFiles) {
      newData.set("newBlogImage", userFiles);
    }

    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/user/updatePost`, {
        method: "PUT",
        credentials: "include",
        body: newData,
      });

      if (response.ok) {
        navigate(`/post/${id}`);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error while updating the post ", error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch(`${url}/api/v1/user/delete/${id}`, {
        method: "DELETE",
        body: id,
      }).then(navigate("/"));
    } catch (error) {
      console.log("Error while Deleting the post");
    }
    setLoading(false);
  };

  if (loading) {
    <div className="h-screen w-full flex justify-center items-center">
      <span class="loader"></span>
    </div>;
  }
  return (
    <form
      onSubmit={handleUpdatePost}
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
      <Editor onChange={setContent} value={content} />
      <div className="flex gap-4 self-center">
        <Button
          type={"submit"}
          text={"Update Post"}
          className={"self-center"}
        />
        <button
          onClick={handleDelete}
          className="py-3 px-5 bg-red-900 hover:bg-red-600 font-bold rounded-xl text-white w-fit"
        >
          Delete Post
        </button>
      </div>
    </form>
  );
}

export default EditPost;
