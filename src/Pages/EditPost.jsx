import React, { useEffect, useState } from "react";
import Editor from "../Components/utilComponents/Editor";
import { useParams, useNavigate } from "react-router-dom";
function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [userFiles, setUserFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleOnChangeFile = (e) => {
    setUserFiles(e.target.files[0]);
  };

  useEffect(() => {
    async function fetchAndSetData() {
      setLoading(true);
      const response = await fetch(
        `https://blogslay-backend.onrender.com/api/v1/user/post/${id}`
      );

      const data = await response.json();

      setTitle(data.data.title);
      setSummary(data.data.summary);
      setContent(data.data.content);

      // console.log(data.data);
      setLoading(false);
    }
    fetchAndSetData();
  }, []);

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
      const response = await fetch(
        "http://localhost:4000/api/v1/user/updatePost",
        {
          method: "PUT",
          credentials: "include",
          body: newData,
        }
      );

      if (response.ok) {
        navigate(`/post/${id}`);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error while updating the post ", error.message);
    }
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
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-black px-3 rounded-md py-1 font-semibold"
      />
      <input
        type="text"
        placeholder="summary"
        name="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="border-2 border-black px-3 rounded-md py-1 font-semibold"
      />

      <input
        type="file"
        onChange={handleOnChangeFile}
        className="border-2 border-black rounded-md px-3 py-1"
      />
      <Editor onChange={setContent} value={content} />
      <button className="bg-black text-white px-4 w-fit mx-auto py-2 font-semibold rounded-md hover:bg-black/85 duration-75">
        Update Post
      </button>
    </form>
  );
}

export default EditPost;
