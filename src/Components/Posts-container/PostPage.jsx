import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { format } from "date-fns";
import { UserContext } from "../../context/UserContext";

function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // endpoint for fetching the data of the current post using id Param
    const fetchPost = async () => {
      fetch(`http://localhost:4000/api/v1/user/post/${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => setPostInfo(data.data));
    };
    fetchPost();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    postInfo && (
      <div className="flex flex-col w-[80%] mx-auto  gap-3 p-4">
        <h1 className="text-3xl font-bold text-center w-[60%] self-center">
          {postInfo.title}
        </h1>
        <div className="flex flex-col self-center justify-center items-center text-gray-800">
          <time>
            {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
          </time>
          <h2 className="text-black font-semibold">
            By {postInfo.author.username}
          </h2>
        </div>
        {userInfo._id === postInfo.author._id && (
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
      </div>
    )
  );
}

export default PostPage;
