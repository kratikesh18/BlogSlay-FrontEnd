import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { format } from "date-fns";
import Button from "../utilComponents/Button";
import { useSelector } from "react-redux";

function PostPage() {
  // const url ="https://blogslay-backend.onrender.com"
  const url = import.meta.env.VITE_BACKEND_URL

  const userdata = useSelector((state) => state.authSlice.userdata);

  const { id } = useParams();

  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [comment, setComment] = useState("this Post is amazing");
  const [allComments, setAllComments] = useState([]);

  const handlePostComment = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`${url}/api/v1/user/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id }),
      credentials: "include",
    });
    if (response.ok) {
      setComment("");
      setLoading(false);
      fetchPost();
    }
  };

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/api/v1/user/post/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data) {
        const { comments } = data?.data;
        setAllComments(comments);
        setPostInfo(data?.data);
      }
    } catch (error) {
      console.log("Error while Fetching the posts", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    postInfo && (
      <div className="flex flex-col w-[80%] mx-auto  gap-3 p-4">
        <h1 className="text-3xl font-bold text-center self-center">
          {postInfo.title}
        </h1>
        <div className="flex flex-col self-center justify-center items-center text-gray-800">
          <time>
            {format(new Date(postInfo?.createdAt), "MMM d, yyyy HH:mm")}
          </time>
          <h2 className="text-black font-semibold">
            By {postInfo.author?.username}
          </h2>
        </div>
        {userdata._id === postInfo.author._id && (
          <Link to={`/edit/${postInfo._id}`} className=" self-center ">
            <div className=" bg-black font-semibold text-white w-fit px-4 py-2 gap-2 rounded-md flex justify-center items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <span> Edit Post</span>
            </div>
          </Link>
        )}
        <div className="w-full overflow-hidden h-[20rem] rounded-md ">
          <img
            className="w-full h-full object-center object-cover"
            src={postInfo.coverImage}
            alt=""
          />
        </div>

        <div className="">{parse(postInfo.content)}</div>

        <div className=" flex flex-col gap-3 mt-10">
          <h1 className="text-xl font-semibold">Write a Comment</h1>
          <textarea
            cols="30"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Your Thoughts..."
            className="shadow-xl border-2 px-4 py-2 rounded-md text-lg"
          />
          <Button
            className={"py-[0.6rem] px-3 text-sm "}
            text={"Post Comment"}
            eventFunc={handlePostComment}
          />
        </div>

        <div>
          <h1 className="font-semibold text-xl ">Comments</h1>
          <div className="flex flex-col gap-3 pl-4">
            {allComments?.length > 0 ? (
              allComments?.map((comment) => (
                <div
                  className="border-4 flex flex-col gap-1 p-3"
                  key={comment._id}
                >
                  <h1 className="text-lg">{comment.text}</h1>
                  <span>{comment.author?.username}</span>
                  <time>
                    {format(new Date(comment.createdAt), "MMM d, yyyy HH:mm")}
                  </time>
                </div>
              ))
            ) : (
              <div className="mx-auto mt-10">
                <h1 className="text-xl">No Comments yet... </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default PostPage;
