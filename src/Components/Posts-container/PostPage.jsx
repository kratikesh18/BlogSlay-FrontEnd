import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { format } from "date-fns";
import Button from "../utilComponents/Button";
import { useSelector } from "react-redux";
import { LikeButton } from "../utilComponents/index.js";

function PostPage() {
  const url = useMemo(() => import.meta.env.VITE_BACKEND_URL, []);

  const { status, userdata } = useSelector((state) => state.authSlice);

  const curentUserId = userdata?._id;

  const { id } = useParams();

  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [comment, setComment] = useState("this Post is amazing");
  const [allComments, setAllComments] = useState([]);

  const [isLiked, setIsLiked] = useState(false);

  // useEffect(() => {
  //   console.log("Like button clicked");
  // }, [isLiked]);

  const hanandleLike = useCallback(async () => {
    try {
      const endPoints = isLiked ? "removelike" : "addlike";

      fetch(`${url}/api/v1/user/${endPoints}`, {
        method: isLiked ? "DELETE" : "POST",
        credentials: "include",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [isLiked]);

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
        const { comments, likeCounts } = data?.data;
        setAllComments(comments);
        setPostInfo(data?.data);
        setIsLiked(likeCounts.includes(curentUserId));
      }
    } catch (error) {
      console.log("Error while Fetching the posts", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [status]);

  const deleteComment = async (commentId) => {
    setLoading(true);
    console.log("Deleting the comment");
    try {
      const response = await fetch(`${url}/api/v1/user/deletecomment`, {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchPost();
      }
    } catch (error) {
      console.log("Error while deleting comment");
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

  if (!status) {
    return (
      <div className="text-center text-lg font-semibold">
        <h1> 403 | Your must have login to visit this page </h1>
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
            loading="lazy"
          />
        </div>

        <div className="browser-css">{parse(postInfo.content)}</div>

        <button
          className={`mt-4 self-center flex gap-3 border-2 p-3 justify-center hover:bg-orange-200 items-center rounded-xl  ${
            isLiked ? "bg-orange-100" : "bg-orange-50"
          }`}
          onClick={() => {
            setIsLiked((prev) => !prev);
            hanandleLike();
          }}
        >
          <LikeButton />
          <span className={`text-lg font-semibold `}>
            {isLiked ? "Liked" : "Like"}
          </span>
        </button>

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
          <h1 className="font-semibold text-xl mb-3 ">Latest Comments</h1>
          <div className="flex flex-col gap-3 pl-4">
            {allComments?.length > 0 ? (
              allComments?.map((comment) => (
                <div
                  className="border-4 flex flex-col gap-1 p-3"
                  key={comment._id}
                >
                  <div className=" flex justify-between">
                    <h1 className="text-lg">{comment.text}</h1>
                    {comment.author?._id === curentUserId && (
                      <div className=" flex gap-2">
                        {
                          //TODO - add the edit funcionality
                          /* <Button
                          className={"py-[4px] text-base font-normal bg-blue-800"}
                          text={"edit"}
                        /> */
                        }
                        <Button
                          className={
                            "py-[4px] text-base font-normal bg-red-800"
                          }
                          eventFunc={(e) => {
                            e.preventDefault();
                            deleteComment(comment?._id);
                          }}
                          text={"delete"}
                        />
                      </div>
                    )}
                  </div>
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
